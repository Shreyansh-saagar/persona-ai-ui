import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PersonaService } from '../../core/services/persona.service';

@Component({
  selector: 'app-persona-switcher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './persona-switcher.component.html',
  styleUrl: './persona-switcher.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonaSwitcherComponent {
  readonly personaService = inject(PersonaService);

  onPersonaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const personaId = target.value;

    if (!personaId) {
      return;
    }

    this.personaService.changePersonaById(personaId);
  }
}