import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeToFeTransferPage } from './fe-to-fe-transfer';

@NgModule({
  declarations: [
    FeToFeTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(FeToFeTransferPage),
  ],
})
export class FeToFeTransferPageModule {}
