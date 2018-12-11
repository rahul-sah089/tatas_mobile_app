import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DueInDeliveriesPage } from './due-in-deliveries';

@NgModule({
  declarations: [
    DueInDeliveriesPage,
  ],
  imports: [
    IonicPageModule.forChild(DueInDeliveriesPage),
  ],
})
export class DueInDeliveriesPageModule {}
