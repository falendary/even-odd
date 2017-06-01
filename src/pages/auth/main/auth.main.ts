import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {LoginPage} from "../login/auth.login";
import {SignupPage} from "../signup/auth.signup";

@Component({
    templateUrl: 'auth.main.html'
})
export class AuthPage {

    constructor(public navCtrl:NavController) {

    }

    public login(): void {
        this.navCtrl.push(LoginPage)
    }

    public signup(): void {
        this.navCtrl.push(SignupPage)
    }
}
