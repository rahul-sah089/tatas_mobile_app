import { Component } from '@angular/core';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { ReturnToolPage } from '../../pages/return-tool/return-tool';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { Tool } from '../model/tool.model';

@IonicPage()
@Component({
  selector: 'page-fetoolreturntool',
  templateUrl: 'fetoolreturntool.html',
})
export class FetoolreturntoolPage {

  globals: Globals;
  tools: any = {};
  allSelect = "Select All";
  toolDetails = [];
  selected = [];
  ssoId = '';
  toolOrderId = '';
  initiateRTResponse: any;
  shownGroup = null;
  detailText = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public messageService: MessageServiceProvider) {
    this.globals = Globals.getInstance();
    this.tools = navParams.get('tool');
    console.log("fe tool return tool page");
    console.log(this.tools);
    console.log(this.tools.assets);
    console.log("fe tool return tool page");
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.toolOrderId = this.tools.order_info.tool_order_id;
      console.log("*******tool order id*******");
      console.log(this.toolOrderId);
      console.log("*******tool order id*******");
      this.messageService.getReturnToolInitialize(this.ssoId, this.toolOrderId).subscribe(data => {
        console.log("initialite return tool response");
        console.log(data);
        console.log("initialite return tool response");
        this.initiateRTResponse = data;
        this.toolDetails = this.initiateRTResponse.return_parts;
        console.log("tool details");
        console.log(this.toolDetails);
        this.toolDetails.forEach(tool => {
          tool.main_data.btn = "Select";
        });
        /*this.toolDetails.forEach(tool => {
          tool.btn = "Select";
          if (tool.asset_status_id == 4 || tool.asset_status_id == 12) {
            tool.calibrationRequired = true;
            this.addElement(tool);
          } else {
            tool.calibrationRequired = false;
          }
        });*/
        console.log(this.initiateRTResponse);
        console.log("initialite return tool response");
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

  continueReturn() {
    this.navCtrl.push(ReturnToolPage, { selected: this.selected, returnToolResponse: this.initiateRTResponse });
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


}
