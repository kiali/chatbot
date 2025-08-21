import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AlertMessage, ChatRequest, ChatResponse, ExtendedMessage } from "../types/Message";
import { API_TIMEOUT, INITIAL_NOTICE, KIALI_PRODUCT_NAME, TIMEOUT_MSG, TOO_MANY_REQUESTS_MSG } from "../Constants";
import { MessageProps } from "@patternfly/chatbot";
//import userLogo from "../assets/img/user_logo.png";
import userLogo from "../assets/img/avatar.svg";
import logo from "../assets/img/kiali-IconLogo-Color.svg";
import { ModelAI } from "../types";

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
  const url = new URL(path, host);
  return url.toString();
}

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
            content: typeof response === "object" ? response.response : response,
            name: botName,
            avatar: logo,
            timestamp: getTimestamp(),
            referenced_documents: [],
        };

        return message;
    }   

    const handleSend = async (query: string | number) => {
        const userMessage: ExtendedMessage = {
            role: "user",
            content: query.toString(),
            name: userName,
            avatar: userLogo,
            timestamp: getTimestamp(),
            referenced_documents: [],
        };
        addMessage(userMessage); 

        const chatRequest: ChatRequest = {
            conversation_id: conversationId,
            query: query.toString()
        };
        setIsLoading(true);

        try {
            const resp = await axios.post(
                buildUrl(selectedModel.endpoint,'/chat'),
                chatRequest,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: API_TIMEOUT,
                }
            );

            if (resp.status === 200) {
                const chatResponse: ChatResponse = resp.data;
                const referenced_documents = chatResponse.referenced_documents;
               
                if (!conversationId) {
                    setConversationId(chatResponse.conversation_id);
                }
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