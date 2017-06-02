import { Injectable } from '@angular/core';

import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../models/user.model";
import {UserService} from "./user.service";

@Injectable()
export class AuthService {

    constructor(private afAuth:AngularFireAuth, private userService:UserService) {

    }

    public signup(email:string, pass:string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((authDta:any) => {

            this.userService.create(authDta);

            return authDta;
        })
    }

    public login(email:string, pass:string):any {
        return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    }

    public logout():void {
        this.afAuth.auth.signOut();
    }


}
