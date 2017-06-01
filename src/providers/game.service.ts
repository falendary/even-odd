import { Injectable } from '@angular/core';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {Game} from "../models/game.model";

@Injectable()
export class GameService {

    private items:FirebaseListObservable<Game[]>;

    constructor(private db:AngularFireDatabase) {
        this.items = this.db.list('/games');
    }

    public getList():FirebaseListObservable<Game[]> {
        return this.items;
    }

    public createItem(game:Game):FirebaseObjectObservable<Game> {
        this.items.push(game);

        return this.items[0]
    }

    public updateItem(key: string, newText: string):void {
        this.items.update(key, { text: newText });
    }

    public deleteItem(key: string): void {
        this.items.remove(key);
    }

    public deleteEverything(): void {
        this.items.remove();
    }

}
