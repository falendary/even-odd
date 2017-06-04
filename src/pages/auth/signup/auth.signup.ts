import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {AuthService} from "../../../providers/auth.service";
import {TabsPage} from "../../tabs/tabs";


@Component({
    templateUrl: 'auth.signup.html'
})
export class SignupPage {

    public email:string;
    public password:string;

    constructor(public navCtrl:NavController, public authService:AuthService) {

    }

    public signup():void {

        this.authService.signup(this.email, this.password).then(key=> {

            localStorage.setItem("userKey", key);

            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.popToRoot();
        })

    }

    public validateFields(): boolean {

        return this.email !== null && this.password !== null;

    }

    public back():void {

        this.navCtrl.pop();

    }
}
