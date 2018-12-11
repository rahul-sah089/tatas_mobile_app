import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
//import { QrScanPage } from '../../pages/qr-scan/qr-scan'



@IonicPage()
@Component({
  selector: 'page-extended-date-approval',
  templateUrl: 'extended-date-approval.html',
})
export class ExtendedDateApprovalPage {

  orders = [];
  globals: Globals;
  role: string;
  menu_items: string[];
  shownGroup = null;
  requestedDate: any;
  ssoId = '';
  itemExist = true;

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

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.requestedDate = new Date().toISOString();;
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.messageService.getExtendDateData(sso_id).subscribe(data => {
        console.log("*****extend date request data********");
        this.orders = data;
        console.log(this.orders);
        if (this.orders.length == 0) {
          this.itemExist = false;
        }
        console.log("*****extend date request data********");
        loading.dismiss();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtendedDateApprovalPage');
  }

  extendDate(order, status) {
    var jsonData = JSON.stringify({
      sso_id: this.ssoId,
      tool_order_id: order.order_info.tool_order_id,
      order_number: order.order_info.order_number,
      request_date: order.old_return_date,
      new_return_date: order.new_return_date,
      reason: "NA",
      approved_remarks: "NA",
      ac_submit: status
    });

    this.messageService.extendDateApproval(jsonData).subscribe(data => {
      if (data.transaction_status == 1) {
        console.log(data.transaction_des);
        this.presentAlert("Extend Date Approved", data.transaction_des);
      } else {
        console.log(data.transaction_des);
        this.presentAlert("Extend Date Declined", data.transaction_des);
      }
    });
  }


  presentAlert(titleInfo: string, subTitleInfo: string) {
    const alert = this.alertCtrl.create({
      title: titleInfo,
      subTitle: subTitleInfo,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

}
