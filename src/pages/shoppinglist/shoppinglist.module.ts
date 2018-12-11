import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppinglistPage } from './shoppinglist';

@NgModule({
  declarations: [
    ShoppinglistPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppinglistPage),
  ],
})
export class ShoppinglistPageModule {}
