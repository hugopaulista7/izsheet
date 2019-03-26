import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  public ValidarForm(form: FormGroup) {
    this.ExibirLog("Form:", form);
    let texto;
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        const controlErrors: ValidationErrors = form.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            switch(keyError) {
              case 'required':
                texto = texto + keyError + " is required";
                break;
              case 'pattern':
                texto = texto + keyError + " wrong pattern";
                break;
              case 'minLength':
                texto = texto + keyError + " min length";
                break;
              case 'maxLength':
              texto = texto + keyError + " max length";
              break;
            }

            this.ExibirMensagem(texto);
          })
        }
      })
    } else {
      return true;
    }
  }

  public ExibirLog(texto: string, dados: any) {
    console.log(texto, dados);
  }

  public async ExibirMensagem(texto: string) {
    const mensagem = await this.toastCtrl.create({
      message: texto,
      duration: 4000,
      closeButtonText: "Ok",
      showCloseButton: true,
      color: "light"
    });

    mensagem.present();
  }

  public async ExibirAlerta(opcoesAlerta: AlertOptions) {
    let alerta = await this.alertCtrl.create(opcoesAlerta);
    await alerta.present();
  }
}
