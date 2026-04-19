import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { ChatService } from '../../core/services/chat.service';
import { PersonaService } from '../../core/services/persona.service';
import { LoadingDotsComponent } from '../../shared/components/loading-dots/loading-dots.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [DatePipe, LoadingDotsComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent implements AfterViewChecked {
  readonly chatService = inject(ChatService);
  readonly personaService = inject(PersonaService);

  @ViewChild('scrollContainer')
  private scrollContainer?: ElementRef<HTMLDivElement>;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const container = this.scrollContainer?.nativeElement;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }
}