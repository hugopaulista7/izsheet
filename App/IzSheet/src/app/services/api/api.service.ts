import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, private utilService: UtilService) { }

  public AcessarApi(parametrosApi): Observable<any> {
    const apiUrl = "http://izsheetapp.000webhostapp.com/CI/index.php/"+ parametrosApi.controller + "/api" ;
    let headers = new HttpHeaders;
    headers.append('access-control-allow-origin', '*');
    headers.append('content-type', 'application/json');
    headers.append('Accept', 'application/json');
    this.utilService.ExibirLog("Acessar api:", parametrosApi);
    return this.http.post(apiUrl, JSON.stringify(parametrosApi), {headers: headers});
  }
}
