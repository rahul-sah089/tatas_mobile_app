import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-logistics-alert',
  templateUrl: 'logistics-alert.html',
})
export class LogisticsAlertPage {

  globals: Globals;
  ssoId = '';
  shownGroup = null;
  tableHeaderList = [{ "header1": "Order No.", "header2": "ST No.", "header3": "Pickup No.", "header4": "CRB No.", "header5": "RRB No.", "header6": "Order No.", "header7": "ST No." }, { "header1": "Destination", "header2": "Destination", "header3": "Destination", "header4": "Destination", "header5": "Destination", "header6": "FE Name", "header7": "Warehouse No." }, { "header1": "Requested Date", "header2": "Requested Date", "header3": "Shipment By Date", "header4": "Supplier", "header5": "Supplier", "header6": "Return Date", "header7": "Return Date" }, { "header1": "Shipping Date", "header2": "Shipping Date", "header3": "FE Name", "header4": "Requested Date", "header5": "Shipment By Date" }, { "header1": "FE Name", "header2": "Available", "header4": "Shipment By Date", "header5": "Requested Date" }];
  tableSubHeaderList = [{ "subheader1": "Tool No", "subheader2": "Tool No", "subheader3": "Tool No", "subheader4": "CR No.", "subheader5": "RR No.", "subheader6": "Tool No", "subheader7": "Tool No" }, { "subheader1": "Tool Desc.", "subheader2": "Tool Desc.", "subheader3": "Tool Desc.", "subheader4": "Asset No.", "subheader5": "Tool Desc.", "subheader6": "Tool Desc.", "subheader7": "Tool Desc." }, { "subheader1": "Qty", "subheader2": "Qty", "subheader3": "Qty", "subheader4": "Tool No.", "subheader5": "Tool No.", "subheader6": "Qty", "subheader7": "Qty" }, { "subheader4": "Tool Desc.", "subheader5": "Asset No." }];
  alertResult = [];
  alertType = 0;
  alertName = "";
  error_msg = "";
  headerCount = "";
  subHeaderCount = "";

  constructor(private loadingCtrl: LoadingController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.alertType = navParams.get('alert');
    var role = navParams.get('role');
    this.alertName = navParams.get('headerMessage');
    console.log("***alertName*****");
    console.log("alertType:" + this.alertType);
    console.log(this.alertName);
    if (this.alertType == 1) {
      this.headerCount = "col-2";
      this.subHeaderCount = "col-4";
    }
    console.log("***************");

    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      var jsonData = JSON.stringify({ sso_id: sso_id, alert_type: this.alertType, segment: 0 });
      this.messageService.getPendingLogisticsAlertRequest(jsonData, this.alertType).subscribe(data => {
        console.log(data);
        this.alertResult = data;
        loading.dismiss();
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      var jsonData = JSON.stringify({ sso_id: this.ssoId, alert_type: this.alertType, segment: this.alertResult.length });
      this.messageService.getPendingLogisticsAlertRequest(jsonData, this.alertType).subscribe(dataList => {
        if (dataList.length == 0) {
          this.error_msg = 'No more items to display';
        } else {
          this.error_msg = '';
          dataList.forEach(data => {
            this.alertResult.push(data);
          });
        }
      });
      infiniteScroll.complete();
    }, 500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogisticsAlertPage');
  }
}
