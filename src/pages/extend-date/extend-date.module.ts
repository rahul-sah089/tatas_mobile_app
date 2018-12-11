import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExtendDatePage } from './extend-date';

@NgModule({
  declarations: [
    ExtendDatePage,
  ],
  imports: [
    IonicPageModule.forChild(ExtendDatePage),
  ],
})
export class ExtendDatePageModule {}
