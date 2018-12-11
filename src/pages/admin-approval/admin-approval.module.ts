import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminApprovalPage } from './admin-approval';

@NgModule({
  declarations: [
    AdminApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminApprovalPage),
  ],
})
export class AdminApprovalPageModule {}
