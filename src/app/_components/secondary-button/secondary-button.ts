import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-secondary-button',
  styleUrl: './secondary-button.css',
  templateUrl: './secondary-button.html',
})
export class SecondaryButton {
  @Input() textoBotao: string = '';
  @Input() phClass: string = '';
  @Input() disasbled: boolean = false;
}
