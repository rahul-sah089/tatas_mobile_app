import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { AddressChangePage } from '../address-change/address-change';
import { StockTransferPage } from '../stock-transfer/stock-transfer';
import { FeToFeTransferPage } from '../fe-to-fe-transfer/fe-to-fe-transfer';
import { ExtendedDateApprovalPage } from '../extended-date-approval/extended-date-approval';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-approval',
  templateUrl: 'admin-approval.html',
})
export class AdminApprovalPage {

  globals: Globals;
  subMenuList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.globals = Globals.getInstance();
    this.subMenuList = this.globals.getAdminSubMenu();
  }

  itemClick(subMenu) {
    if(subMenu.id == 'admin_1') {
      this.navCtrl.push(StockTransferPage);
    } else if(subMenu.id == 'admin_2') {
      this.navCtrl.push(AddressChangePage);
    } else if(subMenu.id == 'admin_3') {
      console.log("Reached 3");
      this.navCtrl.push(ExtendedDateApprovalPage);
    } else if(subMenu.id == 'admin_4') {
          this.navCtrl.push(FeToFeTransferPage);
    }






  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminApprovalPage');
  }

}
