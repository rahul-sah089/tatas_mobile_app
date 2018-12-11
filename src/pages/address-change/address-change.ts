import { Component, } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-address-change',
  templateUrl: 'address-change.html',
})
export class AddressChangePage {

  globals: Globals;
  addressList = [];
  ssoId = '';
  err_msg = '';
  success_msg = '';
  itemExist = true;

  constructor(public loadingCtrl:LoadingController,public alertCtrl:AlertController,private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.messageService.addressChange(sso_id).subscribe(data => {
        this.addressList = data;
        console.log(this.addressList);
        if(this.addressList.length == 0){
           this.itemExist = false; 
        }
        loading.dismiss();
      });
    })
  }

  onClick(status, address) {

    var jsonData = "";
    var url = "";

    if(address.order_info.return_order_id === undefined) {
      url = "submit_order_address_changeM";
      jsonData = JSON.stringify({ sso_id: this.ssoId,
                                    location_id: address.order_info.location_id,
                                    tool_order_id: address.order_info.tool_order_id,
                                    order_number: address.order_info.order_number,
                                    site_id: address.order_info.site_id,
                                    address1: address.order_info.address1,
                                    address2: address.order_info.address2,
                                    address3: address.order_info.address3,
                                    address4: address.order_info.address4,
                                    pin_code: address.order_info.pin_code,
                                    remarks: address.order_info.remarks,
                                    ac_submit: status});
      } else {
        url = "submit_return_address_changeM";
        jsonData = JSON.stringify({ sso_id: this.ssoId,
                                      location_id: address.order_info.location_id,
                                      return_order_id: address.order_info.return_order_id,
                                      return_number: address.order_info.return_number,
                                      site_id: address.order_info.site_id,
                                      address1: address.order_info.address1,
                                      address2: address.order_info.address2,
                                      address3: address.order_info.address3,
                                      address4: address.order_info.address4,
                                      pin_code: address.order_info.pin_code,
                                      remarks: address.order_info.remarks,
                                      ac_submit: status});
    }

    this.messageService.addressUpdate(jsonData, url).subscribe(data => {
      if(data.transaction_status == 1) {
        this.success_msg = data.transaction_des;
        this.presentAlert("Address Change",data.transaction_des);
      } else {
        this.err_msg = data.transaction_des;
        this.presentAlert("Address Change",data.transaction_des);
      }
    });
    // TODO delete updated address
    // delete this.addressList[this.addressList.indexOf(address)];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressChangePage');
  }

  presentAlert(titleInfo:string,subTitleInfo:string){
    const alert = this.alertCtrl.create({
      title: titleInfo,
      subTitle: subTitleInfo,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
    this.navCtrl.pop();
    //this.navCtrl.push(ExtendDatePage,{});
  }

}
