import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util/util.service';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.page.html',
  styleUrls: ['./usuario-login.page.scss'],
})
export class UsuarioLoginPage implements OnInit {

  public login: FormGroup;
  public cadastro: FormGroup;

  public tipoPagina: string = "login";


  constructor(
    private menu: MenuController, 
    private formBuilder: FormBuilder, 
    private utilService: UtilService, 
    private usuarioService: UsuarioService, 
    private configService: ConfigService,
    private router: Router,
    private storage: Storage
    ) { }

  ngOnInit() {
    this.LimparCache();
    this.menu.enable(false, "menuInicial");
    this.login = this.formBuilder.group({
      nomeUsuario:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
      ],
      senha: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
      ]
    })

    this.cadastro = this.formBuilder.group({
      nomeCompleto: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(30)
        ])
      ],

      email:[
        '',
        Validators.compose([
          Validators.email,
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)
        ])
      ],

      senha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)
        ])
      ],

      confirmarSenha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)
        ])
      ],
      nomeUsuario:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
      ],

    })
  }

  LimparCache() {
    this.utilService.ExibirLog("Limpando cache", null);
    this.storage.clear().then(() => {
      this.configService.api.logado = {};
      this.utilService.ExibirLog("Api logado limpo", this.configService.api.logado);
    })
  }

  Login() {
    if (this.utilService.ValidarForm(this.login)) {
      this.usuarioService.FazerLogin(this.login.value).subscribe(data => {
        
        if (data.sucesso) {
          this.configService.SalvarCache(data.item, "Login");
          this.configService.api.logado = data.item;
          this.router.navigate(['/sistemas/']);
        } else {
          this.utilService.ExibirMensagem(data.mensagem);
        }
      });
    }
    
  }

  Cadastro() {
    if (this.tipoPagina == "cadastro") {
      this.tipoPagina = "login";
    } else {
      this.tipoPagina = "cadastro"
    }

  }

  Cadastrar() {
    if (this.utilService.ValidarForm(this.cadastro)) {
      this.usuarioService.Cadastrar(this.cadastro.value).subscribe(data => {
        this.utilService.ExibirMensagem(data.mensagem);
        if (data.sucesso) {
          this.configService.api.logado = data.item;
          this.configService.SalvarCache(data.item, "Login");
        }
      })
    }
  }

}
