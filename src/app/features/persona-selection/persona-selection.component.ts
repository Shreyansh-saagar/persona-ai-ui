import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PersonaService } from '../../core/services/persona.service';
import { Persona } from '../../core/models/persona.models';
import { LoadingDotsComponent } from '../../shared/components/loading-dots/loading-dots.component';

@Component({
  selector: 'app-persona-selection',
  standalone: true,
  imports: [LoadingDotsComponent],
  templateUrl: './persona-selection.component.html',
  styleUrl: './persona-selection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonaSelectionComponent implements OnInit {
  readonly personaService = inject(PersonaService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (!this.personaService.hasPersonas()) {
      this.personaService.loadPersonas();
      return;
    }

    const selectedPersona = this.personaService.selectedPersona();

    if (selectedPersona && !this.personaService.hasMultiplePersonas()) {
      this.router.navigateByUrl('/chat');
    }
  }

  selectPersona(persona: Persona): void {
    this.personaService.selectPersona(persona, true);
  }

  retryLoad(): void {
    this.personaService.loadPersonas();
  }
}