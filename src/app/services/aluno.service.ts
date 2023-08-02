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
    const alunosCompletos = await lastValueFrom(this.httpClient.get<IAluno[]>("http://localhost:3000/alunos"));
    this.alunos = alunosCompletos.slice(0, 9);
    return alunosCompletos.slice(0, 9);
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
}
