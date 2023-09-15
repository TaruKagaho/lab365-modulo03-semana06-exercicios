import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
} )
export class HeaderComponent implements OnInit {

  nomeUsuario: string | undefined = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nomeUsuario = this.authService.obterNomePedagogoLogado();
  }

  sair() {
    this.authService.logout();
    this.router.navigate( [ '/login' ] );
  }

}
