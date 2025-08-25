import { Credentials } from "./Auth";

export type ModelAI = {
  endpoint: string;
  model: string;
  credentials?: Credentials;
};