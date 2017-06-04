import { Injectable } from '@angular/core';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {Game} from "../models/game.model";

@Injectable()
export class GameService {

    private items:FirebaseListObservable<Game[]>;

    constructor(private db:AngularFireDatabase) {
        this.items = this.db.list('/games');
    }

    public getList(query):FirebaseListObservable<Game[]> {
        return this.db.list('/games', query);
    }

    public getItem(key:string):FirebaseObjectObservable<Game> {
        return this.db.object('/games/' + key);
    };


    public createItem(game:Game):any {

        return this.items.push(game).then(item => {
            console.log('item', item);

            return item;
        });
    }

    public updateItem(key:string, data:Game):FirebaseObjectObservable<Game> {

        const game = this.db.object('/games/' + key);

        game.update(data);

        return game;

    }

    public deleteItem(key:string):void {
        this.items.remove(key);
    }

    public deleteEverything():void {
        this.items.remove();
    }

}
