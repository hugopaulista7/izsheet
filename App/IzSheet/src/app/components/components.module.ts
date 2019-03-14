import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaGotComponent } from './ficha-got/ficha-got.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DetalharFichaComponent } from './ficha-got/detalhar-ficha/detalhar-ficha.component';

@NgModule({
  declarations: [FichaGotComponent, DetalharFichaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [FichaGotComponent, DetalharFichaComponent]
})
export class ComponentsModule { }
