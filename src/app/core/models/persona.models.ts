export interface Persona {
  id: string;
  name: string;
  title: string;
  description: string;
}

export interface PersonasListResponse {
  personas: Persona[];
}