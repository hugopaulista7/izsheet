import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ConfigService } from './services/config/config.service';
import { UtilService } from './services/util/util.service';
import { SistemasPage } from './pages/sistemas/sistemas.page';
import { UsuarioLoginPage } from './pages/usuario-login/usuario-login.page';
export interface Pagina {
  titulo: string,
  icone: string,
  pagina: any,
  parametros?: any
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages: Array<Pagina>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private configService: ConfigService,
    private utilService: UtilService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.ListarCache();
      this.CarregarPaginas();
    });
  }

  ListarCache() {
    this.storage.get("Login").catch(err => {
      if (err != null) {
        this.router.navigateByUrl('');
      }

    }).then(res => {
      if (res != null) {
        this.configService.api.logado = res;
        this.utilService.ExibirLog("Logado:", this.configService.api.logado);
        this.router.navigateByUrl('sistemas');
        
      }
    });
  }
  CarregarPaginas() {
    this.appPages = [
      {titulo: "Sistemas", icone: "book", pagina: 'sistemas'},
      {titulo: "Sair", icone: "power", pagina: 'usuario-login'}
    ]
  }
  
}
