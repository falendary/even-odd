import { Injectable } from '@angular/core';

import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "./user.service";


@Injectable()
export class AuthService {


    constructor(private afAuth: AngularFireAuth, private userService: UserService) {

    }

    public signup(email: string, pass: string): any {

        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((authDta: any) => {

            return new Promise((resolve) => {

                this.userService.create({email: authDta.email}).subscribe((data)=> {
                    resolve(data[0].$key)
                });

            })

        })
    }

    public login(email: string, pass: string): any {
        return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    }

    public logout(): void {
        this.afAuth.auth.signOut();
    }


}
