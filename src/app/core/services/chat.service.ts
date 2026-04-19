import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';

import {
  ChatMessage,
  PersonaChatRequest,
  PersonaChatResponse,
} from '../models/chat.models';
import { ApiService } from './api.service';
import { PersonaService } from './persona.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly apiService = inject(ApiService);
  private readonly personaService = inject(PersonaService);

  readonly messages = signal<ChatMessage[]>([]);
  readonly isSending = signal(false);
  readonly sendError = signal<string | null>(null);

  readonly hasMessages = computed(() => this.messages().length > 0);

  sendMessage(rawMessage: string): void {
    const message = rawMessage.trim();
    const selectedPersona = this.personaService.selectedPersona();

    if (!message || !selectedPersona || this.isSending()) {
      return;
    }

    this.sendError.set(null);

    const userMessage: ChatMessage = {
      id: this.generateId(),
      role: 'user',
      text: message,
      createdAt: new Date().toISOString(),
    };

    this.messages.update((currentMessages) => [...currentMessages, userMessage]);
    this.isSending.set(true);

    const payload: PersonaChatRequest = {
      persona_id: selectedPersona.id,
      message,
    };

    this.apiService
      .sendMessage(payload)
      .pipe(
        catchError((error) => {
          console.error('Failed to send message:', error);

          const errorMessage: ChatMessage = {
            id: this.generateId(),
            role: 'assistant',
            text: 'Something went wrong while getting the reply. Please try again.',
            personaId: selectedPersona.id,
            createdAt: new Date().toISOString(),
            isError: true,
          };

          this.messages.update((currentMessages) => [
            ...currentMessages,
            errorMessage,
          ]);

          this.sendError.set('Message failed to send.');
          return of(null);
        }),
        finalize(() => this.isSending.set(false))
      )
      .subscribe((response: PersonaChatResponse | null) => {
        if (!response) {
          return;
        }

        const assistantMessage: ChatMessage = {
          id: this.generateId(),
          role: 'assistant',
          text: response.reply,
          personaId: response.persona_of,
          createdAt: new Date().toISOString(),
        };

        this.messages.update((currentMessages) => [
          ...currentMessages,
          assistantMessage,
        ]);
      });
  }

  clearChat(): void {
    this.messages.set([]);
    this.sendError.set(null);
  }

  addWelcomeMessage(): void {
    const selectedPersona = this.personaService.selectedPersona();

    if (!selectedPersona || this.messages().length > 0) {
      return;
    }

    const welcomeMessage: ChatMessage = {
      id: this.generateId(),
      role: 'assistant',
      text: `You are now chatting in ${selectedPersona.title}. Send a message to begin.`,
      personaId: selectedPersona.id,
      createdAt: new Date().toISOString(),
    };

    this.messages.set([welcomeMessage]);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}