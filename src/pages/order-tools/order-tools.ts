import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-order-tools',
  templateUrl: 'order-tools.html',
})
export class OrderToolsPage {

  globals: Globals;
  servicetypelist = [];
  customerlist = [];
  warehouseDet: any = {};
  items = [];
  itemIdWithQty = {};
  ssoId: any;
  addressChange: any;
  curDate: String;
  address1: String;
  address2: String;
  city: String;
  state: String;
  pincode: String;
  serviceType: any;
  neededDate: any;
  requestedDate: any;
  returnedDate: any;
  systemId: any;
  deliveryPoint: any;
  deliveryPointId: any;
  sebealSrNum: any;
  readiness: string;
  siteId: any;
  site_remarks: string;
  error_msg: String;
  success_msg: String;
  orderId: string;
  orderType: string;
  other_remarks: string;
  orderIdStatus: string = '';
  orderIdStatusColor: string = '';

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.items = navParams.get('items');
    this.requestedDate = new Date().toISOString();
    this.items.forEach(s1 => {
      this.itemIdWithQty[s1.tool_id] = s1.tool_quant;
    });

    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      var jsonData = JSON.stringify({ sso_id: sso_id, toolIdsWithQty: this.itemIdWithQty });

      this.messageService.confirmTools(jsonData).subscribe(data => {
        this.servicetypelist = data.service_type;
        this.warehouseDet = data.wh_data[0];
        console.log(this.warehouseDet);
        loading.dismiss();
      });
    });
  }

  checkOrderId() {
    console.log(this.orderId);
    this.messageService.getOrderIdAvailability(this.orderId).subscribe(data => {
      if (data == 1) {
        this.orderIdStatus = 'Success';
        this.orderIdStatusColor = 'green';
      } else {
        this.orderIdStatus = 'Failed';
        this.orderIdStatusColor = 'red';
      }
    });
  }

  reorderType() {
    this.orderId = '';
  }

  resetAddress() {
    this.address1 = "";
    this.address2 = "";
    this.city = "";
    this.state = "";
    this.pincode = "";
    //this.addressChange = 0;
    this.deliveryPointId = '';

    if (this.deliveryPoint == '1') {
      //this.getCustDet();
    } else if (this.deliveryPoint == '2') {
      this.getWhDet();
    } else {
      this.addressChange = 1;
    }
  }

  getCustDet() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.messageService.getCustomerAvailability(this.systemId).subscribe(status => {
      console.log("status =>" + status);
      if (status == 1) {
        this.messageService.getCustomerAddress(this.systemId).subscribe(system => {
          console.log(system);
          this.address1 = system.address1;
          this.address2 = system.address2;
          this.city = system.address3;
          this.state = system.address4;
          this.pincode = system.zip_code;
          this.siteId = system.site_id;
          this.addressChange = 0;
          this.error_msg = "";
          loading.dismiss();
        });
      } else {
        this.error_msg = "Invalid system id";
        loading.dismiss();
      }
    });
  }

  getWhDet() {
    this.address1 = this.warehouseDet.address1;
    this.address2 = this.warehouseDet.address2;
    this.city = this.warehouseDet.address3;
    this.state = this.warehouseDet.address4;
    this.pincode = this.warehouseDet.pin_code;
    this.addressChange = 0;
  }

  openChangeAddress() { //1-Yes 0-No
    this.addressChange = 1;
  }

  refreshChangeAddress() { //1-Yes 0-No
    this.addressChange = 0;
  }




  onOrderTools() {
    this.sebealSrNum = this.sebealSrNum.replace("-", "");
    var fe_to_wh_id = '';
    var system_id = '';
    if (this.deliveryPoint == '1') {
      system_id = this.systemId;
    } else if (this.deliveryPoint == '2') {
      //fe_to_wh_id = this.warehouseDet.wh_id;
    }

    if (this.readiness === undefined)
      this.readiness = '1';
    if (this.site_remarks === undefined)
      this.site_remarks = '';
    if (this.siteId === undefined)
      this.siteId = '';

    if (this.orderType === undefined || (this.orderType == '1' && (this.orderId == '' || this.orderId === undefined))) {
      this.error_msg = 'Invalid FE1 Order Number';
    } else if (this.serviceType == '' || this.serviceType === undefined) {
      this.error_msg = 'Invalid Service Type';
    } else if (this.neededDate === undefined || this.neededDate == '') {
      this.error_msg = 'Invalid Needed Date';
    } else if (this.returnedDate === undefined || this.returnedDate == '') {
      this.error_msg = 'Invalid Returned Date';
    } else if (this.deliveryPoint === undefined || this.deliveryPoint == '') {
      this.error_msg = 'Invalid delivery Point';
    } else if (this.sebealSrNum === undefined) {
      this.error_msg = 'Invalid Sebeal SrNum';
    } else if (isNaN(this.sebealSrNum)) {
      this.error_msg = 'Sebeal SrNum should be a Number';
    } else if (this.deliveryPoint == '1' && this.systemId == '') {
      this.error_msg = 'Invalid System Id';
    } else {
      var jsonData = JSON.stringify({
        sso_id: this.ssoId,
        fe1_order_number: this.orderId,
        toolIdsWithQty: this.itemIdWithQty,
        fe_check: this.orderType,
        service_type_id: this.serviceType,
        service_type_remarks: this.other_remarks,
        site_readiness: this.readiness,
        site_remarks: this.site_remarks,
        srn_number: this.sebealSrNum,
        deploy_date: this.requestedDate,
        request_date: this.neededDate,
        return_date: this.returnedDate,
        delivery_type_id: this.deliveryPoint,
        site_id: this.siteId,
        system_id: system_id,
        check_address: this.addressChange,
        address_remarks: '',
        fe_to_wh_id: fe_to_wh_id,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        state: this.state,
        pin_code: this.pincode
      });

      this.messageService.orderTools(jsonData).subscribe(data => {
        if (data.transaction_status == 1) {
          //this.err_msg = "";
          //this.success_msg = data.transaction_des;
          const alert = this.alertCtrl.create({
            title: 'Order Tools',
            subTitle: data.transaction_des,
            buttons: ['OK']
          });
          alert.present();
          // this.navCtrl.pop();
          this.navCtrl.setRoot(MenuPage);
        } else {
          this.error_msg = data.transaction_des;
          this.success_msg = "";
        }
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderToolsPage');
  }

}
