import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {NavParams} from "ionic-angular/index";
import {GameService} from "../../providers/game.service";
import {Game} from "../../models/game.model";
import {User} from "../../models/user.model";
import {UserService} from "../../providers/user.service";
import {TabsPage} from "../tabs/tabs";

@Component({
    templateUrl: 'game.html'
})

export class GamePage {

    public game:Game;
    public user:User;
    public gameLoaded:boolean = false;

    constructor(public navCtrl:NavController, private navParams:NavParams, private gameService:GameService, private userService:UserService) {

        console.log(navParams);

        this.getGame();
        this.getUser();
        //
        //this.updateGameInfo()

        //this.user = this.userService.getUser();

    }

    public getGame():void {
        this.gameService.getItem(this.navParams.get('$key')).subscribe(item => {

            this.game = item;
            this.gameLoaded = true;

            console.log('this.game', this.game);
        });
    }

    public getUser():void {

        this.userService.getMe().subscribe(user => this.user = user);

    }

    public updateGameInfo():void {

    }

    public wish(): void {

    }

    public leave():void {

        this.game.players.forEach((player:User, index:number)=> {

            if (player.key == this.user.$key) {
                this.game.players.splice(index, 1)
            }

        });

        if (this.game.players.length == 0) {
            this.game.status = 'finished';
        }

        this.userService.updateMe({currentGame: null});

        console.log('this.game', this.game);

        this.gameService.updateItem(this.game.$key, this.game).subscribe(() => {

            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.popToRoot();

        })

    }
}
