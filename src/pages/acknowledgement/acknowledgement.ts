import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { QrScanPage } from '../../pages/qr-scan/qr-scan';
import { AckRequestFinalPage } from '../../pages/ack-request-final/ack-request-final';

@IonicPage()
@Component({
  selector: 'page-acknowledgement',
  templateUrl: 'acknowledgement.html',
})
export class AcknowledgementPage {

  shownGroup = null;

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

  orders = [];
  globals: Globals;
  role: string;
  menu_items: string[];
  ssoId: string;
  showMessage: boolean = false;

  constructor(public loadingCtrl:LoadingController,public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    var alertType = navParams.get('alertType');
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.messageService.getAcknowledgmentRequest(sso_id, alertType).subscribe(data => {
        console.log("*****acknoledge request data********");
        this.orders = data;
        console.log(this.orders);

        console.log(this.orders.length);
        if (this.orders.length == 0) {
          this.showMessage = true;
        }
        console.log(this.showMessage);
        console.log("*****acknoledge request data********");
        loading.dismiss();
      });
    });
  }

  scanAsset(order) {
    this.navCtrl.push(QrScanPage, { orders: order });
  }

  ionViewDidLoad() {

  }

  presentAwkAlert(order) {
    var orderInfo = order.order_info;
    var rtoId = orderInfo.rto_id;
    var ssoId = this.ssoId;
    var toolOrderId = orderInfo.tool_order_id;
    var alertType = 1;
    if (rtoId != null) {
      alertType = 2;
      this.messageService.acknowledgeRequestAddressForFEAlert(alertType, rtoId, ssoId).subscribe(data => {
        console.log("*****acknoledge request data********");
        console.log(data);
        var from = data.from;
        var expectedDate = (data.expected_delivery_date == "")?"NA":data.expected_delivery_date;
        var awb = (data.awb_or_docket_number == "")?"NA":data.awb_or_docket_number;
        var subText = "<strong>From</strong>: "+from+"<br/><strong>Expected Date</strong>:"+expectedDate+"<br/><strong>AWB/Docket No.</strong>:"+awb+"<br/>";
        this.presentAlertAwkPage("Address Information",subText);
        console.log("*****acknoledge request data********");
      });
    } else {
      this.messageService.acknowledgeRequestAddressForWHAlert(ssoId,alertType, toolOrderId).subscribe(data => {
        console.log("*****acknoledge request data********");
        console.log(data);
        var from = data.from;
        console.log(data.expected_delivery_date);
        var expectedDate = (data.expected_delivery_date == "")?"NA":data.expected_delivery_date;
        var awb = (data.awb_or_docket_number == "")?"NA":data.awb_or_docket_number;
        var subText = "<strong>From</strong>: "+from+"<br/><strong>Expected Date</strong>:"+expectedDate+"<br/><strong>AWB/Docket No.</strong>:"+awb+"<br/>";
        this.presentAlertAwkPage("Address Information",subText);
        console.log("*****acknoledge request data********");
      });
    }
  }

  presentAlertForm(tiTLE, subTiTLE) {
    const alert = this.alertCtrl.create({
      title: tiTLE,
      subTitle: subTiTLE,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert(tiTLE, subTiTLE) {
    const alert = this.alertCtrl.create({
      title: tiTLE,
      subTitle: subTiTLE,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

  initiate(order) {
    console.log("initate tool called");
    console.log(order);
    var toolOrderId = order.order_info.tool_order_id;
    var rtoId = order.order_info.rto_id;
    console.log("*********rto id********");
    console.log(rtoId);
    console.log("*********rto id********");
    console.log("*********toolOrderId********");
    console.log(toolOrderId);
    console.log("*********toolOrderId********");
    this.navCtrl.push(AckRequestFinalPage, { toolOrderId: toolOrderId, rtoId: rtoId });
    console.log("initate tool called");
  }

  awkSubmit(order) {
    console.log("awk submit");
    console.log(order);
    var toolOrderId = order.fe1_tool_order_id;
    var orderNumber = order['order_info']['order_number'];
    var orderStatusId = order.assets[0]['order_status_id'];
    var rtoID = order.rto_id;
    var inValidForm: string = 'false';
    var val = "";
    if (rtoID == null) {
      //condition for WH
      val = '{"tool_order_id":"' + toolOrderId + '","order_number":"' + orderNumber + '","order_status_id":"' + orderStatusId + '","sso_id":"' + this.ssoId + '","oah_condition_id":{}}';
    } else {
      //condition for FE
      val = '{"fe1_tool_order_id":"' + toolOrderId + '","sso_id":"' + this.ssoId + '","order_status_id":"' + orderStatusId + '","rto_id":"' + rtoID + '","oah_condition_id":{}}';
    }

    var jsonObj = JSON.parse(val);
    console.log(jsonObj);

    order.assets.forEach(asset => {
      console.log(asset);
      var assetId = asset.ordered_asset_id;
      var status = asset.status;
      //alert(status);


      if (status == 1) {
        inValidForm = 'true';
      }

      if (status == "true") {
        status = "1";
      } else if (status == "false") {
        status = "2";
      }

      jsonObj.oah_condition_id[+assetId] = status;
    });


    console.log("***********");
    console.log(toolOrderId);
    console.log(orderNumber);
    console.log(orderStatusId);
    console.log("***********");

    console.log(jsonObj);
    console.log("****************");

    if (inValidForm == 'true') {
      this.presentAlertForm('Acknowledge request', 'Please acknowledge all the tools for order');
    } else {
      this.postRequest(rtoID, jsonObj);
    }

  }

  postRequest(rtoID, jsonObj) {

    this.messageService.getAckRequest(rtoID, jsonObj).subscribe(data => {
      console.log("*****acknoledge request data********");
      console.log(data);
      var statusId = data.transaction_status;
      var statusDesc = data.transaction_des;

      if (statusId == 1) {
        this.presentAlert("Acknowledge Request Request", statusDesc);
      } else if (statusId == 2) {
        this.presentAlert("Tool Acknowledge Failed", statusDesc);
      }
      console.log("*****acknoledge request data********");
    });


  }

  presentAlertAwkPage(tiTLE, subTiTLE) {
    console.log("present alert calld");
    const alert = this.alertCtrl.create({
      title: tiTLE,
      subTitle: subTiTLE,
      buttons: ['OK']
    });
    alert.present();
    //this.navCtrl.pop();
  }







}
