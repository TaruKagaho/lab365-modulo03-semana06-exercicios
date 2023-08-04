import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAluno } from 'src/app/interfaces/IAluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-alunos-cadastro',
  templateUrl: './alunos-cadastro.component.html',
  styleUrls: ['./alunos-cadastro.component.css']
})
export class AlunosCadastroComponent {

  alunoForm: FormGroup;

  constructor(private router: Router, private alunoService: AlunoService) {
    this.alunoForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      data: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      nota: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  async onSubmit() {
    const aluno: IAluno = {
      nome: this.alunoForm.get('nome')?.value,
      telefone: this.alunoForm.get('telefone')?.value,
      dataNascimento: this._formatarData(this.alunoForm.get('data')?.value),
      cpf: this.alunoForm.get('cpf')?.value,
      nota: this.alunoForm.get('nota')?.value
    };
    await this.alunoService.cadastrarAluno(aluno);
    this.router.navigate(['/labschool/alunos']);
  }

  private _formatarData(dataOriginal: string) {
    const dataParts = dataOriginal.split('-');
    return `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`
  }

}
