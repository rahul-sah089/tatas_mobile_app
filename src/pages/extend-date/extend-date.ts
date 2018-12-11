import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-extend-date',
  templateUrl: 'extend-date.html',
})
export class ExtendDatePage {

  globals: Globals;
  tool = {};
  order_no = {};
  tool_order_id = {};



  returnDate: any;
  extendedDate: any;

  returnDateForRequest: any;
  extendDateRequest: any;

  remarks: string;
  ssoId = '';
  error_msg: string;


  constructor(public alertCtrl:AlertController,private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    this.globals = Globals.getInstance();
    console.log("tool informations");
    var order_no = navParams.get('toolInfo');

    //console.log(order_no.order_info.order_number);
    console.log("tool informations");

    this.order_no = order_no.order_info.order_number;
    this.tool_order_id = order_no.order_info.tool_order_id;

    console.log(order_no.order_info.return_date);

    this.returnDateForRequest = order_no.order_info.return_date;


    this.returnDate = new Date(order_no.order_info.return_date).toISOString();

    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
    });
  }

  formatDate(date: Date) {
    var monthStr = '' + date.getMonth() + 1;
    var dayStr = '' + date.getDate();
    var yearStr = '' + date.getFullYear();
    if (monthStr.length < 2) monthStr = '0' + monthStr;
    if (dayStr.length < 2) dayStr = '0' + dayStr;
    return [yearStr, monthStr, dayStr].join('-');
  }

  extendDate() {

    //this.extendDateRequest = this.formatDate(this.extendDate);
    if (this.extendedDate === undefined || this.extendedDate == '') {
      this.error_msg = 'Invalid Extended Date';
    } else {
      var jsonData = JSON.stringify({ sso_id: this.ssoId, tool_order_id: this.tool_order_id, order_number: this.order_no, request_date: this.returnDateForRequest, new_return_date: this.extendedDate, remarks: this.remarks, ac_submit: '1' });
      console.log(jsonData);


      this.messageService.extendDate(jsonData).subscribe(data => {
        console.log("*****extend date response data********");
        console.log(data);
        this.presentAlert("Extend Date",data.transaction_des);
        console.log("*****extend date request data********");
      });
    }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtendDatePage');
  }
}
