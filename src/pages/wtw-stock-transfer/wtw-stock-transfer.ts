import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-wtw-stock-transfer',
  templateUrl: 'wtw-stock-transfer.html',
})
export class WtwStockTransferPage {

  globals: Globals;
  ssoId = '';
  stockInformations: any = [];
  //stockInformations.or  der_in  f o:   = {};
  stnNo = "";
  assets: any = [];
  comment: string = "";
  toolOrderId: string = "";

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.toolOrderId = navParams.get('tool_order_id');
    console.log("tool Order Id");
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.messageService.stockWHToWH(sso_id, this.toolOrderId).subscribe(data => {
        this.stockInformations = data;
        this.stnNo = this.stockInformations.order_info.stn_number;
        this.assets = this.stockInformations.assets;
        console.log("stock informations");
        console.log(this.stockInformations);
        console.log(this.stnNo);
        console.log(this.assets);
        loading.dismiss();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WtwStockTransferPage');
  }

  accept() {
    console.log(this.ssoId);
    var jsonData = JSON.stringify({
      stn_number: this.stnNo, tool_order_id: this.toolOrderId, admin_remarks: this.comment,
      sso_id: this.ssoId, submit_action: "1"
    });

    this.messageService.stockTransferWHToWHPost(jsonData).subscribe(data => {

      this.presentAlert("W2W Stock Transfer", "Initialized Succesfully");

    });


  }

  decline() {
    console.log(this.ssoId);
    var jsonData = JSON.stringify({
      stn_number: this.stnNo, tool_order_id: this.toolOrderId, admin_remarks: this.comment,
      sso_id: this.ssoId, submit_action: "2"
    });

    this.messageService.stockTransferWHToWHPost(jsonData).subscribe(data => {
      console.log(data);
      this.presentAlert("W2W Stock Transfer", "Stock Transfer has been  Rejected");

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
