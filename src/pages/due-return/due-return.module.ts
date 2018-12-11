import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DueReturnPage } from './due-return';

@NgModule({
  declarations: [
    DueReturnPage,
  ],
  imports: [
    IonicPageModule.forChild(DueReturnPage),
  ],
})
export class DueReturnPageModule {}
