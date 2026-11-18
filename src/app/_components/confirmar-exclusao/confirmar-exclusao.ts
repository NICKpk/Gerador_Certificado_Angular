import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmar-exclusao',
  // O diálogo é compartilhado pelas duas listas.
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirmar-exclusao.html',
})
export class ConfirmarExclusao {
  readonly mensagem = inject<string>(MAT_DIALOG_DATA);
  // A página informa o nome do registro selecionado.
}
