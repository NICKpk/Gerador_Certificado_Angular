import { Routes } from '@angular/router';
const carregarFormulario = () => import('./pages/certificado-form/certificado-form').then(pagina => pagina.CertificadoForm);
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: carregarFormulario },
  // A rota inicial abre o formulário e carrega seu código só quando necessário.
  { path: 'certificados', loadComponent: () => import('./pages/certificados/certificados').then(pagina => pagina.Certificados) },
  { path: 'certificados/novo', loadComponent: carregarFormulario },
  { path: 'certificados/:id/editar', loadComponent: carregarFormulario },
  { path: 'certificados/:id', loadComponent: () => import('./pages/certificado/certificado').then(pagina => pagina.CertificadoComponent) },
  { path: 'cursos', loadComponent: () => import('./pages/cursos/cursos').then(pagina => pagina.Cursos) },
  // As páginas de histórico, emissão e cursos são carregadas conforme a navegação.
  { path: '**', redirectTo: 'home' },
];
// Endereços desconhecidos voltam à página inicial.
