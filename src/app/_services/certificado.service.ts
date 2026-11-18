import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Certificado } from '../interfaces/certificado';
type Legado = { id: string; nome: string; atividades: string[]; dataEmissao: string };
// O tipo antigo representa os certificados que já estavam no navegador.
@Injectable({ providedIn: 'root' })
export class CertificadoService {
  private readonly http = inject(HttpClient);
  private readonly url = '/api/certificados';
  listar() { return this.http.get<Certificado[]>(this.url); }
  // A lista consulta o banco sempre que o histórico é aberto.
  buscar(id: string) { return this.http.get<Certificado>(`${this.url}/${id}`); }
  criar(item: Certificado) { return this.http.post<Certificado>(this.url, item); }
  atualizar(item: Certificado) { return this.http.put<Certificado>(`${this.url}/${item.id}`, item); }
  excluir(id: string) { return this.http.delete<void>(`${this.url}/${id}`); }
  temLegado() { return !!localStorage.getItem('certificados'); }
  // Cada operação usa a rota da API e a chave antiga indica se há dados para importar.
  async importarLegado(): Promise<void> {
    const antigos: Legado[] = JSON.parse(localStorage.getItem('certificados') ?? '[]');
    for (const antigo of antigos) {
      const id = encodeURIComponent(antigo.id);
      try {
        // Conferimos o ID original para poder repetir uma importação interrompida.
        await firstValueFrom(this.buscar(id));
      } catch (erro) {
        if (!(erro instanceof HttpErrorResponse) || erro.status !== 404) throw erro;
        const [dia, mes, ano] = antigo.dataEmissao.split('/');
        await firstValueFrom(this.criar({
          // Só copiamos o registro quando o servidor responde que ele ainda não existe.
          id,
          nomeAluno: antigo.nome,
          atividades: antigo.atividades,
          dataEmissao: ano ? `${ano}-${mes}-${dia}` : antigo.dataEmissao,
          codigoValidacao: id,
          // O histórico antigo mantém o aluno, as atividades e a data original.
          curso: '',
          cursoReferencia: null,
          cargaHoraria: null,
        }));
      }
      // Os certificados anteriores ao cadastro de cursos ficam com esses campos vazios.
    }
    localStorage.removeItem('certificados');
  }
}
// A cópia local só é removida depois que todos os registros estão no banco.
