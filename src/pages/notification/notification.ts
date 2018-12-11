import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { Alert } from '../model/alert.model';
import { AcknowledgementPage } from '../../pages/acknowledgement/acknowledgement';
import { FereturntoolPage } from '../../pages/fereturntool/fereturntool';
import { LogisticsAlertPage } from '../../pages/logistics-alert/logistics-alert';
import { StockTransferPage } from '../../pages/stock-transfer/stock-transfer';
import { FeToFeTransferPage } from '../../pages/fe-to-fe-transfer/fe-to-fe-transfer';
import { AddressChangePage } from '../../pages/address-change/address-change';
import { ExtendedDateApprovalPage } from '../../pages/extended-date-approval/extended-date-approval';
import { DueReturnPage } from '../../pages/due-return/due-return';
import { DueInDeliveriesPage } from '../../pages/due-in-deliveries/due-in-deliveries';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  globals: Globals;
  alertList: Alert[] = [];
  userid = "";
  role: string;
  roleType: String;
  menu_items = [];

  constructor(private loadingCtrl: LoadingController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public messageService: MessageServiceProvider) {
    this.globals = Globals.getInstance();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.messageService.notifDetails(sso_id).subscribe(data => {
        this.alertList = data.alerts_list;
        console.log(this.alertList);
        loading.dismiss();
      });
    })
  }

  clickedEvent(val) {
    console.log("clickedEvent hit");
    console.log(val);

    this.storage.get(this.globals.role_id).then((roleid) => {
      this.role = roleid;
      this.roleType = this.globals.getRoleByRoleId(this.role);
      console.log("Role Type ==> " + this.roleType);
      switch (val.alert_type) {
        case 1:
          if (this.roleType == "fe") {
            this.navCtrl.push(AcknowledgementPage, { alertType: 1 });
          } else if (this.roleType == "admin") {
            //should redirect to stock transfer page
            this.navCtrl.push(StockTransferPage, {});
          } else if (this.roleType == "log") {
            console.log("*****alert name*****");
            console.log(val.alert_name);
            console.log("**********");
            this.navCtrl.push(LogisticsAlertPage, { alert: val.alert_type, headerMessage: val.alert_name });
          }
          break;
        case 2:
          if (this.roleType == "fe") {
            this.navCtrl.push(AcknowledgementPage, { alertType: 2 });
          } else if (this.roleType == "admin") {
            //redirect to fe to fe request page
            this.navCtrl.push(FeToFeTransferPage);
          } else if (this.roleType == "log") {
            this.navCtrl.push(LogisticsAlertPage, { alert: val.alert_type, headerMessage: val.alert_name });
          }
          break;
        case 3:
          if (this.roleType == "fe") {
            this.navCtrl.push(FereturntoolPage, { alertType: 3 });
          } else if (this.roleType == "admin") {
            //navigate to extend date approval page
            this.navCtrl.push(ExtendedDateApprovalPage);
          } else if (this.roleType == "log") {
            this.navCtrl.push(LogisticsAlertPage, { alert: val.alert_type, headerMessage: val.alert_name });
          }
          break;
        case 4:
          if (this.roleType == "fe") {
            this.navCtrl.push(FereturntoolPage, { alertType: 4 });
          } else if (this.roleType == "admin") {
            //navigate to address change page
            this.navCtrl.push(AddressChangePage);
          } else if (this.roleType == "log") {
            this.navCtrl.push(LogisticsAlertPage, { alert: val.alert_type, headerMessage: val.alert_name });
          }
          break;
        case 5:
          if (this.roleType == "fe") {
            this.navCtrl.push(FereturntoolPage, { alertType: 5 });
          } else if (this.roleType == "admin") {
            //navigate to due in return tool
            this.navCtrl.push(DueReturnPage);
            //this.navCtrl.push(AdminAlertsPage, { alert: val.alert_type });
          } else if (this.roleType == "log") {
            this.navCtrl.push(LogisticsAlertPage, { alert: val.alert_type, headerMessage: val.alert_name });
          }
          break;
        case 6:
          if (this.roleType == "fe") {

          } else if (this.roleType == "admin") {
            //navigate to due in deliveries page
            this.navCtrl.push(DueInDeliveriesPage);
          } else if (this.roleType == "log") {
            this.navCtrl.push(LogisticsAlertPage, { alert: val.alert_type, headerMessage: val.alert_name });
          }
          break;
        case 7:
          if (this.roleType == "fe") {

          } else if (this.roleType == "admin") {
            console.log("role type is admin");
          } else if (this.roleType == "log") {
            this.navCtrl.push(LogisticsAlertPage, { alert: val.alert_type, headerMessage: val.alert_name });
          }
          break;
      }


    });
  }
}

