import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAcompanhamento } from 'src/app/interfaces/IAcompanhamento';
import { IAluno } from 'src/app/interfaces/IAluno';
import { IPedagogo } from 'src/app/interfaces/IPedagogo';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { PedagogoService } from 'src/app/services/pedagogo.service';

@Component({
  selector: 'app-acompanhamentos-cadastro',
  templateUrl: './acompanhamentos-cadastro.component.html',
  styleUrls: ['./acompanhamentos-cadastro.component.css']
})
export class AcompanhamentosCadastroComponent implements OnInit {
  
  acompanhamentoForm: FormGroup;
  alunos: IAluno[] = [];
  pedagogos: IPedagogo[] = [];


  constructor(
    private router: Router, 
    private alunoService: AlunoService,
    private pedagogoService: PedagogoService,
    private acompanhamentoService: AcompanhamentoService
    ) {
    this.acompanhamentoForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      aluno: new FormControl('', [Validators.required]),
      pedagogo: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      finalizado: new FormControl(false, [Validators.required])
    });
  }

  async ngOnInit() {
    this.alunos = await this.alunoService.obterAlunos();
    this.pedagogos = await this.pedagogoService.obterPedagogos();
  }

  async onSubmit() {
    const acompanhamento: IAcompanhamento = {
      titulo: this.acompanhamentoForm.get('titulo')?.value,
      aluno: this.acompanhamentoForm.get('aluno')?.value,
      pedagogo: this.acompanhamentoForm.get('pedagogo')?.value,
      data: this._formatarData(this.acompanhamentoForm.get('data')?.value),
      descricao: this.acompanhamentoForm.get('descricao')?.value,
      finalizado: this.acompanhamentoForm.get('finalizado')?.value
    };
    await this.acompanhamentoService.cadastrarAcompanhamento(acompanhamento);
    this.router.navigate(['/labschool/acompanhamentos']);
  }

  private _formatarData(dataOriginal: string) {
    const dataParts = dataOriginal.split('-');
    return `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`
  }


}
