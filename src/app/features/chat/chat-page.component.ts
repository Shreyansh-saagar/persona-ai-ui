import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ChatService } from '../../core/services/chat.service';
import { PersonaService } from '../../core/services/persona.service';
import { MessageListComponent } from '../message-list/message-list.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { PersonaSwitcherComponent } from '../persona-switcher/persona-switcher.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [MessageListComponent, ChatInputComponent, PersonaSwitcherComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
  readonly chatService = inject(ChatService);
  readonly personaService = inject(PersonaService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (!this.personaService.hasPersonas()) {
      this.personaService.loadPersonas();
    }

    const selectedPersona = this.personaService.selectedPersona();

    if (!selectedPersona) {
      this.router.navigateByUrl('/');
      return;
    }

    this.chatService.addWelcomeMessage();
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  clearChat(): void {
    this.chatService.clearChat();
    this.chatService.addWelcomeMessage();
  }
}