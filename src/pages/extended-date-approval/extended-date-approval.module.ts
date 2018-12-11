import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExtendedDateApprovalPage } from './extended-date-approval';

@NgModule({
  declarations: [
    ExtendedDateApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(ExtendedDateApprovalPage),
  ],
})
export class ExtendedDateApprovalPageModule {}
