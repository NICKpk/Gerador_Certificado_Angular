import { Component, Input } from '@angular/core';
import { SecondaryButton } from '../secondary-button/secondary-button';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [SecondaryButton,],
  selector: 'app-item-certificado',
  styleUrl: './item-certificado.css',
  templateUrl: './item-certificado.html',
})
export class ItemCertificado {

  @Input() nomeAluno: string = '';
  @Input() dataEmissao: string = '';
  @Input() id: string = '';

  constructor(private router: Router){}

  redirecionaCertificado(){
    this.router.navigate(['/certificados', this.id]);
  }
}
