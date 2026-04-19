import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PersonasListResponse } from '../models/persona.models';
import { PersonaChatRequest, PersonaChatResponse } from '../models/chat.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getPersonas(): Observable<PersonasListResponse> {
    return this.http.get<PersonasListResponse>(`${this.baseUrl}/persona/list`);
  }

  sendMessage(payload: PersonaChatRequest): Observable<PersonaChatResponse> {
    return this.http.post<PersonaChatResponse>(
      `${this.baseUrl}/persona/respond`,
      payload
    );
  }
}