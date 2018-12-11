import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderToolsPage } from '../order-tools/order-tools';
import { Tool } from '../../pages/model/tool.model';
import { Globals } from '../../app/Globals';

@IonicPage()
@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage {

  globals : Globals;
  items:Tool[] = [];
  removeList:Tool[] = [];
  enableRemove = false;
  enableCheckout = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.globals = Globals.getInstance();
    this.items = navParams.get('items');
    console.log("********");
    console.log(this.items);
    console.log("**********");
  }

  pressEvent(item) {
      var contains = this.containsElement(item);
      if (!contains) {
        item.isSelected = true;
        this.removeList.push(item);
      } else {
        item.isSelected = false;
        this.removeList.pop();
      }
      if(this.removeList.length == 0) {
        this.enableRemove = false;
      } else {
        this.enableRemove = true;
      }
  }

  containsElement(tool) {
    var contains: boolean = false;
    this.removeList.forEach(toolId => {
      if (toolId == tool) {
        contains = true;
        return contains;
      }
    });
    return contains;
  }

  ionViewWillLeave() {
    this.globals.selectedTools = this.items;
  }

  addItem() {
    this.globals.selectedTools = this.items;
    this.navCtrl.pop();
  }

  removeItems() {
    this.removeList.forEach(tool => {
      this.removeItem(tool);
    });
    if(this.items.length == 0) {
      this.enableCheckout = false;
    } else {
      this.enableCheckout = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppinglistPage');
  }

  confirmOrder() {
    this.globals.selectedTools = [];
    this.navCtrl.push(OrderToolsPage,{items:this.items});
  }

  removeItem(tool){
    // this.items.filter(obj => obj !== tool);
    this.items = this.items.filter(obj => obj !== tool);
    console.log(this.items);
  }

  public reduceQuantity(tool: Tool) {
    tool.tool_quant = 0 ;
    tool.isAdded = false;
    let foo_items = tool;
    this.items = this.items.filter(obj => obj !== foo_items);
    //this.totalProduct = this.itemss.length;
  }

}
