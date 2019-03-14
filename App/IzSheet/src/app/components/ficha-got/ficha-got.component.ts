import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilService } from 'src/app/services/util/util.service';
import { AlertOptions } from '@ionic/core';
import { Router } from '@angular/router';


export const ID_SISTEMA = 1;

@Component({
  selector: 'app-ficha-got',
  templateUrl: './ficha-got.component.html',
  styleUrls: ['./ficha-got.component.scss']
})
export class FichaGotComponent implements OnInit {
  //Habilidades
  public habilidades:any = [];
  public verHabilidades = false;
  
  //Intriga
  public verIntriga = false;
  public defIntriga:number;
  public compostura:number;
  public vitorias:number = 0;
  public frustracoes:number = 0;

  //Combate
  public verCombate = false;
  public defCombate:number;
  public saude:number;
  public lesoes:number = 0;
  public ferimentos:number = 0;

  //personagem
  public ptsDestino:number = 0;
  public qualidadesDefeitos:string;
  public nomePersonagem:string = '';
  public idade: number = 0;
  public genero: string = '';
  public casa: string = '';
  public outros: any;

  //armas
  public armasEscolhidas: any = [];
  public armas: Array<any>;
  public verArmas: boolean = false;
  public armaEscolhida: any;
  
  //armaduras
  public armaduras: Array<any>;
  public verArmaduras: boolean = false;
  public armaduraEscolhida: any = false;

  constructor(private apiService: ApiService, private configService: ConfigService, private utilService: UtilService, private router: Router) { }

  ngOnInit() {
    this.ListarHabilidades();
    this.ListarArmas();
    this.ListarArmaduras();
  }

  ListarArmas() {
    let parametrosApi: any = {};
    parametrosApi.dados = {
      idSistema: ID_SISTEMA
    };
    parametrosApi.metodo = "ListarArmas";
    parametrosApi.controller = "Sistema";
    parametrosApi.logado = this.configService.api.logado;

    this.apiService.AcessarApi(parametrosApi).subscribe(data => {
      this.utilService.ExibirLog("Retorno Api Armas", data);
      if (data.sucesso) {
        this.armas = data.item;
      } else { 
        this.utilService.ExibirMensagem(data.mensagem);
      }
    })
  }
  ListarArmaduras() {
    let parametrosApi: any = {};
    parametrosApi.dados = {
      idSistema: ID_SISTEMA
    };
    parametrosApi.metodo = "ListarArmaduras";
    parametrosApi.controller = "Sistema";
    parametrosApi.logado = this.configService.api.logado;

    this.apiService.AcessarApi(parametrosApi).subscribe(data => {
      this.utilService.ExibirLog("Retorno Api Armaduras", data);
      if (data.sucesso) {
        this.armaduras = data.item;
      } else { 
        this.utilService.ExibirMensagem(data.mensagem);
      }
    })
  }

  ListarHabilidades() {
    let parametrosApi: any = {};
    parametrosApi.dados = {
      idSistema: ID_SISTEMA
    };
    parametrosApi.metodo = "ListarHabilidades";
    parametrosApi.controller = "Sistema";
    parametrosApi.logado = this.configService.api.logado;
    this.apiService.AcessarApi(parametrosApi).subscribe(data => {
      if (data.sucesso) {
        data.item.forEach(item => {
          this.habilidades.push(item);
        });
        this.utilService.ExibirLog("Habilidades", this.habilidades);
        this.CalcularAtributos();
      }
    });
  }

  CalcularAtributos(event?) {
  
    //intriga  
    this.defIntriga = parseInt(this.habilidades[1].nivel) + parseInt(this.habilidades[12].nivel) + parseInt(this.habilidades[16].nivel);
    this.compostura = parseInt(this.habilidades[18].nivel) * 3;
    this.utilService.ExibirLog("Intriga", {def: this.defIntriga, comp: this.compostura});

    //combate

    this.defCombate = parseInt(this.habilidades[0].nivel) + parseInt(this.habilidades[2].nivel) + parseInt(this.habilidades[13].nivel);
    this.saude = parseInt(this.habilidades[17].nivel) * 3;
    this.utilService.ExibirLog("Combate", {def: this.defCombate, hp: this.saude});
  }

  VerHabilidades() {
    if (this.verHabilidades) {
      this.verHabilidades = false;
    } else {
      this.verHabilidades = true;
    }
  }
  VerIntriga() {
    if (this.verIntriga) {
      this.verIntriga = false;
    } else {
      this.verIntriga = true;
    }
  }

  VerCombate() {
    if (this.verCombate) {
      this.verCombate = false;
    } else {
      this.verCombate = true;
    }
  }

  VerArma() {
    if (this.verArmas){
      this.verArmas = false;
    } else {
      this.verArmas = true;
    }
  }
  VerArmadura() {
    if (this.verArmaduras){
      this.verArmaduras = false;
    } else {
      this.verArmaduras = true;
    }
  }

  AdicionarArma(arma) {
    this.utilService.ExibirLog("arma", arma);
    this.armasEscolhidas.push(arma);
    this.armaEscolhida = '';
  }

  MostrarArma(arma) {
    let opcoesAlerta: AlertOptions = {
      header: arma.nome,
      message:  ` Dano: ${arma.nome} - Especialidade: ${arma.especialidade} - Qualidades: ${arma.qualidade} - Treinamento: ${arma.treinamento}`,
      keyboardClose: true,
      buttons: ['Ok']
    };
    this.utilService.ExibirAlerta(opcoesAlerta);
  }

  RemoverArma(arma) {
    this.armasEscolhidas.splice(this.armasEscolhidas.findIndex(item => item.id_core_got_armas === arma.id_core_got_armas), 1);
    this.utilService.ExibirLog("Novo array", this.armasEscolhidas);
  }



  SalvarFicha(){
    let objFicha = {
    
      idSistema: 1,
      nomeSistema: "Game of Thrones RPG",
      
      ficha: {
        informacoesBasicas: {
          nomePersonagem: this.nomePersonagem,
          idade: this.idade,
          casa: this.casa,
          sexo: this.genero,
          jogador: this.configService.api.logado,
          pontosDestino: this.ptsDestino,
          qualidades: this.qualidadesDefeitos,
        },

        habilidades: this.habilidades,
        intriga: {
          defIntriga: this.defIntriga,
          compostura: this.compostura,
          vitorias: this.vitorias,
          frustracoes: this.frustracoes
        },
        
        combate: {
          defCombate: this.defCombate,
          saude: this.saude,
          ferimentos: this.ferimentos,
          lesoes: this.lesoes
        },

        armas: this.armasEscolhidas,

        armadura: this.armaduraEscolhida,

        outros: this.outros
      }
    };

    this.utilService.ExibirAlerta({
      header: "Deseja salvar a ficha?",
      message: "Deseja realmente salvar a ficha? essa ação não pode ser revertida.",
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.EnviarFicha(objFicha)
          },
        },
        {
          text: 'Cancelar'
        }
      ]
    });
  }

  EnviarFicha(obj) {
    let parametrosApi: any = {};

    parametrosApi.dados = obj;
    parametrosApi.metodo = 'SalvarFicha';
    parametrosApi.controller = "Sistema";
    parametrosApi.logado = this.configService.api.logado;

    this.apiService.AcessarApi(parametrosApi).subscribe(data => {
      this.utilService.ExibirMensagem(data.mensagem);
      if(data.sucesso) {
        this.router.navigate(['/sistemas']);
      }
    })
  }
}
