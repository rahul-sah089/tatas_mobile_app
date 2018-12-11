import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';


@IonicPage()
@Component({
  selector: 'page-stock-order-details',
  templateUrl: 'stock-order-details.html',
})
export class StockOrderDetailsPage {

  shownGroup = null;
  stockOrderDet = [];
  globals: Globals;
  ssoId = '';
  selectedWarehouseId = {};
  sumbitButtonShown = true;




  constructor(public alertCtrl: AlertController,private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    this.globals = Globals.getInstance();
    var toolOrderId = navParams.get('tool_order_id');
    console.log("tool Order Id");
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.messageService.stockOrderDetForOrders(sso_id, toolOrderId).subscribe(data => {
        this.stockOrderDet = data;
        console.log(this.stockOrderDet);
        this.submitButtonCheck();
      });
    });
  }

  submitButtonCheck(){
    var data = this.stockOrderDet;
    data.forEach(element => {
      var warehouses = element.wh_data;
      console.log("******warehouses****");
      console.log(warehouses.length);
      if(warehouses.length == 0){
        this.sumbitButtonShown = false;
      }
      console.log("submit button status "+this.sumbitButtonShown);
      console.log("******warehouses****");
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

  getToolTotalOrdered(warehouses) {
    console.log(warehouses);
    var wareOrderedCount: number = 0;
    for (let warehouse of warehouses) {
      wareOrderedCount += warehouse.qty;
    }
    return wareOrderedCount;
  }

  updtQty(tool, warehouse, inc) {
    console.log("*************");
    console.log(tool);
    console.log(warehouse);

    if (warehouse.qty === undefined)
      warehouse.qty = 1;



    var wareOrderedCount = this.getToolTotalOrdered(tool.wh_data);
    console.log(wareOrderedCount);
    console.log("***************");
    if (inc) {
      console.log(warehouse.qty + ">" + warehouse.wh_qty);
      console.log((tool.quantity - tool.available_quantity) + "<=" + warehouse.wh_qty);
      if (warehouse.wh_qty > warehouse.qty && wareOrderedCount < (tool.quantity - tool.available_quantity)) {
        warehouse.order_qty += 1;
      }
    } else {
      if (warehouse.order_qty > 0) {
        // order.req_qty -= 1;
        warehouse.order_qty -= 1;
      }
    }
  }

  onClick() {
    console.log(this.stockOrderDet);
    console.log(this.ssoId);
    var jsObj = this.convertLogic(this.stockOrderDet, this.ssoId);
    this.messageService.stockTransfersForOrdersPost(jsObj).subscribe(data => {
      console.log("****data*******");
      console.log(data);
      this.presentAlert("Stock transfer", "Initialized Succesfully");
      console.log("***********");
    });
  }

  convertLogic(data, ssoid) {
    console.log("******convert logic**************");
    console.log(data);
    var toolOrderId = data[0].tool_order_id;
    console.log(toolOrderId);
    var values = '{"sso_id":"' + ssoid + '","tool_order_id":"' + toolOrderId + '","od_req_qty":{},"post_od_tool":{},"post_qty":{},"submit_fe":"1"}';
    var jsObj = JSON.parse(values);
    console.log(jsObj);
    //var warehouseIds = [];

    data.forEach(element => {
      var orderToolID = element.ordered_tool_id;
      var quantity = element.quantity;
      var toolId = element.tool_id;
      jsObj.od_req_qty = jsObj.od_req_qty || {};
      jsObj.od_req_qty[orderToolID] = quantity;
      jsObj.post_od_tool = jsObj.post_od_tool || {};
      jsObj.post_od_tool[orderToolID] = toolId;
      var warehouses = element.wh_data;
      console.log("******warehouses****");
      console.log(warehouses);
      console.log("******warehouses****");
      warehouses.forEach(warehouse => {
        jsObj.post_qty = jsObj.post_qty || {};
        jsObj.post_qty[warehouse.wh_id] = {};
      });
    });

    data.forEach(element => {
      var orderToolID = element.ordered_tool_id;
      var warehouses = element.wh_data;
      warehouses.forEach(warehouse => {
        jsObj.post_qty[warehouse.wh_id][orderToolID] = warehouse.wh_qty;
      });
    });
    console.log(jsObj);
    console.log("*********convert logic***********");
    return jsObj;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockOrderDetailsPage');
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
