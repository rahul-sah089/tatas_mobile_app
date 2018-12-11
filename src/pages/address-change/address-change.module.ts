import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressChangePage } from './address-change';

@NgModule({
  declarations: [
    AddressChangePage,
  ],
  imports: [
    IonicPageModule.forChild(AddressChangePage),
  ],
})
export class AddressChangePageModule {}
