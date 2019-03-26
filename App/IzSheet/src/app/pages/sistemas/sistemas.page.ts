import { Component, OnInit } from '@angular/core';

import { ConfigService } from 'src/app/services/config/config.service';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilService } from 'src/app/services/util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.page.html',
  styleUrls: ['./sistemas.page.scss'],
})
export class SistemasPage implements OnInit {

  public listaSistemas: any = [];

  constructor(private configService: ConfigService, private apiService: ApiService, private utilService: UtilService, private router: Router) { }

  ngOnInit() {
    this.Listar();
  }

  Listar() {
    let parametrosApi:any = {};
    parametrosApi.metodo = "Listar";
    parametrosApi.controller = "Sistema";
    parametrosApi.logado = this.configService.api.logado;
    this.apiService.AcessarApi(parametrosApi).subscribe(data => {
      if (data.sucesso) {
        this.listaSistemas = data.item;
      } else {
        this.utilService.ExibirMensagem(data.mensagem);
      }
    });
  }

  ListarFicha(idSistema) {
    this.router.navigate(['sistema-fichas', {idSistema: idSistema}]);

  }

  doRefresh(refresher) {
    this.Listar();
    setTimeout(() => {
        refresher.target.complete();
    }, 2000);
  } 

}
