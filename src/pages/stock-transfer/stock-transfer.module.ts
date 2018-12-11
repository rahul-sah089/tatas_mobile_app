import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockTransferPage } from './stock-transfer';

@NgModule({
  declarations: [
    StockTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(StockTransferPage),
  ],
})
export class StockTransferPageModule {}
