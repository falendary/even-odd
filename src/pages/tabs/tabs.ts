import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AuthPage } from '../auth/main/auth.main';
import {UserService} from "../../providers/user.service";
import {NavController} from "ionic-angular/index";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl:NavController, public userService:UserService) {

    if(!this.userService.checkAuth() || !localStorage.getItem('user')) {
      this.navCtrl.push(AuthPage);
    }

  }
}
