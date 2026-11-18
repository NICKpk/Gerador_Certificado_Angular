import { DatePipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
// A página usa botões do Material e mantém a exportação da arte em PNG.
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CertificadoService } from '../../_services/certificado.service';
import { Certificado } from '../../interfaces/certificado';
@Component({
  // O documento continua disponível pelo endereço individual do certificado.
  imports: [DatePipe, MatButtonModule, MatIconModule, RouterLink],
  selector: 'app-certificado',
  styleUrl: './certificado.css',
  templateUrl: './certificado.html',
})
// O HTML e o CSS existentes dão forma à arte que será exportada.
export class CertificadoComponent implements OnInit {
  private readonly service = inject(CertificadoService);
  private readonly snack = inject(MatSnackBar);
  private readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  private readonly arte = viewChild<ElementRef<HTMLElement>>('certificadoContainer');
  // A rota indica qual registro buscar e a referência indica qual área baixar.
  readonly certificado = signal<Certificado | null>(null);
  readonly carregando = signal(true);
  readonly baixando = signal(false);
  ngOnInit() { void this.carregar(); }
  async carregar() {
    // A consulta começa quando chegamos à página do documento.
    this.carregando.set(true);
    try {
      this.certificado.set(await firstValueFrom(this.service.buscar(this.id)));
    } catch {
      this.certificado.set(null);
      // Se o registro estiver indisponível, a página oferece nova tentativa.
    } finally {
      this.carregando.set(false);
    }
  }
  async downloadCertificado() {
    // O download depende de o documento já ter sido exibido.
    const elemento = this.arte()?.nativeElement;
    const item = this.certificado();
    if (!elemento || !item || this.baixando()) return;
    this.baixando.set(true);
    try {
      // Carregamos a biblioteca de captura apenas quando o usuário pede o arquivo.
      const { default: html2canvas } = await import('html2canvas');
      await document.fonts.ready;
      const canvas = await html2canvas(elemento, { scale: 2 });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      // Depois de renderizar a arte, criamos o link para baixar a imagem.
      link.download = `certificado_${item.nomeAluno.replaceAll(' ', '_')}.png`;
      link.click();
    } catch {
      this.snack.open('Não foi possível baixar o certificado.', 'Fechar');
    } finally {
      // Se houver erro, avisamos e permitimos uma nova tentativa.
      this.baixando.set(false);
    }
  }
}
