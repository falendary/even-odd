import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {HomePage} from "../../home/home";
import {AuthService} from "../../../providers/auth.service";

@Component({
    templateUrl: 'auth.login.html'
})
export class LoginPage {

    public email:string;
    public password:string;

    constructor(public navCtrl:NavController, public authService:AuthService) {


    }

    public login():void {
        this.authService.login(this.email, this.password).then(authData => {

            //console.log('user', user);

            localStorage.setItem("userKey", authData.uid);

            this.navCtrl.push(HomePage)

        });

    }

    public back():void {
        this.navCtrl.pop();
    }
}
