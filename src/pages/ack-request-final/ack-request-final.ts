import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { FetoolreturntoolPage } from '../../pages/fetoolreturntool/fetoolreturntool';
import { ExtendDatePage } from '../../pages/extend-date/extend-date';
import { MessageServiceProvider } from '../../providers/message-service/message-service';



@IonicPage()
@Component({
  selector: 'page-ack-request-final',
  templateUrl: 'ack-request-final.html',
})
export class AckRequestFinalPage {

  globals: Globals;
  tools: any = {};
  allSelect = "Select All";
  toolDetails = [];
  selected = [];
  ssoId = '';
  toolOrderId = '';
  initiateRTResponse: any;
  acknowledgeToolMasterResponse: any;
  shownGroup = null;
  detailText = null;
  rtoId = null;

  constructor(public loadingCtrl:LoadingController,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public messageService: MessageServiceProvider) {
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    this.globals = Globals.getInstance();
    this.toolOrderId = navParams.get('toolOrderId');
    this.rtoId = navParams.get('rtoId');
    console.log("fe tool return tool page");
    console.log(this.rtoId);
    console.log("fe tool return tool page");
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      //this.toolOrderId = this.tools.order_info.tool_order_id;
      console.log("*******tool order id*******");
      console.log(this.toolOrderId);
      console.log("*******tool order id*******");
      this.messageService.getAcknowlegeToolInitialize(this.ssoId, this.toolOrderId, this.rtoId).subscribe(data => {
        console.log("initialite return tool response");
        console.log(data);
        console.log("initialite return tool response");
        this.initiateRTResponse = data;
        this.toolDetails = this.initiateRTResponse.return_parts;
        console.log("tool details");
        console.log(this.toolDetails);
        this.toolDetails.forEach(tool => {
          tool.main_data.btn = "Select";
          tool.main_data.return_status = 1;
          tool['health_data'].forEach(healthData=>{
            healthData.health = 1;
          });
        });
        console.log(this.initiateRTResponse);
        console.log("initialite return tool response");
        loading.dismiss();
      });
    });


  }

  selectAll() {
    this.toolDetails.forEach(tool => {
      if (this.allSelect == "Select All") {
        tool.main_data.isAdded = true;
        this.selected.push(tool);
        tool.main_data.btn = "Unselect";
      } else {
        tool.main_data.isAdded = false;
        this.selected = this.selected.filter(obj => obj !== tool);
        tool.main_data.btn = "Select";
      }
    });
    if (this.allSelect == "Select All") {
      this.allSelect = "Unselect All";
    } else {
      this.allSelect = "Select All";
    }
  }

  public addElement(tool) {
    var main_data = tool.main_data;
    var contains = this.containsElement(main_data);
    if (contains) {
      main_data.isAdded = false;
      this.selected = this.selected.filter(obj => obj !== main_data);
      this.allSelect = "Select All";
      main_data.btn = "Select";
    } else {
      main_data.isAdded = true;
      this.selected.push(tool);
      main_data.btn = "Unselect";
      if (this.selected.length == this.toolDetails.length)
        this.allSelect = "Unselect All";
    }
  }

  public containsElement(mainData) {
    console.log("Selected Items ");
    console.log(this.selected);
    console.log("Selected Items ");
    console.log("Passed tool");
    console.log(mainData);
    console.log("Passed tool");
    var contains: boolean = false;
    this.selected.forEach(s1 => {
      if (s1.main_data.part_number == mainData.part_number) {
        contains = true;
      }
    });
    return contains;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad FetoolreturntoolPage');
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      //this.detailText = "Show Tool Detail";
      this.shownGroup = null;
      //alert(this.detailText);
    } else {
      //this.detailText = "Hide Tool Details";
      this.shownGroup = group;
      //alert(this.detailText);
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  continueReturn() {
    console.log("selected values");
    console.log(this.selected);
    console.log("selected values");
    console.log("return response");
    console.log(this.initiateRTResponse);
    this.acknowledgeToolMasterResponse = this.initiateRTResponse;
    console.log("return response");
    this.convertLogic();
  }



  convertLogic() {
    let loading = this.loadingCtrl.create({
      content:'Please wait...'
    });
    loading.present();
    console.log("acknowledgeToolMasterResponse");
    console.log(this.acknowledgeToolMasterResponse);
    console.log("acknowledgeToolMasterResponse");
    console.log(this.rtoId);
    var tool_order_id = this.toolOrderId;
    var order_number = this.acknowledgeToolMasterResponse.order_number;
    var order_status_id = this.acknowledgeToolMasterResponse.order_status_id;
    var values = "";
    if (this.rtoId == null) {
      values = '{"order_status_id":"' + this.acknowledgeToolMasterResponse.order_status_id
      + '","tool_order_id":"' + tool_order_id
      + '","order_number":"' + order_number
      + '","approve":"' + "1"
      + '","oah_id":{},"assetAndOrderedAsset":{},"oah_condition_id":{},"oah_oa_health_id_part_id":{},"oa_health_id":{},"remarks":{},'
      + '"sso_id":"' + this.ssoId + '"'
      + '}';
    }else if(this.rtoId != null){
      values = '{"order_status_id":"' + this.acknowledgeToolMasterResponse.order_status_id
      + '","rto_id":"' + this.rtoId
      + '","approve":"' + "1"
      + '","oah_id":{},"assetAndOrderedAsset":{},"orderedAssetAndAsset":{},"oah_condition_id":{},"oah_oa_health_id_part_id":{},"oa_health_id":{},"remarks":{},'
      + '"sso_id":"' + this.ssoId + '"'
      + '}';
    }
   
    console.log(values);
    var jsObj = JSON.parse(values);
    console.log(jsObj);

    if(this.rtoId == null){
      this.selected.forEach(element => {
        var healthObj = "";
        var mainData = element.main_data;
        var oahId = mainData.oah_id;
        //var orderStatusId = mainData.ordered_asset_id;
        var assetId = mainData.asset_id;
        var orderedAssetId = mainData.ordered_asset_id;
        var returnStatus = mainData.return_status;
        jsObj.oah_id[oahId] = orderedAssetId;
        jsObj.assetAndOrderedAsset[assetId] = orderedAssetId;
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
          jsObj.oa_health_id[oahId][oaHealthId][partIdVal] = {};
          jsObj.oa_health_id[oahId][oaHealthId][partIdVal] = healthStatus;
          jsObj.remarks[oahId][oaHealthId][partIdVal] = {};
          jsObj.remarks[oahId][oaHealthId][partIdVal] = (remarkwa == null) ? "" : remarkwa;
          jsObj.oah_oa_health_id_part_id[oahId][oaHealthId].push(partIdVal);
        });
      });
    }
    else if(this.rtoId != null){
      this.selected.forEach(element => {
        var healthObj = "";
        var mainData = element.main_data;
        var oahId = mainData.oah_id;
        //var orderStatusId = mainData.ordered_asset_id;
        var assetId = mainData.asset_id;
        var orderedAssetId = mainData.ordered_asset_id;
        var returnStatus = mainData.return_status;
        jsObj.oah_id[oahId] = orderedAssetId;
        jsObj.assetAndOrderedAsset[assetId] = orderedAssetId;
        jsObj.orderedAssetAndAsset[orderedAssetId] = assetId;
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
          jsObj.oa_health_id[oahId][oaHealthId][partIdVal] = {};
          jsObj.oa_health_id[oahId][oaHealthId][partIdVal] = healthStatus;
          jsObj.remarks[oahId][oaHealthId][partIdVal] = {};
          jsObj.remarks[oahId][oaHealthId][partIdVal] = (remarkwa == null) ? "" : remarkwa;
          jsObj.oah_oa_health_id_part_id[oahId][oaHealthId].push(partIdVal);
        });
      });
    }


    


    console.log(jsObj);

    this.messageService.acknowledgeRequestValue(jsObj, this.rtoId).subscribe(data => {
   this.presentAlert("Return Tool", data.transaction_des);
    loading.dismiss();
      this.navCtrl.pop();
      //this.navCtrl.pop();

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
}
