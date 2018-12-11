import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { ShoppinglistPage } from '../../pages/shoppinglist/shoppinglist';
import { Tool } from '../../pages/model/tool.model';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
  selector: 'page-feorders',
  templateUrl: 'feorders.html',
})
export class FeordersPage {
  globals: Globals;
  myInput: any = '';
  tools: any = [];

  totalProduct: number = 0;
  qtd: any[];
  cart: any = { items: [] };
  itemss: Tool[] = [];
  newQuant: number;
  ssoId = '';
  error_msg = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public messageService: MessageServiceProvider) {
    this.globals = Globals.getInstance();
    this.storage.get(this.globals.sso_id).then(sso_id => {
      this.ssoId = sso_id;
      this.searchTools();
    });
  }

  ionViewDidEnter() {
    console.log(this.itemss.length);
    this.itemss.forEach(items => {
      let found: boolean = false;
      this.globals.selectedTools.forEach(selected => {
        if(selected.tool_id == items.tool_id) {
          found = true;
        }
      });
      if(!found) {
        this.removeSingleElement(items);
      }
    });
  }

  searchTools() {
    this.error_msg = '';
    this.messageService.getToolsList(this.ssoId, this.myInput, 0).subscribe(data => {
      this.tools = data.toolResults;

      /*this.tools.forEach(tool => {
        tool.qty = 5;
      });*/
      console.log(this.globals.selectedTools)

      console.log("***data list****");
      console.log(this.tools.length);
      console.log("*****************");
      if (this.tools.length == 0) {
        this.error_msg = 'Search item not found';
      }
    });
  }

  qtyChange(tool) {
    if (tool.tool_quant > 0) {
      this.addSingleElement(tool);
    } else {
      this.removeSingleElement(tool);
    }
  }

  createRange(qty) {
    console.log(qty);
    var items: number[] = [];
    for (var i = 0; i <= qty; i++) {
      items.push(i);
    }
    return items;
  }

  addToCart(tool: Tool) {
    tool.modality;
    this.updateQuantity(tool);
  }

  getTotalProduct() {
    this.totalProduct = this.itemss.length;
  }

  public containsElement(tool: Tool) {
    var contains: boolean = false;
    this.itemss.forEach(s1 => {
      if (s1.tool_number == tool.tool_number) {
        contains = true;
        return contains;
      }
    });
    return contains;
  }

  public addSingleElement(tool: Tool) {
    tool.isAdded = true;
    var contains = this.containsElement(tool);

    /*if (tool.tool_quant == tool.qty) {
      return;
    }*/

    if (tool.tool_quant === undefined || tool.tool_quant == 0)
      tool.tool_quant = 1;

    if (!contains) {
      this.itemss.push(tool);
    } else {
      this.updateQuantity(tool);
    }
    this.getTotalProduct();
  }

  public removeSingleElement(tool: Tool) {
    console.log("remove single element called");
    if (tool.tool_quant == undefined) {

    } else {
      this.reduceQuantity(tool);
    }
  }

  public addElement(tool: Tool) {
    tool.isAdded = true;
    var contains = this.containsElement(tool);
    if (tool.tool_quant === undefined)
      tool.tool_quant = 1;
    if (!contains) {
      this.itemss.push(tool);
    } else {
      this.updateQuantity(tool);
    }
    this.getTotalProduct();
  }

  public updateQuantity(tool: Tool) {
    tool.tool_quant = +tool.tool_quant + 1;
    this.itemss.forEach(s1 => {
      if (s1.tool_number === tool.tool_number && s1.tool_quant != tool.tool_quant) {
        s1.tool_quant = +s1.tool_quant + +tool.tool_quant;
      }
    });
  }

  public reduceQuantity(tool: Tool) {
    tool.tool_quant = 0 ;
    tool.isAdded = false;
    let foo_items = tool;
    this.itemss = this.itemss.filter(obj => obj !== foo_items);
    this.totalProduct = this.itemss.length;
    /*console.log(tool.tool_quant);
    if (tool.tool_quant == 1) {
      tool.isAdded = false;
      console.log(this.itemss);
      let foo_items = tool;
      this.itemss = this.itemss.filter(obj => obj !== foo_items);
    }
    if (tool.tool_quant > 0) {
      tool.tool_quant = tool.tool_quant - 1;

    }*/

  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.messageService.getToolsList(this.ssoId, this.myInput, this.tools.length).subscribe(dataList => {
        if (dataList.toolResults.length == 0) {
          this.error_msg = 'No more items to display';
        } else {
          this.error_msg = '';
          dataList.toolResults.forEach(data => {
            this.tools.push(data);
          });
        }
      });
      infiniteScroll.complete();
    }, 500);
  }

  navigateToShopping() {
    this.navCtrl.push(ShoppinglistPage, { items: this.itemss });
  }
}
