import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-sistema-fichas',
  templateUrl: './sistema-fichas.page.html',
  styleUrls: ['./sistema-fichas.page.scss'],
})
export class SistemaFichasPage implements OnInit {
  public idSistema;
  public listaFichas: any = [];
  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private apiService: ApiService,
    private utilService: UtilService,
    private router: Router
    ) { }

  ngOnInit() {
    this.idSistema = this.route.snapshot.paramMap.get("idSistema");
    this.ListarFichas();
  }
  
  ListarFichas() {
    this.listaFichas = [];
    let parametrosApi: any = {};
    parametrosApi.metodo = "ListarFichas";
    parametrosApi.controller = "Sistema";
    console.log(this.configService.api.logado);
    parametrosApi.logado = this.configService.api.logado;
    parametrosApi.dados = {idSistema: this.idSistema};

    this.apiService.AcessarApi(parametrosApi).subscribe(data => {
      this.utilService.ExibirLog("Retorno api", data);
      if (data.sucesso) {
        data.item.forEach(element => {
          element.ficha = JSON.parse(element.ficha);
          this.listaFichas.push(element);
        });
      } else {
        this.utilService.ExibirMensagem(data.mensagem);
      }
    })
  }

  doRefresh(refresher) {
    // this.listaFichas = [];
    this.ListarFichas();
    setTimeout(() => {
        refresher.target.complete();
    }, 2000);
  }

  CriarFicha() {
    this.router.navigate(['ficha', {idSistema: this.idSistema}]);
  }

  DetalharFicha(idFicha) {
    this.router.navigate(['ficha-detalhar', {idFicha: idFicha}]);
  }

  ExcluirFicha(idFicha) {
    this.utilService.ExibirAlerta({
      header: "Deseja realmente excluir essa ficha?",
      subHeader: "Essa ação não pode ser desfeita",
      message: "Se você clicar em Confirmar essa ficha será excluída.",
      buttons:[
        {
          text: "Cancelar"
        },
        {
          text: "Confirmar",
          handler: ()=>{
            this.utilService.ExibirLog("Exclusao de ficha", idFicha);
            this.ConfirmarExclusao(idFicha);
          }
        }
      ]
    })
  }

  ConfirmarExclusao(idFicha) {
    if (idFicha) {
      let parametrosApi = {
        metodo: "ExcluirFicha",
        controller: "Sistema",
        dados: {
          idFicha: idFicha,
        },
        logado: this.configService.api.logado
      };
      this.apiService.AcessarApi(parametrosApi).subscribe(data => {
        this.utilService.ExibirMensagem(data.mensagem);
        if(data.sucesso) {
          this.ListarFichas();  
        } 
      });
    }
  }

}
