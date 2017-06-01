import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FirebaseListObservable} from "angularfire2/database";
import {GameService} from "../../providers/game.service";
import {Game} from "../../models/game.model";
import {GamePage} from "../game/game";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    //accounts:FirebaseListObservable<any[]>;

    public games:FirebaseListObservable<Game[]>;

    public game:Game = new Game();
    public isNewGame:boolean = false;


    constructor(public navCtrl:NavController, public gameService:GameService) {

        this.games = this.gameService.getList();

        console.log('this.gameName', this.game);

    }

    public join(item:Game):void {
        console.log('item', item);

        this.navCtrl.push(GamePage, item);
    }


    public createNewGame():void {

        console.log('create new game');

        console.log('this.gameName', this.game);

        this.gameService.createItem(this.game);

    }

}
