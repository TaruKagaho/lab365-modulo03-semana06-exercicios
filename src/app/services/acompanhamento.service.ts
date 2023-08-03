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

  async obterNumeroAcompanhamentos() {
    if (this.acompanhamentos.length === 0)
      await this.obterAcompanhamentos();
    return this.acompanhamentos.length;
  }

  async obterPorcentagemConcluidos() {
    if (this.acompanhamentos.length === 0)
      await this.obterAcompanhamentos();
    const acompanhamentosConcluidos = this.acompanhamentos.filter(ac => ac.finalizado);
    return Math.floor((acompanhamentosConcluidos.length / this.acompanhamentos.length) * 100);
  }


}
