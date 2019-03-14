import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private storage: Storage) { }
  public api = {
    logado: {}
  };
  SalvarCache(dados, chave) {
    this.storage.set(chave, dados);  
  }
}
