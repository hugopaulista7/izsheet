import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { UtilService } from '../util/util.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService, private utilService: UtilService) { }

  public FazerLogin(login: any): Observable<any> {
    this.utilService.ExibirLog("Fzer login:", login);
    let parametrosApi: any = {};
    
    parametrosApi.dados = login;
    parametrosApi.metodo = 'Logar';
    parametrosApi.controller = 'Usuario'
    return this.apiService.AcessarApi(parametrosApi);    
  }

  public Cadastrar(cadastro: any): Observable<any>{
    this.utilService.ExibirLog("Cadastrar", cadastro);
    let parametrosApi: any = {};

    parametrosApi.dados = cadastro;
    parametrosApi.metodo = "Cadastrar";
    parametrosApi.controller = "Usuario";

    return this.apiService.AcessarApi(parametrosApi);
  }
}
