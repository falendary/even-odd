import { Injectable } from '@angular/core';
import {FirebaseObjectObservable} from "angularfire2/database";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class MetaService {

    constructor(private db:AngularFireDatabase) {
    }

    public getPlayerTurnsLimit():FirebaseObjectObservable<any> {
        return this.db.object('/turnsLimit');
    };

}