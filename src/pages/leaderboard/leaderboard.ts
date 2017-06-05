import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {User} from "../../models/user.model";
import {MetaHelper} from "../../helpers/meta.helper";

@Component({
    selector: 'page-leaderboard',
    templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

    public players: User[];

    public ready: boolean = false;

    constructor(public navCtrl: NavController, private userService: UserService, private metaHelper: MetaHelper) {

        this.getUsers();
    }

    private getUsers(): void {

        const opts = {
            query: {
                orderByChild: 'wins',
                limitToLast: 10,
                orderByValue: true,
                startAt: 1
            }
        };

        this.userService.getList(opts).subscribe((data)=> {
            this.players = data.filter(item => item.wins);

            this.ready = true;
        });

        //console.log('this.players', this.players);
    }


    public getPlayerName(player): string {

        return this.metaHelper.getUsername(player);
    }
}
