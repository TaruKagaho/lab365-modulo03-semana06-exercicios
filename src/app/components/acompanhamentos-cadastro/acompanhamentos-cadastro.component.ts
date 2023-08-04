import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
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
  acompanhamentoId = 0;


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
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
    const params = await firstValueFrom(this.route.queryParams);

    if (params['id']) {
      const id = +params['id'];
      this.acompanhamentoId = id;
      const acompanhamento = await this.acompanhamentoService.obterAcompanhamentoPorId(id);
      this.acompanhamentoForm.setValue({
        titulo: acompanhamento.titulo,
        aluno: acompanhamento.aluno,
        pedagogo: acompanhamento.pedagogo,
        data: this._formatarDataParaHtml(acompanhamento.data),
        descricao: acompanhamento.descricao,
        finalizado: acompanhamento.finalizado
      });

    }
  }

  async onSubmit() {
    const acompanhamento: IAcompanhamento = {
      id: this.acompanhamentoId,
      titulo: this.acompanhamentoForm.get('titulo')?.value,
      aluno: this.acompanhamentoForm.get('aluno')?.value,
      pedagogo: this.acompanhamentoForm.get('pedagogo')?.value,
      data: this._formatarData(this.acompanhamentoForm.get('data')?.value),
      descricao: this.acompanhamentoForm.get('descricao')?.value,
      finalizado: this.acompanhamentoForm.get('finalizado')?.value
    };
    if (this.acompanhamentoId === 0)
      await this.acompanhamentoService.cadastrarAcompanhamento(acompanhamento);
    else 
      await this.acompanhamentoService.atualizarAcompanhamento(acompanhamento);
    this.router.navigate(['/labschool/acompanhamentos']);
  }

  private _formatarData(dataOriginal: string) {
    const dataParts = dataOriginal.split('-');
    return `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;
  }

  private _formatarDataParaHtml(dataOriginal: string) {
    const dataParts = dataOriginal.split('/');
    const dataCorreta = `${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`;
    return dataCorreta;
  }
}
