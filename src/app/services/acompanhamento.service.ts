import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IAcompanhamento } from '../interfaces/IAcompanhamento';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoService {

  private acompanhamentos: IAcompanhamento[] = [];

  constructor(private httpClient: HttpClient) { }

  async obterAcompanhamentos() {
    this.acompanhamentos = await lastValueFrom(this.httpClient.get<IAcompanhamento[]>("http://localhost:3000/acompanhamentos"));
    return this.acompanhamentos;
  }

  filtrarAcompanhamentos(filtro: string) {
    let acompanhamentosFiltrados: IAcompanhamento[] = [];
    const filtroMinusculo = filtro.toLocaleLowerCase();
    for (const acompanhamento of this.acompanhamentos) {
      const titulo = acompanhamento.titulo.toLocaleLowerCase();
      
      if (titulo.includes(filtroMinusculo))
        acompanhamentosFiltrados.push(acompanhamento);
    }

    return acompanhamentosFiltrados;
  }


}
