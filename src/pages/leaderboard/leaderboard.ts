import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {User} from "../../models/user.model";
import {FirebaseListObservable} from "angularfire2/database";
import {MetaHelper} from "../../helpers/meta.helper";

@Component({
    selector: 'page-leaderboard',
    templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {

    public players: FirebaseListObservable<User[]>;

    constructor(public navCtrl: NavController, private userService: UserService, private metaHelper: MetaHelper) {

        this.getUsers();
    }

    private getUsers(): void {

        const opts = {
            query: {
                orderByChild: 'wins',
                limitToLast: 10,
                orderByValue: true,
            }
        };

        this.players = this.userService.getList(opts);

        //console.log('this.players', this.players);
    }


    public getPlayerName(player): string {

        return this.metaHelper.getUsername(player);
    }
}
