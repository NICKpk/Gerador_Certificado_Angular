import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
describe('App', () => {
  beforeEach(async () => {
    // Cada teste começa com a aplicação e o roteador inicializados.
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });
  // O teste prepara o cabeçalho sem depender do servidor de dados.
  it('exibe os três atalhos do menu principal', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const menu = (fixture.nativeElement as HTMLElement).querySelector('nav');
    const links = [...(menu?.querySelectorAll('a') ?? [])];
    // Lemos os links renderizados para verificar a navegação entregue ao usuário.
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/home', '/certificados', '/cursos']);
  });
});
