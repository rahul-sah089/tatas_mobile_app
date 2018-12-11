import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-fe-to-fe-transfer',
  templateUrl: 'fe-to-fe-transfer.html',
})
export class FeToFeTransferPage {

  shownGroup = null;
  globals: Globals;
  ssoId = '';
  feToFeDetails = [];
  isItemPresent = true;

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.messageService.feToFeTransfer(sso_id).subscribe(data => {
        this.feToFeDetails = data;
        console.log("fe to fe transfer");
        if (this.feToFeDetails.length == 0) {
          this.isItemPresent = false;
        }
        console.log(this.feToFeDetails);
        console.log("fe to fe transfer");
        loading.dismiss();
      });
    });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeToFeTransferPage');
  }

  onClick(status, feToFe: any) {
    console.log(status);
    console.log(feToFe);
    status = "" + status;

    var jsonData = JSON.stringify({
      sso_id: this.ssoId, return_type_id: feToFe.return_type_id, return_order_id: feToFe.return_order_id,
      approve: status, rto_id: feToFe.rto_id, admin_remarks: "NA", fe1_tool_order_id: feToFe.fe1_tool_order_id,
      order_status_id: feToFe.order_status_id, fe2_tool_order_id: feToFe.fe2_tool_order_id
    });

    this.messageService.feToFeTransferPost(jsonData).subscribe(data => {
      if (status == 1) {
        this.presentAlert("FE to FE Transfer Request", "Initialized Succesfully");
      } else if (status == 2) {
        this.presentAlert("FE to FE Transfer Request", "Transfer Declined");
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


