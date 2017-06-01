import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {UserService} from "../../../providers/user.service";
import {HomePage} from "../../home/home";

@Component({
    templateUrl: 'auth.login.html'
})
export class LoginPage {

    public email:string;
    public password:string;

    constructor(public navCtrl:NavController, public userService:UserService) {


    }

    public login():void {
        this.userService.login(this.email, this.password).then(user => {

            console.log('user', user);

            localStorage.setItem("user", JSON.stringify({email: user.email}));

            this.navCtrl.push(HomePage)

        });

    }

    public back():void {
        this.navCtrl.pop();
    }
}
