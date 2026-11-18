import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
// A lista usa cartão, botões, formatação de data e diálogo do Material.
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
// Os controles exibem os registros e dão retorno sobre as operações.
import { CertificadoService } from '../../_services/certificado.service';
import { ConfirmarExclusao } from '../../_components/confirmar-exclusao/confirmar-exclusao';
import { Certificado } from '../../interfaces/certificado';
@Component({
  selector: 'app-certificados',
  // Esta página conecta a tabela ao serviço de certificados.
  imports: [DatePipe, MatButtonModule, MatCardModule, MatIconModule, MatTableModule, RouterLink],
  templateUrl: './certificados.html',
})
export class Certificados implements OnInit {
  private readonly service = inject(CertificadoService);
  // O serviço é a fonte de dados para o histórico.
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  readonly itens = signal<Certificado[]>([]);
  readonly ocupado = signal(false);
  readonly erro = signal(false);
  // Os sinais atualizam a tabela e mostram quando uma chamada falha.
  readonly legado = signal(this.service.temLegado());
  readonly colunas = ['aluno', 'curso', 'emissao', 'acoes'];
  ngOnInit() { void this.carregar(); }
  async carregar() {
    this.ocupado.set(true);
    // Ao abrir a página, bloqueamos as ações enquanto a lista é carregada.
    this.erro.set(false);
    try {
      this.itens.set(await firstValueFrom(this.service.listar()));
    } catch {
      this.erro.set(true);
      // A tela exibe uma opção de tentar de novo caso a lista falhe.
    } finally {
      this.ocupado.set(false);
    }
  }
  async importar() {
    // A importação é opcional e só aparece quando já existe histórico no navegador.
    this.ocupado.set(true);
    try {
      await this.service.importarLegado();
      this.legado.set(false);
      this.snack.open('Histórico importado.', 'Fechar', { duration: 3500 });
      // Quando a cópia termina, escondemos o botão e exibimos o aviso.
      await this.carregar();
    } catch {
      this.snack.open('Não foi possível importar. Tente novamente.', 'Fechar');
    } finally {
      this.ocupado.set(false);
      // Se a cópia falhar, o usuário pode tentar de novo.
    }
  }
  async excluir(item: Certificado) {
    const ref = this.dialog.open<ConfirmarExclusao, string, boolean>(ConfirmarExclusao, {
      data: `Excluir o certificado de ${item.nomeAluno}?`,
      // A confirmação identifica o aluno antes de enviar a exclusão.
    });
    if (!(await firstValueFrom(ref.afterClosed()))) return;
    this.ocupado.set(true);
    try {
      await firstValueFrom(this.service.excluir(item.id));
      // Só removemos a linha depois que a API confirmar.
      this.itens.update(itens => itens.filter(registro => registro.id !== item.id));
      this.snack.open('Certificado excluído.', 'Fechar', { duration: 3500 });
    } catch {
      this.snack.open('Não foi possível excluir o certificado.', 'Fechar');
    } finally {
      // O aviso informa o resultado e a lista volta a ficar disponível.
      this.ocupado.set(false);
    }
  }
}
