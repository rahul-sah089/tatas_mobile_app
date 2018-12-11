import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { StockOrderDetailsPage } from '../stock-order-details/stock-order-details';
import { WtwStockTransferPage } from '../wtw-stock-transfer/wtw-stock-transfer';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-stock-transfer',
  templateUrl: 'stock-transfer.html',
})
export class StockTransferPage {

  globals: Globals;
  stockTransferList = [];
  ssoId = '';
  refreshResponse: any = {};
  

  constructor(public loadingCtrl:LoadingController,public alertCtrl:AlertController,private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.messageService.stockTransferList(sso_id).subscribe(data => {
        console.log("stocktransfer");
        this.stockTransferList = data.orderResults;
        console.log(this.stockTransferList);
        if(this.stockTransferList.length == 0){
          console.log("stock transfer is empty");
          //this.anyItem = false;
          
        }
        console.log("stocktransfer");
        loading.dismiss();
      });
    })
  }

  orderDetails(stockTransfer) {
    this.navCtrl.push(StockOrderDetailsPage, { tool_order_id: stockTransfer.tool_order_id });
  }

  refreshOrder(stocktransfer) {
    this.refreshResponse = this.messageService.refreshForStockTransferOrder(this.ssoId, stocktransfer.tool_order_id)
    .subscribe(data => {
      console.log(data);
      this.presentAlert("Tool Availabilty",data.transaction_des);
     });
  }

  whDetails(stockTransfer) {
    console.log("for wh");
    this.navCtrl.push(WtwStockTransferPage, { tool_order_id: stockTransfer.tool_order_id });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockTransferPage');
  }

  presentAlert(titleInfo:string,subTitleInfo:string){
    const alert = this.alertCtrl.create({
      title: titleInfo,
      subTitle: subTitleInfo,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
    this.navCtrl.push(StockTransferPage,{});
  }

}
