import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderToolsPage } from './order-tools';

@NgModule({
  declarations: [
    OrderToolsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderToolsPage),
  ],
})
export class OrderToolsPageModule {}
