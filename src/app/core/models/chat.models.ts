export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  personaId?: string;
  createdAt: string;
  isError?: boolean;
}

export interface PersonaChatRequest {
  persona_id: string | null;
  message: string;
}

export interface PersonaChatResponse {
  reply: string;
  persona_of: string;
}