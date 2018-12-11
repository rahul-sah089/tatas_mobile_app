import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { HeaderPage } from '../pages/header/header';
import { ShippingPage } from '../pages/shipping/shipping';
import { AcknowledgementPage } from '../pages/acknowledgement/acknowledgement';
import { NotificationPage } from '../pages/notification/notification';
import { FeordersPage } from '../pages/feorders/feorders';
import { FemyordersPage } from '../pages/femyorders/femyorders';
import { ShoppinglistPage } from '../pages/shoppinglist/shoppinglist';
import { OrderToolsPage } from '../pages/order-tools/order-tools';
import { QrScanPage } from '../pages/qr-scan/qr-scan';
import { AdminApprovalPage } from "../pages/admin-approval/admin-approval";
import { AddressChangePage } from "../pages/address-change/address-change";
import { FereturntoolPage } from "../pages/fereturntool/fereturntool";
import { FetoolreturntoolPage } from "../pages/fetoolreturntool/fetoolreturntool";
import { FedateextendPage } from "../pages/fedateextend/fedateextend";
import { StockTransferPage } from "../pages/stock-transfer/stock-transfer";
import { StockOrderDetailsPage } from "../pages/stock-order-details/stock-order-details";
import { FeToFeTransferPage } from "../pages/fe-to-fe-transfer/fe-to-fe-transfer";
import { LogisticsAlertPage } from '../pages/logistics-alert/logistics-alert';
import { MessageServiceProvider } from '../providers/message-service/message-service';
import { ReturnToolPage } from '../pages/return-tool/return-tool';
import { ExtendDatePage } from '../pages/extend-date/extend-date';
import { ExtendedDateApprovalPage } from '../pages/extended-date-approval/extended-date-approval';
import { WtwStockTransferPage } from '../pages/wtw-stock-transfer/wtw-stock-transfer';
import { DueReturnPage } from '../pages/due-return/due-return';
import { DueInDeliveriesPage } from '../pages/due-in-deliveries/due-in-deliveries';
import { AckRequestFinalPage } from '../pages/ack-request-final/ack-request-final';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    HeaderPage,
    ShippingPage,
    AcknowledgementPage,
    NotificationPage,
    FeordersPage,
    ShoppinglistPage,
    OrderToolsPage,
    QrScanPage,
    FemyordersPage,
    AdminApprovalPage,
    AddressChangePage,
    FereturntoolPage,
    FetoolreturntoolPage,
    FedateextendPage,
    StockTransferPage,
    StockOrderDetailsPage,
    FeToFeTransferPage,
    LogisticsAlertPage,
    ExtendedDateApprovalPage,
    ReturnToolPage,
    ExtendDatePage,
    WtwStockTransferPage,
    DueReturnPage,
    DueInDeliveriesPage,
    AckRequestFinalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    HeaderPage,
    ShippingPage,
    AcknowledgementPage,
    NotificationPage,
    FeordersPage,
    ShoppinglistPage,
    OrderToolsPage,
    QrScanPage,
    FemyordersPage,
    AdminApprovalPage,
    AddressChangePage,
    FereturntoolPage,
    FetoolreturntoolPage,
    FedateextendPage,
    StockTransferPage,
    StockOrderDetailsPage,
    FeToFeTransferPage,
    LogisticsAlertPage,
    ExtendedDateApprovalPage,
    ReturnToolPage,
    ExtendDatePage,
    WtwStockTransferPage,
    DueReturnPage,
    DueInDeliveriesPage,
    AckRequestFinalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MessageServiceProvider,
    IonicStorageModule
  ]
})
export class AppModule { }
