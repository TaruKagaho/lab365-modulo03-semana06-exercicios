import { Component, OnInit } from '@angular/core';
import { IAcompanhamento } from 'src/app/interfaces/IAcompanhamento';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { PedagogoService } from 'src/app/services/pedagogo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  alunosCadastrados: number = 0;
  pedagogosCadastrados: number = 0;
  atendimentosPedagogicos: number = 0;
  atendimentosConcluidos: number = 0;
  acompanhamentosProximos: IAcompanhamento[] = [];

  constructor(
    private alunoService: AlunoService, 
    private pedagogoService: PedagogoService,
    private acompanhamentosService: AcompanhamentoService
    ) { }

  async ngOnInit() {
    this.alunosCadastrados = await this.alunoService.obterNumeroAlunos();
    this.pedagogosCadastrados = await this.pedagogoService.obterNumeroPedagogos();
    this.atendimentosPedagogicos = await this.acompanhamentosService.obterNumeroAcompanhamentos();
    this.atendimentosConcluidos = await this.acompanhamentosService.obterPorcentagemConcluidos();
    this.acompanhamentosProximos = this.acompanhamentosService.obterAcompanhamentosProximos();
  }

}
