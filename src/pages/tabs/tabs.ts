import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { LeaderboardPage } from '../leaderboard/leaderboard';
import { HomePage } from '../home/home';
import { AuthPage } from '../auth/main/auth.main';
import {NavController} from "ionic-angular/index";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../providers/user.service";
import {GamePage} from "../game/game";
import {Subscription} from "rxjs/Subscription";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = ProfilePage;
    tab3Root = LeaderboardPage;

    userSubscription: Subscription;

    constructor(public navCtrl:NavController, private afAuth:AngularFireAuth, private userService:UserService) {

        const authObserver = this.afAuth.authState.subscribe(user => {

            console.log('authObserver, user', user);
            console.log('authObserver, authObserver', authObserver);

            //

            if (user) {

                let userSubscription = userService.getMe().subscribe(user => {

                    if (user.currentGame) {
                        this.navCtrl.push(GamePage, {$key: user.currentGame});
                    }

                    userSubscription.unsubscribe();
                    authObserver.unsubscribe();

                });


            } else {
                this.navCtrl.push(AuthPage);

                authObserver.unsubscribe();
            }



        });


    }
}
