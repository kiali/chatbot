import { MessageProps } from "@patternfly/chatbot";

type LLMRequest = {
  query: string;
  conversation_id?: string | null;
  provider?: string | null;
  model?: string | null;
  attachments?: object[] | null;
  system_prompt?: string | null;
  media_type?: "text/plain" | "application/json";
};

type LLMResponse = {
  conversation_id: string;
  response: string;
  referenced_documents: ReferencedDocument[];
  truncated: boolean;
};

export type ChatRequest = LLMRequest;
export type ChatResponse = LLMResponse;

export type AlertMessage = {
  title: string;
  message: string;
  variant: "success" | "danger" | "warning" | "info" | "custom";
};

export type ReferencedDocument = {
  docs_url: string;
  title: string;
};

export type ExtendedMessage = Omit<MessageProps, 'ref'> & {
  referenced_documents: ReferencedDocument[];
  scrollToHere?: boolean;
  collapse?: boolean;
};