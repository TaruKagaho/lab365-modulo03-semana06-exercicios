import { Injectable } from '@angular/core';
import { PedagogoService } from './pedagogo.service';
import { IPedagogo } from '../interfaces/IPedagogo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private pedagogoService: PedagogoService) { }

  async login(email: string, senha: string) {
    const pedagogos = await this.pedagogoService.obterPedagogos();
    for (const pedagogo of pedagogos) {
      const emailCorreto = email === pedagogo.email;
      const senhaCorreta = senha === pedagogo.senha;
      if (emailCorreto && senhaCorreta) {
        localStorage.setItem("usuario", JSON.stringify(pedagogo));
        return;
      }
    }

    throw new Error("Credenciais inválidas!");
  }

  obterNomePedagogoLogado() {
    const pedagogoString = localStorage.getItem("usuario");
    if (pedagogoString === null) return;
    const pedagogoLogado = <IPedagogo>JSON.parse(pedagogoString);
    console.log(pedagogoLogado);
    const nomeCompleto = pedagogoLogado.nome; 
    return nomeCompleto?.substring(0, nomeCompleto?.indexOf(' ')); ;
  }

  estaLogado() {
    const pedagogo = localStorage.getItem("usuario");
    console.log(pedagogo);
    return pedagogo !== null;
  }

  logout() {
    localStorage.removeItem("usuario");
  }
}
