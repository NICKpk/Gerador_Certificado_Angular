import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './_components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { BaseUi } from './_components/base-ui/base-ui';
import { CertificadoService } from './_services/certificado.service';
import { Certificados } from './pages/certificados/certificados';

@Component({
  imports: [RouterOutlet, Navbar, CommonModule, BaseUi],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('gerador-certificado');
  exibeNavbar: boolean = false;

  constructor(private certificadoService: CertificadoService){}

  ngOnInit(): void {
    const certificados = localStorage.getItem('certificados');
    this.certificadoService.certificados = certificados ? JSON.parse(certificados) : [];
  }
}
