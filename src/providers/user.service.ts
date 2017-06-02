import { Injectable } from '@angular/core';

import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../models/user.model";
import {FirebaseObjectObservable} from "angularfire2/database";

@Injectable()
export class UserService {

    user:FirebaseObjectObservable<User>;

    constructor(private db:AngularFireDatabase) {

    }

    public create(authData:any):any {

        console.log('res', authData);

        this.db.object('/users/' + authData.uid).set({
            email: authData.email,
            //name: authData.displayName
        });

        return this.getMe();

    }

    public getMe():any {

        return this.db.object('/users/' + localStorage.getItem('userKey'));

    }

    public updateMe(data:any) {

        const user = this.db.object('/users/' + localStorage.getItem('userKey'));

        user.update(data);

        return user;

    }

    public get(key):any {

        return this.db.object('/users/' + key);

    }

    public update(key, data:any) {

        return this.db.object('/users/' + key).update(data);

    }

}
