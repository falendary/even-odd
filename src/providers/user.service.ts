import { Injectable } from '@angular/core';

//import {User} from "../models/user.model";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class UserService {

    constructor(private db:AngularFireDatabase, private afAuth:AngularFireAuth) {


        afAuth.auth.onAuthStateChanged(function (firebaseUser) {

            if (firebaseUser) {
                console.log(firebaseUser);
            }

        })
    }

    public signup(email:string, pass:string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((res:any) => {

            console.log('res', res);

        })
    }

    public checkAuth():boolean {

        console.log(this.afAuth.auth.currentUser);

        return !!this.afAuth.auth.currentUser;
    }


    public login(email:string, pass:string): any {
        return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    }

    public logout():void {
        this.afAuth.auth.signOut();
    }


}
