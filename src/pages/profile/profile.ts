import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";
import {User} from "../../models/user.model";
import {UserService} from "../../providers/user.service";
import {AuthPage} from "../auth/main/auth.main";
import { App } from 'ionic-angular';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    public user: User;

    constructor(public appCtrl: App, public navCtrl: NavController, private authService: AuthService, private userService: UserService) {

        this.getUser();

    }

    public getUser(): void {

        this.userService.getMe().subscribe(user => this.user = user);

    }

    public saveName() {

        this.userService.updateMe(this.user);
    };

    public logout(): void {

        this.authService.logout();
        this.appCtrl.getRootNav().setRoot(AuthPage);
        this.navCtrl.popToRoot()

    }

}
