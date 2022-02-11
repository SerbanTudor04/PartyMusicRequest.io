import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastController } from '@ionic/angular';@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifDuration=5000;
  constructor(public toastController: ToastController) { }

  async sendMessage(message:string){
    const toast = await this.toastController.create({
      header: 'Success',
      message: message,
      duration: 5000,
      icon: 'information-circle',
      position: 'bottom',
    });
    toast.present();
  }


  async sendDanger(message:string){
    this.sendMessage(message);

  }
  async sendWarning(message:string){
    this.sendMessage(message);

  }
  async sendSuccess(message:string){


    this.sendMessage(message);
  }

}
