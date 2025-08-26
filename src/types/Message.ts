import { MessageProps } from "@patternfly/chatbot";

type LLMRequest = {
  query: string;
  conversation_id?: string | null;
  context?: string | null;
  media_type?: "text/plain" | "application/json";
};

type LLMResponse = {
  answer: string;
  citations: ReferencedDocument[];
  used_models: ModelResponse;
  truncated?: boolean;
};

export type ChatRequest = LLMRequest;
export type ChatResponse = LLMResponse;

export type ModelResponse = {
  completion_model: string;
  embedding_model: string;
};

export type AlertMessage = {
  title: string;
  message: string;
  variant: "success" | "danger" | "warning" | "info" | "custom";
};

export type ReferencedDocument = {
  url: string;
  title: string;
  span: string;
};

export type ExtendedMessage = Omit<MessageProps, 'ref'> & {
  referenced_documents: ReferencedDocument[];
  scrollToHere?: boolean;
  collapse?: boolean;
};

export type ToolName = "default" | "chat" | "graph";

export type Prompt = {
  title: string;
  message: string;
  params?:string;
  tool: ToolName;
};