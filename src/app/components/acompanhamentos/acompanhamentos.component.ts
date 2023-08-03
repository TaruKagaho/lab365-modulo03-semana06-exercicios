import { Component } from '@angular/core';
import { IAcompanhamento } from 'src/app/interfaces/IAcompanhamento';
import { IAluno } from 'src/app/interfaces/IAluno';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-acompanhamentos',
  templateUrl: './acompanhamentos.component.html',
  styleUrls: ['./acompanhamentos.component.css']
})
export class AcompanhamentosComponent {

  acompanhamentos: IAcompanhamento[] = [];

  constructor(private acompanhamentoService: AcompanhamentoService) { }

  async ngOnInit() {
    this.acompanhamentos = await this.acompanhamentoService.obterAcompanhamentos();
  }

  onInputChange() {
    const input = document.getElementById("filtroAcompanhamento") as HTMLInputElement;
    this.acompanhamentos = this.acompanhamentoService.filtrarAcompanhamentos(input.value);
  }

}
