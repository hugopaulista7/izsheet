import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { UtilService } from 'src/app/services/util/util.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {
  public idSistema;
  constructor(
    private configService: ConfigService,
    private utilService: UtilService,
    private ApiService: ApiService,
    private activatedRoute: ActivatedRoute 
  ) { }

  ngOnInit() {
    this.idSistema = this.activatedRoute.snapshot.paramMap.get("idSistema");
  }

}
