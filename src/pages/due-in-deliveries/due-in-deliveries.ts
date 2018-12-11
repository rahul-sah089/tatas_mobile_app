import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { MessageServiceProvider } from '../../providers/message-service/message-service';



@IonicPage()
@Component({
  selector: 'page-due-in-deliveries',
  templateUrl: 'due-in-deliveries.html',
})
export class DueInDeliveriesPage {

  shownGroup = null;
  globals: Globals;
  orders = [];
  pageType:string;

  constructor(public loadingCtrl:LoadingController,public navCtrl: NavController,private storage: Storage,public navParams: NavParams,public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.messageService.dueInDelivery(sso_id).subscribe(data => {
        console.log(" data for due in deliveries");
        console.log(data);
        console.log(" data for due in deliveries");
         this.orders = data;
         loading.dismiss();
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DueInDeliveriesPage');
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };


}
