import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Globals } from '../../app/Globals';
import { MessageServiceProvider } from '../../providers/message-service/message-service';



@IonicPage()
@Component({
  selector: 'page-femyorders',
  templateUrl: 'femyorders.html',
})
export class FemyordersPage {
  shownGroup = null;
  globals: Globals;
  orders = [];
  pageType:string;
  constructor(public loadingCtrl:LoadingController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.messageService.feMyOrderList(sso_id).subscribe(data => {
        console.log(" data fro my orders");
        console.log(data);
        console.log(" data fro my orders");
         this.orders = data;
         loading.dismiss();
      });
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FemyordersPage');
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

  presentAlert(titleInfo:string,subTitleInfo:string){
    const alert = this.alertCtrl.create({
      title: titleInfo,
      subTitle: subTitleInfo,
      buttons: ['OK']
    });
    alert.present();
  }

}
