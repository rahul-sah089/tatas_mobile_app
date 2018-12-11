import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeordersPage } from './feorders';

@NgModule({
  declarations: [
    FeordersPage,
  ],
  imports: [
    IonicPageModule.forChild(FeordersPage),
  ],
})
export class FeordersPageModule {}
