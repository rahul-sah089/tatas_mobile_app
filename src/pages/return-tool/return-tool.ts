import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-return-tool',
  templateUrl: 'return-tool.html',
})
export class ReturnToolPage {

  globals: Globals;
  ssoId = '';
  systemId = '';
  warehouseId: string = '';
  addressChange = '';
  selected = [];
  address1 = '';
  address2 = '';
  city = '';
  state = '';
  pincode = '';
  error_msg = '';
  pickupPoint: any;
  orderNum: any;
  returnType: any;
  returnRTMasterResponse: any;
  warehousesInfo: any;
  orderIdStatus: string = '';
  orderIdStatusColor: string = '';
  siteId: string = '';

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public messageService: MessageServiceProvider) {
    this.globals = Globals.getInstance();
    this.selected = navParams.get('selected');
    this.returnRTMasterResponse = navParams.get('returnToolResponse');
    this.warehousesInfo = this.returnRTMasterResponse.all_wh_data;
    console.log("return tools main page");
    console.log("this selected values");
    console.log(this.selected);
    console.log("this selected values");
    console.log("maruti response");
    console.log(this.returnRTMasterResponse);
    console.log("maruti response");
    console.log(this.warehousesInfo);
    console.log("return tools main page");
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
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

  onReturnTools() {
    if (this.pickupPoint === undefined || this.pickupPoint == '') {
      this.error_msg = 'Invalid Pickup Point';
    } else {
      console.log(this.selected);
      console.log(this.address1);
      this.convertLogic();

    }
  }

  convertLogic() {
    var order_status_id = this.returnRTMasterResponse.order_status_id;
    var tool_order_id = this.returnRTMasterResponse.tool_order_id;
    var owned_assets_count = this.returnRTMasterResponse.owned_asset_count;
    var values = '{"order_status_id":"' + this.returnRTMasterResponse.order_status_id
      + '","tool_order_id":"' + tool_order_id
      + '","owned_assets_count":"' + owned_assets_count
      + '","checkAll":"' + "on"
      + '","oah_id":{},"assetAndOrderedAsset":{},"oah_condition_id":{},"oah_oa_health_id_part_id":{},"oa_health_id":{},"remarks":{},'
      + '"delivery_type_id":"' + this.pickupPoint + '","zonal_wh_id":"",'
      + '"system_id":"' + this.systemId + '","site_id":"' + this.siteId + '",'
      + '"check_address":"0","address_remarks":"",'
      + '"from_wh_id":"' + this.returnRTMasterResponse.wh_data[0].wh_id + '","address_1":"' + this.address1 + '",'
      + '"address_2":"' + this.address2 + '","address_3":"' + this.city + '",'
      + '"address_4":"' + this.state + '","pin_code":"' + this.pincode + '",'
      + '"return_type_id":"' + this.returnType + '","to_wh_id":"' + this.warehouseId + '",'
      + '"sso_id":"' + this.ssoId + '","order_number":"' + this.orderNum + '",'
      + '"submit_pickup":"1"'
      + '}';
    var jsObj = JSON.parse(values);
    console.log(jsObj);

    this.selected.forEach(element => {
      var healthObj = "";
      var mainData = element.main_data;
      var oahId = mainData.oah_id;
      var orderStatusId = mainData.ordered_asset_id;
      var assetId = mainData.asset_id;
      var orderedAssetId = mainData.ordered_asset_id;
      var returnStatus = mainData.return_status;
      jsObj.oah_id[oahId] = orderStatusId;
      jsObj.assetAndOrderedAsset[orderedAssetId] = orderedAssetId;
      jsObj.oah_condition_id[orderedAssetId] = returnStatus;
      jsObj.oah_oa_health_id_part_id[oahId] = {};
      jsObj.oa_health_id[oahId] = {};
      jsObj.remarks[oahId] = {};
      var healthData = element.health_data;
      healthData.forEach(healthElement => {
        var oaHealthId = healthElement.oa_health_id;
        var partIdVal = healthElement.part_id;
        var remarkwa = healthElement.remark;
        var healthStatus = healthElement.health;
        jsObj.oah_oa_health_id_part_id[oahId][oaHealthId] = [];
        jsObj.oa_health_id[oahId][oaHealthId] = {};
        jsObj.remarks[oahId][oaHealthId] = {};
        jsObj.oa_health_id[oahId][oaHealthId][partIdVal] = healthStatus;
        jsObj.remarks[oahId][oaHealthId][partIdVal] = remarkwa;
        jsObj.oah_oa_health_id_part_id[oahId][oaHealthId].push(partIdVal);
      });
    });

    this.selected.forEach(element => {
      var mainData = element.main_data;
      var oahId = mainData.oah_id;
      jsObj.oah_condition_id
    });

    console.log(jsObj);

    this.messageService.returnToolRequest(jsObj).subscribe(data => {
      this.presentAlert("Return Tool", data.transaction_des);
      this.navCtrl.pop();
      this.navCtrl.pop();
    });

  }

  clearForm() {
    this.error_msg = '';
    this.warehouseId = '';
    this.address1 = '';
    this.address2 = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.siteId = '';
  }

  pickPointChange(pickPointChange) {
    this.clearForm();
    if (pickPointChange == 2) {
      var wh_data = this.returnRTMasterResponse.wh_data[0];
      console.log(wh_data);
      this.warehouseId = wh_data.wh_code + "-" + wh_data.name;
      this.address1 = wh_data.address1;
      this.address2 = wh_data.address2;
      this.city = wh_data.address3;
      this.state = wh_data.address4;
      this.pincode = wh_data.pin_code;
    }
  }

  getCustDet() {
    this.clearForm();
    this.messageService.getCustomerAvailability(this.systemId).subscribe(status => {
      if (status == 1) {
        this.messageService.getCustomerAddress(this.systemId).subscribe(system => {
          console.log("customer dis values");
          this.address1 = system.address1;
          this.address2 = system.address2;
          this.city = system.address3;
          this.state = system.address4;
          this.pincode = system.zip_code;
          this.siteId = system.site_id;

          console.log(system);
        });
      } else {
        this.error_msg = "Invalid system id";
      }
    });
  }

  getWareHouseDet() {
    var wh_data = this.returnRTMasterResponse.wh_data;
    console.log(wh_data);

  }

  checkOrderNum() {
    console.log(this.orderNum);
    console.log(this.orderNum);
    this.messageService.getOrderIdAvailability(this.orderNum).subscribe(data => {
      if (data == 1) {
        this.orderIdStatus = 'Success';
        this.orderIdStatusColor = 'green';
      } else {
        this.orderIdStatus = 'Failed';
        this.orderIdStatusColor = 'red';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnToolPage');
  }

}
