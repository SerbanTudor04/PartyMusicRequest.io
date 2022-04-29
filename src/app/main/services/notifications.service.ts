import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastController, ToastOptions } from '@ionic/angular';@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifDuration=5000;
  constructor(public toastController: ToastController) { }

  async sendMessage(header:string,message:string,icon:string,duration:number=this.notifDuration,position:ToastOptions["position"]='bottom'){
    const toast = await this.toastController.create({
      header: header,
      message: message,
      duration: duration,
      icon: "assets/icons/"+icon+".svg",
      position: position,
    });
    toast.present();
  }


  async sendDanger(message:string){
    this.sendMessage("Error",message,"bug-outline");

  }
  async sendWarning(message:string){
    this.sendMessage("Warning",message,"alert-outline");

  }
  async sendSuccess(message:string){


    this.sendMessage("Success",message,"happy-outline");
  }

}
