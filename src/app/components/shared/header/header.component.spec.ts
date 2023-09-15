import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/services/auth.service';
import { PedagogoService } from 'src/app/services/pedagogo.service';

describe( `${HeaderComponent.prototype.constructor.name}`, () => {
  /* let router: Router = new Router();
  let httpClient: HttpClient = new HttpClient();
  let pedagogoService: PedagogoService = new PedagogoService(httpClient);
  let authService: AuthService = new AuthService(pedagogoService); */

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule( {
      declarations: [ HeaderComponent ]
    } );
    fixture = TestBed.createComponent( HeaderComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
