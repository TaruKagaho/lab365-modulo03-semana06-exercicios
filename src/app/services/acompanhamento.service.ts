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

  obterAcompanhamentosProximos() {
    const acompanhamentos = this.acompanhamentos.filter(ac => {
      const dateObject = this._formatarData(ac.data);
      return Date.now() <= dateObject.getTime()
    });

    const acompanhamentosSort = acompanhamentos.sort((ac1, ac2) => {
      const dateObject1 = this._formatarData(ac1.data);
      const dateObject2 = this._formatarData(ac2.data);
      return dateObject1.getDate() - dateObject2.getDate();
    });

    return acompanhamentos;
  }

  private _formatarData(dataOriginal: Date) {
    const dateString = dataOriginal.toString();
    const dateParts = dateString.split("/");
    const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return dateObject;
  }

}
