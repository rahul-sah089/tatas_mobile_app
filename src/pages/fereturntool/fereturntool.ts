import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { FetoolreturntoolPage } from '../../pages/fetoolreturntool/fetoolreturntool';
import { ExtendDatePage } from '../../pages/extend-date/extend-date';
import { MessageServiceProvider } from '../../providers/message-service/message-service';


@IonicPage()
@Component({
  selector: 'page-fereturntool',
  templateUrl: 'fereturntool.html',
})
export class FereturntoolPage {

  globals: Globals;
  returnTools = [];
  shownGroup = null;
  ssoId = '';
  showMessage:boolean = false;

  constructor(public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    var alertType = navParams.get("alertType");
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.messageService.getReturnTools(sso_id,alertType).subscribe(data => {
        this.returnTools = data;
        console.log("return tool informations");
        console.log(this.returnTools);
        if(this.returnTools.length == 0){
          this.showMessage = true;
        }
        console.log("return tool informations");
      });
      loading.dismiss();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FereturntoolPage');
  }

  navigateTo(tool){
    this.navCtrl.push(FetoolreturntoolPage, {tool: tool});
  }

  extendDate(tool) {
    console.log("extend date");
    console.log(tool);
    console.log("extend date");
    this.navCtrl.push(ExtendDatePage, {toolInfo: tool});
  }

}
