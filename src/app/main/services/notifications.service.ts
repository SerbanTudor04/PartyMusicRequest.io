import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifDuration=5000;
  constructor(private snackbar:MatSnackBar) { }
  sendDanger(message:string){
    this.snackbar.open(message,'Close',{
      duration:this.notifDuration,
      panelClass:['notif-class-danger'],
      horizontalPosition: "end",
      verticalPosition: "top",
    })
  }
  sendWarning(message:string){
    this.snackbar.open(message,'Close',{
      duration:this.notifDuration,
      panelClass:['notif-class-warning'],
      horizontalPosition: "end",
      verticalPosition: "top",
    })
  }
  sendSuccess(message:string){
    this.snackbar.open(message,'Close',{
      duration:this.notifDuration,
      panelClass:['notif-class-success'],
      horizontalPosition: "end",
      verticalPosition: "top",
    })
  }

}
