import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Curso } from '../interfaces/curso';
@Injectable({ providedIn: 'root' })
export class CursoService {
  // O serviço centraliza as chamadas da tela de cursos.
  private readonly http = inject(HttpClient);
  private readonly url = '/api/cursos';
  listar() {
    return this.http.get<Curso[]>(this.url);
  }
  // O GET busca os cursos atuais do banco.
  criar(curso: Omit<Curso, 'id'>) {
    return this.http.post<Curso>(this.url, curso);
  }
  atualizar(curso: Curso) {
    return this.http.put<Curso>(`${this.url}/${curso.id}`, curso);
    // POST cadastra um curso e PUT atualiza o curso pelo ID.
  }
  excluir(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
// O DELETE remove apenas o curso escolhido.
