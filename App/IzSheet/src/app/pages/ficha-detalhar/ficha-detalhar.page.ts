import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UtilService } from 'src/app/services/util/util.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfigService } from 'src/app/services/config/config.service';



@Component({
  selector: 'app-ficha-detalhar',
  templateUrl: './ficha-detalhar.page.html',
  styleUrls: ['./ficha-detalhar.page.scss'],
})

export class FichaDetalharPage implements OnInit {

  public idFicha: any = 0;
  public idSistema = 0;
  public fichaServer: any;
  @Output() fichaEvent =  new EventEmitter<any>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private apiService: ApiService,
    private configService: ConfigService
    ) { }

  ngOnInit() {
    this.idFicha = this.activatedRoute.snapshot.paramMap.get("idFicha");
    this.DetalharFicha();
  }

  DetalharFicha() {
    if (this.idFicha != 0) {
      let parametrosApi: any = {};
      parametrosApi.dados = {
        idFicha: this.idFicha
      };
      parametrosApi.metodo = "DetalharFicha";
      parametrosApi.controller = "Sistema";
      parametrosApi.logado = this.configService.api.logado;

      this.apiService.AcessarApi(parametrosApi).subscribe( data => {
        this.utilService.ExibirLog("Retorno api detalhar ficha:", data);
        if(data.sucesso) {
          this.fichaServer = JSON.parse(data.item.ficha);
          this.idSistema = data.item.id_core_sistema;
          this.utilService.ExibirLog("Ficha:", this.fichaServer);
        } else {
          this.utilService.ExibirMensagem(data.mensagem);
        }
      });
    }
  }

}
