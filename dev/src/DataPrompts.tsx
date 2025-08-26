import type { Prompt } from "@kiali/chatbot";
export const DataPrompts : {[key: string]: Prompt[] } = {
    "Graph": [
        {
            title: "Check Graph Status",
            message: "Show me the current status of my service mesh graph",
            tool: "graph"
        }
    ],
    "Overview": [
        {
            title: "Analyze Overview",
            message: "Give me a summary of the overall health of my mesh from the overview page",
            tool: "chat"
        }
    ]
}

/*
Prompts Ideas

{
      "title": "Inspect Workload Health",
      "message": "I want to see the health of all workloads in my namespace",
      "tool": "chat"
    },
    {
      "title": "Check Application Metrics",
      "message": "Display metrics like request rate, error rate, and latency for my application",
      "tool": "chat"
    },
    {
      "title": "Trace a Request",
      "message": "Help me analyze a distributed trace to troubleshoot latency",
      "tool": "chat"
    },
    {
      "title": "View Traffic Routing",
      "message": "Show me the traffic routing configuration for my services",
      "tool": "chat"
    },
    {
      "title": "Check Istio Config",
      "message": "I want to validate my Istio configuration for possible issues",
      "tool": "chat"
    },
    {
      "title": "Explore Logs",
      "message": "Retrieve logs for a specific workload to investigate issues",
      "tool": "chat"
    },
    {
      "title": "Compare Namespaces",
      "message": "Give me a comparison of traffic and health between namespaces",
      "tool": "chat"
    },
    {
      "title": "Alert on Anomalies",
      "message": "Tell me if there are any unusual spikes in errors or traffic",
      "tool": "chat"
    }
*/

