import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FirebaseListObservable} from "angularfire2/database";
import {GameService} from "../../providers/game.service";
import {Game} from "../../models/game.model";
import {GamePage} from "../game/game";
import {UserService} from "../../providers/user.service";
import {User} from "../../models/user.model";

import "rxjs/add/operator/mergeMap";
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import {MetaHelper} from "../../helpers/meta.helper";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public games: FirebaseListObservable<Game[]>;
    public user: User;

    public userKey: string;

    public game: Game = new Game();
    public isNewGame: boolean = false;

    constructor(public navCtrl: NavController,
                private gameService: GameService,
                private userService: UserService,
                private metaHelper: MetaHelper) {

        this.userKey = localStorage.getItem('userKey');

        //console.log('navCtrl', this.navCtrl);

        this.getGames();

        this.userService.getMe().takeUntil(this.ngUnsubscribe).subscribe(item => this.user = item);

    }

    private getGames(): void {

        const opts = {
            query: {
                orderByChild: 'status',
                equalTo: 'created'
            }
        };

        this.games = this.gameService.getList(opts);

    }

    public getName(): string {

        return this.metaHelper.getUsername(this.user);
    }

    public join(item: Game): void {

        //console.log('ACTION JOIN');

        this.user.key = this.user.$key;
        item.players.push(this.user);

        this.gameService.updateItem(item.$key, item);
        this.userService.updateMe({currentGame: item.$key});

        this.navCtrl.push(GamePage, item);

    }


    public createNewGame(): void {

        //console.log('ACTION HOST');

        this.user.key = this.user.$key;
        this.user.isReady = true;

        console.log('this user', this.user);

        this.game.players.push(this.user);
        this.game.status = 'created';
        this.game.hostPlayerId = this.user.key;
        this.game.createdAt = new Date().toString();
        this.game.currentTurn = 0;

        this.gameService.createItem(this.game).then(game => {

            this.userService.updateMe({currentGame: game.key});

            //console.log("HOST PUSH");

            this.isNewGame = false;
            this.game = new Game();

            this.navCtrl.push(GamePage, {$key: game.key});
        })

    }

    ngOnDestroy() {

        console.log('Home component destroyed');

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
