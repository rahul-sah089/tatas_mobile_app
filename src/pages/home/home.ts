import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { Globals } from '../../app/Globals';
import { Storage } from '@ionic/storage';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events=[];
  pswdText: string = "password";
  globals: Globals;
  userInfo= {};

  constructor(private storage: Storage, public messageService: MessageServiceProvider, public navCtrl: NavController) {
    this.globals = Globals.getInstance();
    this.storage.get(this.globals.role_id).then((role_id => {
      if(role_id != null)
        this.gotoMenu();
    }));
  }

  gotoMenu() {
    // this.navCtrl.push(MenuPage);
    this.navCtrl.setRoot(MenuPage,{userInfo:this.userInfo});
  }

  signIn(value: {uname: string, pswd: string}) {
    this.messageService.login(value).subscribe(data => {
      try {
        data.forEach(user=>{
          console.log(user.sso_id + " " + user.name + " " + user.role_id);
          this.userInfo = user;
          console.log("user info"); 
          console.log(this.userInfo);
          if(this.globals.getRoleIds().indexOf(user.role_id) > -1) {
            console.log("Login successful");
            this.storage.set(this.globals.role_id, user.role_id);
            this.storage.set(this.globals.sso_id, user.sso_id);
            this.gotoMenu();
          }
        });
      } catch(err) {
        console.log(data.invalid_token);
      }
    });
  }

  onIconClick() {
    if(this.pswdText == "password") {
      this.pswdText = "text";
    } else {
      this.pswdText = "password";
    }
  }
}
