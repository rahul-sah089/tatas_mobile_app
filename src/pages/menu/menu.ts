import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Globals } from '../../app/Globals';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { ShippingPage } from "../shipping/shipping";
import { FeordersPage } from "../feorders/feorders";
import { FemyordersPage } from "../femyorders/femyorders";
import { AdminApprovalPage } from "../admin-approval/admin-approval";
import { AcknowledgementPage } from "../acknowledgement/acknowledgement";
import { NotificationPage } from '../notification/notification';
import { FereturntoolPage } from "../fereturntool/fereturntool";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  globals: Globals;
  role: string;
  menu_items: string[];
  imagePath: string;
  userInfo = [];
  userSSOId: any = '';
  userName: any = '';
  showUserDetails: boolean = true;

  constructor(private loadingCtrl: LoadingController, private storage: Storage, public navParams: NavParams, public navCtrl: NavController, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.globals = Globals.getInstance();
    this.userInfo = this.navParams.get("userInfo");
    console.log("Inside menu bar");
    console.log(this.userInfo);
    if (this.userInfo == null) {
      console.log("user info is null");
      this.showUserDetails = false;
    } else {
      console.log("user info is not null");
    }
    this.storage.get(this.globals.role_id).then((roleid) => {
      this.role = roleid;
      this.imagePath = this.globals.getImagePath(this.role);
      this.menu_items = this.globals.getMenuItems(this.role);
      console.log(this.menu_items);
    })
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.messageService.notifCount(sso_id);
    })
  }

  itemClick(item) {
    console.log(item.id);
    if (item.id == 1) {
      this.navCtrl.push(FeordersPage);
    } else if (item.id == 2) {
      this.navCtrl.push(AcknowledgementPage, { alertType: 0 });
    } else if (item.id == 3) {
      this.navCtrl.push(FereturntoolPage, { alertType: 3 });
    }
    else if (item.id == 4) {
      this.navCtrl.push(FemyordersPage);
    } else if (item.id == 5) {
      // this.navCtrl.push(ShippingPage,{item:item});
      this.navCtrl.push(NotificationPage);
    } else if (item.id == 7) {
      this.navCtrl.push(AdminApprovalPage);
    }
  }
}
