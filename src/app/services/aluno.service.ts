import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IAluno } from '../interfaces/IAluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private httpClient: HttpClient) { }

  async obterAlunos() {
    const alunos = await lastValueFrom(this.httpClient.get<IAluno[]>("http://localhost:3000/alunos"));
    return alunos.slice(0, 9);
  }
}
