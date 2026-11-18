import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
// O diálogo reutiliza os mesmos campos para cadastro e edição.
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { CursoService } from '../../_services/curso.service';
import { Curso } from '../../interfaces/curso';
// O serviço grava os dados e a mensagem mostra o resultado ao usuário.
@Component({
  selector: 'app-curso-form',
  imports: [FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './curso-form.html',
})
// O formulário é aberto pela página de gerenciamento de cursos.
export class CursoForm {
  private readonly service = inject(CursoService);
  private readonly snack = inject(MatSnackBar);
  private readonly dialog = inject(MatDialogRef<CursoForm, Curso>);
  readonly original = inject<Curso | null>(MAT_DIALOG_DATA);
  // Recebemos o curso da tabela quando o usuário escolhe editar.
  readonly item = this.original ? { ...this.original } : { nomeCurso: '', cargaHorariaPadrao: 1, instrutor: '' };
  readonly salvando = signal(false);
  async salvar(form: NgForm) {
    if (form.invalid || this.salvando()) return;
    const { nomeCurso, cargaHorariaPadrao, instrutor } = this.item;
    // A cópia evita alterações na tabela antes de confirmar o formulário.
    const dados = { nomeCurso: nomeCurso.trim(), cargaHorariaPadrao, instrutor: instrutor.trim() };
    this.salvando.set(true);
    this.dialog.disableClose = true;
    try {
      const salvo = await firstValueFrom(this.original
        // Com o ID editamos o registro, sem ele cadastramos um curso.
        ? this.service.atualizar({ ...dados, id: this.original.id })
        : this.service.criar(dados));
      this.snack.open(this.original ? 'Curso atualizado.' : 'Curso cadastrado.', 'Fechar', { duration: 3500 });
      this.dialog.close(salvo);
    } catch {
      // Devolvemos o registro salvo à tabela e mantemos o rascunho se houver erro.
      this.snack.open('Não foi possível salvar o curso.', 'Fechar');
    } finally {
      this.salvando.set(false);
      this.dialog.disableClose = false;
    }
    // Depois da resposta, os controles do diálogo voltam ao normal.
  }
}
