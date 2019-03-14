import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-detalhar-ficha-got',
  templateUrl: './detalhar-ficha.component.html',
  styleUrls: ['./detalhar-ficha.component.scss']
})
export class DetalharFichaComponent implements OnInit {
  @Input() ficha: any = {};
  constructor(private utilService: UtilService) { }

  ngOnInit() {
    this.utilService.ExibirLog("ficha component::", this.ficha);
  }

  VerEspecialidades(especialidades) {
    this.utilService.ExibirAlerta({
      header: 'Especialidades',
      message: especialidades,
      buttons:['Ok']
    });
  }
  
  

}
