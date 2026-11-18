import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
// A página usa cartão, botões e diálogos do Material para gerenciar cursos.
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ConfirmarExclusao } from '../../_components/confirmar-exclusao/confirmar-exclusao';
import { CursoService } from '../../_services/curso.service';
// O serviço consulta o banco e o diálogo confirma remoções.
import { Curso } from '../../interfaces/curso';
import { CursoForm } from './curso-form';
@Component({
  selector: 'app-cursos',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatTableModule],
  // A lista tem um formulário separado para manter a tabela mais simples.
  templateUrl: './cursos.html',
})
export class Cursos implements OnInit {
  private readonly service = inject(CursoService);
  private readonly dialog = inject(MatDialog);
  // O serviço fornece os registros e o diálogo recebe as ações de cada linha.
  private readonly snack = inject(MatSnackBar);
  readonly itens = signal<Curso[]>([]);
  readonly ocupado = signal(false);
  readonly erro = signal(false);
  readonly colunas = ['nome', 'carga', 'instrutor', 'acoes'];
  // Os sinais guardam o estado da consulta e as colunas dão ordem à tabela.
  ngOnInit() { void this.carregar(); }
  async carregar() {
    this.ocupado.set(true);
    this.erro.set(false);
    try {
      // Recarregamos a lista ao abrir a tela ou clicar em tentar novamente.
      this.itens.set(await firstValueFrom(this.service.listar()));
    } catch {
      this.erro.set(true);
    } finally {
      this.ocupado.set(false);
      // A tela informa se a consulta falhou e volta a liberar as ações.
    }
  }
  async editar(item: Curso | null = null) {
    const ref = this.dialog.open<CursoForm, Curso | null, Curso>(CursoForm, {
      data: item,
      // Passamos o curso ao formulário quando a ação vem de uma linha.
      width: '480px',
    });
    const salvo = await firstValueFrom(ref.afterClosed());
    if (!salvo) return;
    this.itens.update(itens => item
      // Só usamos o retorno do diálogo quando houve uma gravação no banco.
      ? itens.map(curso => curso.id === salvo.id ? salvo : curso)
      : [...itens, salvo]);
  }
  async excluir(item: Curso) {
    const ref = this.dialog.open<ConfirmarExclusao, string, boolean>(ConfirmarExclusao, {
      // A remoção do catálogo preserva o nome salvo nos certificados anteriores.
      data: `Excluir o curso ${item.nomeCurso}? Os certificados já emitidos serão mantidos.`,
    });
    if (!(await firstValueFrom(ref.afterClosed()))) return;
    this.ocupado.set(true);
    try {
      // Só enviamos o DELETE depois que o usuário confirma.
      await firstValueFrom(this.service.excluir(item.id));
      this.itens.update(itens => itens.filter(curso => curso.id !== item.id));
      this.snack.open('Curso excluído.', 'Fechar', { duration: 3500 });
    } catch {
      this.snack.open('Não foi possível excluir o curso.', 'Fechar');
      // Um erro conserva a linha e avisa que a exclusão não foi confirmada.
    } finally {
      this.ocupado.set(false);
    }
  }
}
