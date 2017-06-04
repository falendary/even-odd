import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {AuthService} from "../../../providers/auth.service";
import {UserService} from "../../../providers/user.service";
import {TabsPage} from "../../tabs/tabs";
import {User} from "../../../models/user.model";

@Component({
    templateUrl: 'auth.login.html'
})
export class LoginPage {

    public email: string;
    public password: string;

    public user: User;

    constructor(public navCtrl: NavController, public authService: AuthService, private userService: UserService) {

    }

    public login(): void {

        this.authService.login(this.email, this.password).then(authData => {

            this.userService.getUserByEmail(this.email).subscribe(data => {

                console.log('data', data);

                localStorage.setItem("userKey", data[0].$key);

                this.navCtrl.setRoot(TabsPage);
                this.navCtrl.popToRoot();
                //this.navCtrl.push(HomePage);
            });

        });

    }

    public validateFields(): boolean {

        return this.email !== null && this.password !== null;

    }

    public back(): void {
        this.navCtrl.pop();
    }
}
