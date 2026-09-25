import { Component, OnInit } from '@angular/core';
import { SecondaryButton } from '../../_components/secondary-button/secondary-button';
import { ItemCertificado } from '../../_components/item-certificado/item-certificado';
import { RouterLink } from '@angular/router';
import { CertificadoService } from '../../_services/certificado.service';
import { Certificado } from '../../interfaces/certificado';


@Component({
  imports: [ItemCertificado, SecondaryButton, RouterLink],
  selector: 'app-certificados',
  styleUrl: './certificados.css',
  templateUrl: './certificados.html',
})
export class Certificados implements OnInit {

  certificados: Certificado[] = [];

  constructor(private certificadoService: CertificadoService){}

  ngOnInit(): void {
    this.certificados = this.certificadoService.certificados;
  }
}
