import { Injectable } from '@angular/core';
import { PedagogoService } from './pedagogo.service';

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
      if (emailCorreto && senhaCorreta)
        return;
    }

    throw new Error("Credenciais inválidas!");
  }
}
