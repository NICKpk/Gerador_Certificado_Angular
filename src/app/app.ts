import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './_components/navbar/navbar';
import { BaseUi } from './_components/base-ui/base-ui';
// A tela principal usa o cabeçalho, o contêiner e o espaço das rotas.
@Component({
  imports: [RouterOutlet, Navbar, BaseUi],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  // Estas opções ligam a tela principal ao HTML e ao CSS existentes.
})
export class App {}
