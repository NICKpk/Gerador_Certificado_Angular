import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-primary-button',
  styleUrl: './primary-button.css',
  templateUrl: './primary-button.html',
})
export class PrimaryButton {
 @Input() textoBotao: string = '';
 @Input() disasbled: boolean = false;
}
