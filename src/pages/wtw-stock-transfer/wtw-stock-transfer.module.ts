import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WtwStockTransferPage } from './wtw-stock-transfer';

@NgModule({
  declarations: [
    WtwStockTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(WtwStockTransferPage),
  ],
})
export class WtwStockTransferPageModule {}
