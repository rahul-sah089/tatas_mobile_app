import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Globals } from '../../app/Globals';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';
import { NotificationPage } from '../notification/notification';

@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class HeaderPage {
  globals: Globals;
  constructor(public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController, public platform: Platform) {
    this.globals = Globals.getInstance();
  }




  redirectHome() {
    this.navCtrl.setRoot(MenuPage);
  }

  showNotif() {
    this.navCtrl.push(NotificationPage);
  }

  
  logOut() {
    let alert = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Do you really want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Cancel");
          }
        },
        {
          text: 'Sure',
          handler: () => {
            console.log("Sure");
            this.storage.remove(this.globals.role_id);
            this.storage.remove(this.globals.sso_id);
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }


}
