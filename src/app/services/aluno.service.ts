import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IAluno } from '../interfaces/IAluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  alunos: IAluno[] = [];

  constructor(private httpClient: HttpClient) { }

  async obterAlunos() {
    this.alunos = await lastValueFrom(this.httpClient.get<IAluno[]>("http://localhost:3000/alunos"));
    return this.alunos;
  }

  filtrarAlunos(filtro: string) {
    let alunosFiltrados: IAluno[] = [];
    const filtroMinusculo = filtro.toLocaleLowerCase();
    for (const aluno of this.alunos) {
      const nome = aluno.nome.toLocaleLowerCase();
      
      if (nome.includes(filtroMinusculo))
        alunosFiltrados.push(aluno);
    }

    return alunosFiltrados;
  }

  async obterNumeroAlunos() {
    if (this.alunos.length === 0)
      await this.obterAlunos();
    return this.alunos.length;
  }
}
