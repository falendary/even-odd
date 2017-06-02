import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {AuthService} from "../../../providers/auth.service";
import {HomePage} from "../../home/home";


@Component({
    templateUrl: 'auth.signup.html'
})
export class SignupPage {

    public email:string;
    public password:string;

    constructor(public navCtrl:NavController, public authService:AuthService) {


    }

    public signup():void {
        this.authService.signup(this.email, this.password).then((authData)=> {

            localStorage.setItem("userKey", authData.uid);

            this.navCtrl.push(HomePage);
        })
    }

    public back():void {
        this.navCtrl.pop();
    }
}
