import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AuthPage } from '../auth/main/auth.main';
import {NavController} from "ionic-angular/index";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user.service";
import {GamePage} from "../game/game";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = AboutPage;
    tab3Root = ContactPage;

    constructor(public navCtrl:NavController, private afAuth:AngularFireAuth, private userService:UserService) {

        const authObserver = this.afAuth.authState.subscribe(user => {

            //console.log('user', user);

            authObserver.unsubscribe();

            if (user) {

                userService.getMe().subscribe(user => {

                    if (user.currentGame) {
                        this.navCtrl.push(GamePage, {$key: user.currentGame});
                    }

                    authObserver.unsubscribe();

                });


            } else {
                this.navCtrl.push(AuthPage);
            }

        });


    }
}
