import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private acompanhamentoService: AcompanhamentoService,
    private router: Router
    ) { }

  async ngOnInit() {
    this.acompanhamentos = await this.acompanhamentoService.obterAcompanhamentos();
  }

  onInputChange() {
    const input = document.getElementById("filtroAcompanhamento") as HTMLInputElement;
    this.acompanhamentos = this.acompanhamentoService.filtrarAcompanhamentos(input.value);
  }

  editar(acompanhamento: IAcompanhamento) {
    this.router.navigate(
      ["/labschool/acompanhamentos-cadastro"], 
      { queryParams: { id: acompanhamento.id } }
    );
  }

}
