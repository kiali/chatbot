import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AlertMessage, ChatRequest, ChatResponse, ExtendedMessage, ToolName } from "../types/Message";
import { API_TIMEOUT, INITIAL_NOTICE, KIALI_PRODUCT_NAME, TIMEOUT_MSG, TOO_MANY_REQUESTS_MSG } from "../Constants";
import { MessageProps } from "@patternfly/chatbot";
//import userLogo from "../assets/img/user_logo.png";
import userLogo from "../assets/img/avatar.svg";
import logo from "../assets/img/kiali-IconLogo-Color.svg";
import { Credentials, ModelAI } from "../types";
import { Endpoints } from "../types/Endpoints";

const botName =
  document.getElementById("bot_name")?.innerText ??
  KIALI_PRODUCT_NAME;

const getTimestamp = () => {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const fixedMessage = (content: string): ExtendedMessage => ({
  role: "bot",
  content,
  name: botName,
  avatar: logo,
  timestamp: getTimestamp(),
  referenced_documents: []
});

const isTimeoutError = (e: any) =>
  axios.isAxiosError(e) && e.message === `timeout of ${API_TIMEOUT}ms exceeded`;

const isTooManyRequestsError = (e: any) =>
  axios.isAxiosError(e) && e.response?.status === 429;

export const timeoutMessage = (): ExtendedMessage => fixedMessage(TIMEOUT_MSG);

export const tooManyRequestsMessage = (): ExtendedMessage =>
  fixedMessage(TOO_MANY_REQUESTS_MSG);

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const buildUrl = (host: string, path: string): string => {
  const trimmedHost = host.replace(/\/+$/, "");
  const trimmedPath = path.replace(/^\/+/, "");
  return `${trimmedHost}/${trimmedPath}`;
}

const resolveEndpointPath = (tool: ToolName): string => {
  switch (tool) {
    case "chat":
      return Endpoints.CHAT;
    case "graph":
      return Endpoints.GRAPH;
    default:
      return Endpoints.CHAT;
  }
}

const escapeHtml = (unsafe: string): string =>
  unsafe
    .replace(/`/g, "*");

export const useChatbot = (models: ModelAI[], userName: string) => {
    const [selectedModel, setSelectedModel] = useState(models[0]);
    const [messages, setMessages] = useState<ExtendedMessage[]>([]);    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<AlertMessage | undefined>(
        INITIAL_NOTICE,
    );
    const [conversationId, setConversationId] = useState<
        string | null | undefined
    >(undefined);


        const addMessage = (
        newMessage: ExtendedMessage,
        addAfter?: ExtendedMessage,
    ) => {
        setMessages((msgs: ExtendedMessage[]) => {
        const newMsgs: ExtendedMessage[] = [];
        let inserted = false;
        for (const msg of msgs) {
            newMsgs.push(msg);
            if (msg === addAfter) {
            newMsgs.push(newMessage);
            inserted = true;
            }
        }
        if (!inserted) {
            newMsgs.push(newMessage);
        }
        return newMsgs;
        });
    };

      const show429Message = async () => {
            // Insert a 3-sec delay before showing the "Too Many Request" message
            // for reducing the number of chat requests when the server is busy.
            await delay(3000);
            const newBotMessage = {
            ...tooManyRequestsMessage(),
            };
            addMessage(newBotMessage);
        };
    const botMessage = (
        response: ChatResponse | string,
        query = ""
    ): ExtendedMessage => {
        const message: ExtendedMessage = {
            role: "bot",
            content: typeof response === "object" ? escapeHtml(response.answer) : escapeHtml(response),
            name: botName,
            avatar: logo,
            timestamp: getTimestamp(),
            referenced_documents: typeof response === "object" ? response.citations :   [],
        };

        return message;
    }   

    const generateConversationId = (): string => {
        const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : {};
        if (g.crypto && typeof g.crypto.randomUUID === 'function') {
            return g.crypto.randomUUID();
        }
        const random = () => Math.random().toString(16).slice(2);
        return `${Date.now().toString(16)}-${random()}-${random()}`;
    };

    const handleSend = async (query: string | number, tool: ToolName = "default", context?: any, dev?: boolean) => {
        const userMessage: ExtendedMessage = {
            role: "user",
            content: query.toString(),
            name: userName,
            avatar: userLogo,
            timestamp: getTimestamp(),
            referenced_documents: [],
        };
        addMessage(userMessage); 

        let nextConversationId = conversationId ?? undefined;
        if (!nextConversationId) {
            nextConversationId = generateConversationId();
            setConversationId(nextConversationId);
        }

        const ctxString = context == null
            ? null
            : (typeof context === 'string' ? context : JSON.stringify(context));

        const chatRequest: ChatRequest = {
            conversation_id: nextConversationId,
            query: tool === "default" ? query.toString() : '',
            context: ctxString
        };
        setIsLoading(true);

        try {
            if (dev) {
                // Simulated debug response
                console.log("DEBUG: Simulated debug response");
                await delay(500);
                    const debugText = "The provided Kiali JSON data shows a health check of the Istio mesh.  Let's analyze it step-by-step:\n\n**1. Overall Health:**\n\nThe `status` array indicates the health of various Istio components:\n\n* **`istiod-default-v1-26-2` (Istio control plane):** Healthy. This is crucial; a healthy `istiod` is essential for the entire mesh to function.\n* **`istio-ingressgateway`:** Unhealthy. This is a serious issue. The ingress gateway is the entry point for external traffic into the mesh.  Its unhealthiness means external requests are likely failing.  This needs immediate attention.\n* **`prometheus`, `grafana`, `tracing`:** Healthy.  These monitoring and tracing components appear to be functioning correctly.\n\n**2. Namespace-level Health (`health.namespaceAppHealth`):**\n\nThe data shows health information for several namespaces (`bookinfo`, `hostpath-provisioner`, `istio-system`, `ossmconsole`, `tempo`).  However, the `requests` section within each namespace and workload is empty (`{}`). This means Kiali isn't currently reporting any inbound or outbound request metrics for any of the applications.  This is unusual and suggests a potential configuration problem or a temporary lack of traffic.\n\n**3. Workload-level Health:**\n\nThe `workloadStatuses` within each namespace show the replica status of individual deployments.  Most deployments show `desiredReplicas`, `currentReplicas`, and `availableReplicas` all matching (e.g., 1, 1, 1).  However, the `syncedProxies` value is consistently `-1`. This indicates that Kiali is not able to retrieve the proxy synchronization status for any of the workloads. This could be due to a problem with Kiali's connection to the Istio sidecar proxies or a misconfiguration in Istio itself.\n\n**4. Istio Configuration (`controlplanes`):**\n\nThe `controlplanes` section provides details about the Istio control plane, including its version (`1.26.2`), configuration details (e.g., tracing using Tempo), and certificate information.  The `accessible` flag is set to `true` for the control plane, suggesting Kiali can communicate with it.\n\n**5. Troubleshooting Steps:**\n\nBased on the data, the primary concern is the unhealthy `istio-ingressgateway`.  Here's a prioritized troubleshooting plan:\n\n* **Investigate `istio-ingressgateway`:** Check the Kubernetes logs for the `istio-ingressgateway` deployment in the `istio-system` namespace. Look for error messages that might indicate the cause of the unhealthiness.  This is the most critical step.\n* **Verify Ingress Configuration:** Ensure the Istio ingress gateway is correctly configured and has the necessary resources (e.g., service accounts, network policies).  Check for any misconfigurations in the gateway's deployment or service definition.\n* **Check Proxy Synchronization:** The `syncedProxies` value of `-1` across all workloads suggests a problem with Istio proxy synchronization.  Examine Istio's logs for errors related to proxy configuration or communication.  This might involve checking the Istio sidecar logs on each pod.\n* **Kiali Configuration:** While Kiali's own health seems fine, verify its configuration to ensure it has the necessary permissions and connectivity to access Istio metrics and configuration.  Check Kiali's logs for any errors.\n* **Examine Tempo (Tracing):** Although Tempo appears healthy, check its logs to ensure traces are being properly collected and processed.  If tracing isn't working correctly, it could indirectly affect Kiali's ability to display traffic information.\n* **Restart Components (Last Resort):** If the above steps don't reveal the issue, consider restarting the `istio-ingressgateway` deployment and potentially the `istiod` as a last resort.  This should only be done after careful consideration and after backing up your configuration.\n\n**6.  Missing Traffic Metrics:**\n\nThe lack of inbound/outbound request metrics in `health.namespaceAppHealth` is a separate issue.  This could be due to:\n\n* **Insufficient Data:** Kiali might not have collected enough data yet. Wait some time and check again.\n* **Metrics Collection Issues:** Verify that Prometheus is correctly scraping metrics from the Istio sidecars.  Check Prometheus's configuration and logs.\n* **Kiali Configuration:**  Ensure Kiali is correctly configured to fetch and display the relevant metrics.\n\nRemember to consult the Kiali documentation ([1, 6, 7, 8]) for more detailed information on graph interpretation and troubleshooting.  The lack of detailed request metrics makes a precise diagnosis difficult, but focusing on the unhealthy ingress gateway is the highest priority.\n";
                    const chatResponse: ChatResponse = {
                    answer: escapeHtml(debugText),
                    citations: [
                        { url: 'https://kiali.io/docs/', title: 'Kiali Docs', span: 'N/A' },{
                            "title": "Replay",
                            "url": "https://kiali.io/docs/features/topology/#replay",
                            "span": "Graph replay allows you to replay traffic from a selected past time-period. This gives you a chance to thoroughly examine a time period of interest, or share it"
                        },
                        {
                            "title": "Use log messages to find out what is slow",
                            "url": "https://kiali.io/docs/configuration/debugging-kiali/#tracing-integration#use-log-messages-to-find-out-what-is-slow",
                            "span": "Make sure you turn on trace logging (spec.deployment.logger.log_level = trace) in order to get the log messages needed for this kind of analysis. Find all the l"
                        },
                        {
                            "title": "Use log messages to find out what is slow",
                            "url": "https://kiali.io/docs/configuration/debugging-kiali/#use-log-messages-to-find-out-what-is-slow",
                            "span": "Make sure you turn on trace logging (spec.deployment.logger.log_level = trace) in order to get the log messages needed for this kind of analysis. Find all the l"
                        },
                        {
                            "title": "Use Kiali to find out what is slow",
                            "url": "https://kiali.io/docs/configuration/debugging-kiali/#tracing-integration#use-kiali-to-find-out-what-is-slow",
                            "span": "Kiali itself can be used to help find its own internal problems. Navigate to the Kiali workload, and select the Kiali Internal Metrics tab. In this case, we can"
                        },
                        {
                            "title": "Use Kiali to find out what is slow",
                            "url": "https://kiali.io/docs/configuration/debugging-kiali/#use-kiali-to-find-out-what-is-slow",
                            "span": "Kiali itself can be used to help find its own internal problems. Navigate to the Kiali workload, and select the Kiali Internal Metrics tab. In this case, we can"
                        },
                        {
                            "title": "Graph",
                            "url": "https://kiali.io/docs/features/topology/#graph",
                            "span": "The Kiali Graph offers a powerful visualization of your mesh traffic. The topology combines real-time request traffic with your Istio configuration information "
                        },
                        {
                            "title": "How do I inspect the underlying metrics used to generate the Kiali Graph?",
                            "url": "https://kiali.io/docs/faq/graph/#scrapeduration#queryprom",
                            "span": "It is not uncommon for the Kiali graph to show traffic that surprises the user. Often the thought is that Kiali may have a bug. But in general Kiali is just vis"
                        },
                        {
                            "title": "How do I inspect the underlying metrics used to generate the Kiali Graph?",
                            "url": "https://kiali.io/docs/faq/graph/#queryprom",
                            "span": "It is not uncommon for the Kiali graph to show traffic that surprises the user. Often the thought is that Kiali may have a bug. But in general Kiali is just vis"
                        }
                    ],
                    used_models:{
                        "completion_model": "gemini-1.5-flash",
                        "embedding_model": "text-embedding-004"
                    }
                };
                const referenced_documents = chatResponse.citations;
                const newBotMessage: any = botMessage(chatResponse, query.toString());
                newBotMessage.referenced_documents = referenced_documents;
                addMessage(newBotMessage);
            } else { 
                const endpointBase = buildUrl(selectedModel.endpoint, resolveEndpointPath(tool));
                const url = tool === "graph" && typeof query === "string" && query.trim().length > 0
                    ? `${endpointBase}${endpointBase.includes("?") ? "&" : "?"}${query.replace(/^[?&]+/, "")}`
                    : endpointBase;
                const resp = await axios.post(
                    url,
                    chatRequest,
                    {
                        auth: selectedModel.credentials,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        timeout: API_TIMEOUT,
                    }
                );

                if (resp.status === 200) {
                    const chatResponse: ChatResponse = resp.data;
                    const referenced_documents = chatResponse.citations;
                
            
                    const newBotMessage: any = botMessage(chatResponse, query.toString());
                    newBotMessage.referenced_documents = referenced_documents;
                    addMessage(newBotMessage);

                } else {
                    setAlertMessage({
                        title: "Error",
                        message: `Bot returned status_code ${resp.status}`,
                        variant: "danger",
                    });
                }
            }
        }catch(e) {
            if (isTimeoutError(e)) {
                addMessage(timeoutMessage());
            }else if (isTooManyRequestsError(e)) {
                await show429Message();
            } else {
             setAlertMessage({
                title: "Error",
                message: `An unexpected error occurred: ${e}`,
                variant: "danger",
                });
            }
        }finally {
            setIsLoading(false);
        }
    }
    

    return {
        messages,
        setMessages,
        botMessage,
        isLoading,
        handleSend,
        alertMessage,
        setAlertMessage,
        selectedModel,
        setSelectedModel,
        conversationId,
        setConversationId
    }


}