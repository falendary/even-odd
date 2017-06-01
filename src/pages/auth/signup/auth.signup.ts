import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {UserService} from "../../../providers/user.service";


@Component({
    templateUrl: 'auth.signup.html'
})
export class SignupPage {

    public email:string;
    public password:string;

    constructor(public navCtrl:NavController, public userService:UserService) {


    }

    public signup():void {
        this.userService.signup(this.email, this.password);
    }

    public back():void {
        this.navCtrl.pop();
    }
}
