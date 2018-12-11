import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockOrderDetailsPage } from './stock-order-details';

@NgModule({
  declarations: [
    StockOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StockOrderDetailsPage),
  ],
})
export class StockOrderDetailsPageModule {}
