import { Component, OnInit } from '@angular/core';
import { IAluno } from 'src/app/interfaces/IAluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  alunos?: IAluno[];

  constructor(private alunoService: AlunoService) { }

  async ngOnInit() {
    this.alunos = await this.alunoService.obterAlunos();
    console.log(this.alunos);
  }

  onInputChange() {
    const input = document.getElementById("filtroAluno") as HTMLInputElement;
    if (this.alunos === undefined) return;
    this.alunos = this.alunoService.filtrarAlunos(input.value);
  }
}
