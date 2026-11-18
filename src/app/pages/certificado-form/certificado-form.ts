import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// O formulário usa os campos do Angular dentro de um cartão do Material.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
// O seletor carrega cursos e a mensagem informa se a emissão deu certo.
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { CertificadoService } from '../../_services/certificado.service';
import { CursoService } from '../../_services/curso.service';
// As rotas indicam se vamos criar um certificado ou editar um existente.
import { Certificado } from '../../interfaces/certificado';
import { Curso } from '../../interfaces/curso';
@Component({
  selector: 'app-certificado-form',
  templateUrl: './certificado-form.html',
  // O mesmo formulário é usado na tela inicial e na edição.
  imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatSelectModule, RouterLink],
})
export class CertificadoForm implements OnInit {
  private readonly service = inject(CertificadoService);
  // O serviço de certificados é responsável por gravar o formulário.
  private readonly cursosService = inject(CursoService);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);
  readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id');
  readonly cursos = signal<Curso[]>([]);
  // O ID da rota e os cursos carregados definem os dados iniciais do formulário.
  readonly carregando = signal(true);
  readonly erro = signal(false);
  readonly salvando = signal(false);
  atividade = '';
  readonly item = signal<Certificado>({
    // Guardamos o rascunho e os estados que controlam a tela.
    id: '', nomeAluno: '', cursoReferencia: null, curso: '', cargaHoraria: null,
    dataEmissao: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    codigoValidacao: '', atividades: [],
  });
  ngOnInit() { void this.carregar(); }
  // Uma emissão começa com a data de hoje e as informações do aluno em branco.
  async carregar() {
    this.carregando.set(true);
    this.erro.set(false);
    try {
      const [cursos, item] = await Promise.all([
        // Cursos e certificado são consultados juntos, quando houver edição.
        firstValueFrom(this.cursosService.listar()),
        this.id ? firstValueFrom(this.service.buscar(this.id)) : Promise.resolve(null),
      ]);
      this.cursos.set(cursos);
      if (item) this.item.set(item);
      // O formulário só recebe os dados depois que as consultas terminam.
    } catch {
      this.erro.set(true);
    } finally {
      this.carregando.set(false);
    }
    // Em caso de falha, a tela libera a opção de recarregar.
  }
  escolherCurso(id: string) {
    const curso = this.cursos().find(opcao => opcao.id === id);
    if (curso) this.item.update(item => ({
      ...item, cursoReferencia: id, curso: curso.nomeCurso, cargaHoraria: curso.cargaHorariaPadrao,
      // A escolha traz o nome do curso e preenche a carga horária sugerida.
    }));
  }
  adicionarAtividade() {
    const atividade = this.atividade.trim();
    if (!atividade) return;
    // Ignoramos espaços em branco ao incluir uma atividade.
    this.item.update(item => ({ ...item, atividades: [...item.atividades, atividade] }));
    this.atividade = '';
  }
  removerAtividade(indice: number) {
    this.item.update(item => ({ ...item, atividades: item.atividades.filter((_, i) => i !== indice) }));
    // Atualizamos a lista de atividades usando a posição do item removido.
  }
  async salvar(form: NgForm) {
    const item = this.item();
    if (form.invalid || !item.nomeAluno.trim() || !item.atividades.length || this.salvando()) return;
    const id = item.id || uuid();
    // Conferimos os campos e reaproveitamos o ID quando estamos editando.
    const dados = { ...item, id, nomeAluno: item.nomeAluno.trim(), codigoValidacao: item.codigoValidacao || id };
    this.salvando.set(true);
    try {
      await firstValueFrom(this.id ? this.service.atualizar(dados) : this.service.criar(dados));
      this.snack.open(this.id ? 'Certificado atualizado.' : 'Certificado emitido.', 'Fechar', { duration: 3500 });
      // Quando o banco confirma a gravação, mostramos o aviso e abrimos o documento.
      await this.router.navigate(['/certificados', id]);
    } catch {
      this.snack.open('Não foi possível salvar o certificado.', 'Fechar');
    } finally {
      this.salvando.set(false);
      // Se a chamada falhar, o rascunho fica na tela para outra tentativa.
    }
  }
}
