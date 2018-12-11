import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcknowledgementPage } from './acknowledgement';

@NgModule({
  declarations: [
    AcknowledgementPage,
  ],
  imports: [
    IonicPageModule.forChild(AcknowledgementPage),
  ],
})
export class AcknowledgementPageModule {}
