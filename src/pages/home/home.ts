import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FirebaseListObservable} from "angularfire2/database";
import {GameService} from "../../providers/game.service";
import {Game} from "../../models/game.model";
import {GamePage} from "../game/game";
import {UserService} from "../../providers/user.service";
import {User} from "../../models/user.model";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../providers/auth.service";
import {TabsPage} from "../tabs/tabs";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    //accounts:FirebaseListObservable<any[]>;

    private userSubscription:Subscription;
    private gameUpdateSubscription:Subscription;
    private userUpdateSubscription:Subscription;

    public games:FirebaseListObservable<Game[]>;
    public user:User;

    public userKey:string;

    public game:Game = new Game();
    public isNewGame:boolean = false;

    constructor(public navCtrl:NavController, private gameService:GameService, private userService:UserService, private authService: AuthService) {

        this.userKey = localStorage.getItem('userKey');

        const opts = {
            query: {
                orderByChild: 'status',
                equalTo: 'created'
            }
        };

        this.games = this.gameService.getList(opts);
        this.userSubscription = this.userService.getMe().subscribe(item => this.user = item);

    }

    public logout(): void {
        this.authService.logout();
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.popToRoot()
    }

    public join(item:Game):void {

        this.user.key = this.user.$key;
        item.players.push(this.user);

        this.gameUpdateSubscription = this.gameService.updateItem(item.$key, item).subscribe(() => {

            this.userUpdateSubscription = this.userService.updateMe({currentGame: item.$key}).subscribe(() => {

                this.gameUpdateSubscription.unsubscribe();
                this.userUpdateSubscription.unsubscribe();

                this.navCtrl.push(GamePage, item);

            });

        })

    }


    public createNewGame():void {

        console.log('this.gameName', this.game);
        console.log('this.user', this.user);

        this.user.key = this.user.$key;
        this.game.players.push(this.user);
        this.game.status = 'created';

        this.gameService.createItem(this.game).then(game => {

            console.log('game', game);

            this.userService.updateMe({currentGame: game.key});

            this.navCtrl.push(GamePage, game);
        })

    }

    ngOnDestroy() {

        console.log('Home component destroyed');

        this.userSubscription.unsubscribe();
    }

}
