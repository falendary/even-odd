import { Injectable } from '@angular/core';

import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../models/user.model";
import {FirebaseObjectObservable} from "angularfire2/database";
import {FirebaseListObservable} from "angularfire2/database";


@Injectable()
export class UserService {

    user:FirebaseObjectObservable<User>;

    private items:FirebaseListObservable<User[]>;

    constructor(private db:AngularFireDatabase) {

        this.items = this.db.list('/users');

    }

    public getList(query):FirebaseListObservable<User[]> {
        return this.db.list('/users', query);
    }


    public create(authData): FirebaseObjectObservable<User> {

        console.log('res', authData);

        this.items.push({email: authData.email});


        return this.getUserByEmail(authData.email);
    }

    public getMe(): FirebaseObjectObservable<User> {

        return this.db.object('/users/' + localStorage.getItem('userKey'));

    }



    public updateMe(data:any): FirebaseObjectObservable<User> {

        const user = this.db.object('/users/' + localStorage.getItem('userKey'));

        user.update(data);

        return user;

    }

    public get(key): FirebaseObjectObservable<User> {

        return this.db.object('/users/' + key);

    }

    public getUserByEmail(email: string): any {
        const opts = {
            query: {
                orderByChild: 'email',
                equalTo: email,
                once: (snap) => {
                    return snap.val();
                }
            }
        };

        return this.db.list('/users', opts);

    }

    public update(key, data:any): FirebaseObjectObservable<User> {

        const user =  this.db.object('/users/' + key);

        user.update(data);

        return user;

    }

}
