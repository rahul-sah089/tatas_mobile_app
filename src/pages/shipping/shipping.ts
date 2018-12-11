import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Globals } from '../../app/Globals';
import { ModalController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-shipping',
  templateUrl: 'shipping.html',
})
export class ShippingPage {

  shownGroup = null;
  globals: Globals;
  orders = [];
  pageType:string;


  constructor(public modalCtrl: ModalController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    this.globals = Globals.getInstance();
    this.pageType = this.navParams.get("type");
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.messageService.shipmentRequest(sso_id).subscribe(data => {
        this.orders = data;
      });
    })
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
