import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-qr-scan',
  templateUrl: 'qr-scan.html',
})
export class QrScanPage {

  order: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order = navParams.get('orders');
    console.log(this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrScanPage');
  }

}
