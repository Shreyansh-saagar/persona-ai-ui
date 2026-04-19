import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';

import { Persona } from '../models/persona.models';
import { ApiService } from './api.service';

const SELECTED_PERSONA_STORAGE_KEY = 'persona-ai-selected-persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  readonly personas = signal<Persona[]>([]);
  readonly selectedPersona = signal<Persona | null>(null);
  readonly isLoading = signal(false);
  readonly loadError = signal<string | null>(null);

  readonly hasPersonas = computed(() => this.personas().length > 0);
  readonly hasMultiplePersonas = computed(() => this.personas().length > 1);
  readonly hasSelectedPersona = computed(() => this.selectedPersona() !== null);

  loadPersonas(): void {
    this.isLoading.set(true);
    this.loadError.set(null);

    this.apiService
      .getPersonas()
      .pipe(
        catchError((error) => {
          console.error('Failed to load personas:', error);
          this.loadError.set('Unable to load personas right now.');
          this.personas.set([]);
          return of({ personas: [] });
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        const personas = response.personas ?? [];
        this.personas.set(personas);

        if (!personas.length) {
          this.selectedPersona.set(null);
          this.clearStoredSelectedPersona();
          return;
        }

        const storedPersonaId = this.getStoredSelectedPersonaId();
        const matchedStoredPersona =
          personas.find((persona) => persona.id === storedPersonaId) ?? null;

        if (matchedStoredPersona) {
          this.selectedPersona.set(matchedStoredPersona);
          return;
        }

        if (personas.length === 1) {
          this.selectPersona(personas[0], false);
          this.router.navigateByUrl('/chat');
        }
      });
  }

  selectPersona(persona: Persona, navigateToChat = true): void {
    this.selectedPersona.set(persona);
    this.storeSelectedPersonaId(persona.id);

    if (navigateToChat) {
      this.router.navigateByUrl('/chat');
    }
  }

  changePersonaById(personaId: string): void {
    const persona = this.personas().find((item) => item.id === personaId) ?? null;

    if (!persona) {
      return;
    }

    this.selectedPersona.set(persona);
    this.storeSelectedPersonaId(persona.id);
  }

  clearSelectedPersona(): void {
    this.selectedPersona.set(null);
    this.clearStoredSelectedPersona();
  }

  getPersonaById(personaId: string): Persona | null {
    return this.personas().find((persona) => persona.id === personaId) ?? null;
  }

  private getStoredSelectedPersonaId(): string | null {
    try {
      return localStorage.getItem(SELECTED_PERSONA_STORAGE_KEY);
    } catch (error) {
      console.warn('Could not read selected persona from localStorage.', error);
      return null;
    }
  }

  private storeSelectedPersonaId(personaId: string): void {
    try {
      localStorage.setItem(SELECTED_PERSONA_STORAGE_KEY, personaId);
    } catch (error) {
      console.warn('Could not store selected persona in localStorage.', error);
    }
  }

  private clearStoredSelectedPersona(): void {
    try {
      localStorage.removeItem(SELECTED_PERSONA_STORAGE_KEY);
    } catch (error) {
      console.warn('Could not clear selected persona from localStorage.', error);
    }
  }
}