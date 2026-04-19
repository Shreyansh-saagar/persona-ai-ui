import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatService } from '../../core/services/chat.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  readonly chatService = inject(ChatService);
  readonly message = signal('');

  @ViewChild('messageTextarea')
  private textareaRef?: ElementRef<HTMLTextAreaElement>;

  sendMessage(): void {
    const value = this.message().trim();

    if (!value || this.chatService.isSending()) {
      return;
    }

    this.chatService.sendMessage(value);
    this.message.set('');
    this.resetTextareaHeight();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.message.set(target.value);
    this.adjustTextareaHeight(target);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
  }

  private resetTextareaHeight(): void {
    const textarea = this.textareaRef?.nativeElement;

    if (!textarea) {
      return;
    }

    textarea.style.height = '48px';
  }
}