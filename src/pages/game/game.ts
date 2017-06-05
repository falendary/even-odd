import { Component } from '@angular/core';
import {NavController} from "ionic-angular/index";
import {NavParams} from "ionic-angular/index";
import {GameService} from "../../providers/game.service";
import {Game} from "../../models/game.model";
import {User} from "../../models/user.model";
import {UserService} from "../../providers/user.service";
import {MetaService} from "../../providers/meta.service";
import { ToastController } from 'ionic-angular';
import {MetaHelper} from "../../helpers/meta.helper";

import "rxjs/add/operator/mergeMap";
//import 'rxjs/add/operator/flatMap';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
    templateUrl: 'game.html'
})

export class GamePage {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public game: Game;
    public user: User;
    public gameLoaded: boolean = false;

    public wishNumber: number;

    public turnsLimit: number;

    constructor(private navCtrl: NavController,
                public toastCtrl: ToastController,
                private navParams: NavParams,
                private gameService: GameService,
                private userService: UserService,
                private metaService: MetaService,
                private metaHelper: MetaHelper) {

        console.log(navParams);

        this.getGame();
        this.getUser();
        this.getTurnsLimit();

    }

    public getPlayerName(player): string {

        return this.metaHelper.getUsername(player);
    }

    // description: get next player from current wishing player
    // output: User.key (string)

    private getNextPlayerId(): string {

        let guessingPlayerId: string = '';

        this.game.players.forEach((player, index) => {

            if (player.key == this.game.playerWishingId) {

                if (index == this.game.players.length - 1) {
                    guessingPlayerId = this.game.players[0].key;
                } else {
                    guessingPlayerId = this.game.players[index + 1].key;
                }

            }

        });

        return guessingPlayerId;

    };

    public getGame(): void {

        this.gameService.getItem(this.navParams.get('$key')).takeUntil(this.ngUnsubscribe).subscribe(item => {

            this.game = item;
            this.gameLoaded = true;

            //console.log('this.game', this.game);
        });
    }

    public getUser(): void {

        this.userService.getMe().subscribe(user => this.user = user);

    }

    public getTurnsLimit(): void {
        this.metaService.getPlayerTurnsLimit().subscribe(turnsLimit => this.turnsLimit = turnsLimit.$value);
    }

    public updatePlayerScore(): void {

        this.game.players.forEach(player => {


            if (player.key == this.user.$key) {

                if (!player.currentScore) {
                    player.currentScore = 0;
                }

                player.currentScore = player.currentScore + 1;

            }
        });

    }

    public updatePlayersStats(): void {

        this.game.players.forEach(_player => {

            let player = JSON.parse(JSON.stringify(_player));

            if (!player.games) player.games = 0;
            if (!player.wins) player.wins = 0;
            if (!player.loses) player.loses = 0;

            if (this.checkWinner(player)) {
                player.wins = player.wins + 1;
            } else {
                player.loses = player.loses + 1;
            }

            player.games = player.games + 1;

            player.currentScore = 0;
            player.isReady = false;

            this.userService.update(player.key, player)

        })

    }

    public congratPlayer(): void {

        let phrases = ["Hurray!", "Great one!", "You are lucky today!", "Congratulations!", "Nice one!", "Great job!", "Wooah",
            "Awesome!", "Nice guess!", "You got it!"];

        let toast = this.toastCtrl.create({
            message: phrases[this.metaHelper.getRandom(0, phrases.length - 1)] + ' +1',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-success',
        });

        toast.present();

    }

    public informPlayer(): void {

        let phrases = ["Nope", "Try next time", "Don't worry", "Unfair", "Miss!", "Oops", "Better luck next time",
            "Unfortunate", "Bad luck", "Fail", "Misfortune", "Fiasco"];

        let toast = this.toastCtrl.create({
            message: phrases[this.metaHelper.getRandom(0, phrases.length - 1)],
            duration: 3000,
            position: 'top'
        });

        toast.present();

    }

    private finishGame(): void {

        this.game.status = 'finished';
        this.game.finishedAt = new Date().toString();
        this.updatePlayersStats();

    }

    // description: check if game falls into draw
    // output: boolean

    private isDraw(): boolean {

        let maxResult: number = 0;

        this.game.players.forEach(player => {
            if (maxResult < player.currentScore) {
                maxResult = player.currentScore;
            }
        });

        let maxPlayers = [];

        this.game.players.forEach(player => {
            if (maxResult == player.currentScore) {
                maxPlayers.push(player);
            }
        });

        return maxPlayers.length > 1;

    }

    private isFinish(): void {

        if (!this.game.currentTurn) {
            this.game.currentTurn = 0;
        }

        this.game.currentTurn = this.game.currentTurn + 1;
        this.game.wishedNumber = null;
        this.game.playerWishingId = this.user.$key;
        this.game.playerGuesingId = this.getNextPlayerId();


        if (this.game.currentTurn == this.game.turnsLimit) { // if we reach turns limit

            if (this.isDraw()) {

                this.game.turnsLimit = this.game.turnsLimit + this.game.players.length;

                this.game.victoryBounty = true; // initialize draw bounty

                console.log('Initiate bounty', this.game.victoryBounty);

            } else {

                this.finishGame();
            }
        }


        this.gameService.updateItem(this.game.$key, this.game);
    }

    public wish(): void {

        this.game.wishedNumber = this.wishNumber;

        this.wishNumber = null;

        this.gameService.updateItem(this.game.$key, this.game);

    }

    public guess(type: string): void {

        if (this.game.wishedNumber % 2 == 0 && type == 'even' || this.game.wishedNumber % 2 != 0 && type == 'odd') {
            this.updatePlayerScore();
            this.congratPlayer();

            if (this.game.victoryBounty == true) { // if we have draw, and looking for first successfully guessed player
                this.finishGame();
            }

        } else {
            this.informPlayer();
        }

        this.isFinish();

    }

    public toggleReady(): void {
        this.user.isReady = !this.user.isReady;

        this.game.players.forEach(player => {
            if (player.key == this.user.$key) {
                player.isReady = this.user.isReady;
            }
        });

        this.gameService.updateItem(this.game.$key, this.game);
    }

    // Lobby starts

    public checkReadyStatus(): boolean {

        if (this.game.players.length < 2) {
            return false;
        }

        return this.game.players.every(player => {
            return player.isReady;
        })

    }

    public start(): void {

        this.game.status = 'inprogress';
        this.game.startedAt = new Date().toString();

        this.game.playerWishingId = this.user.$key;
        this.game.playerGuesingId = this.getNextPlayerId();

        //console.log('this.turnsLimit', this.turnsLimit);

        this.game.players.forEach(player => {
            player.turnsLimit = this.turnsLimit;
        });

        this.game.turnsLimit = this.game.players.length * this.turnsLimit;

        this.gameService.updateItem(this.game.$key, this.game);

    }

    public backToHome(): void {

        //console.log('this user', this.user);

        this.user.currentGame = null;

        this.userService.updateMe(this.user);

        this.navCtrl.pop();

    }

    public leave(): void {

        console.log('ACTION LEAVE');

        this.game.players.forEach((player: User, index: number)=> {

            if (player.key == this.user.$key) {
                this.game.players.splice(index, 1)
            }

        });

        if (this.game.players.length == 0) {
            this.game.status = 'finished';
        }

        this.userService.updateMe({currentGame: null});
        this.gameService.updateItem(this.game.$key, this.game);

        this.navCtrl.popToRoot();

    }

    // Lobby ends

    public checkWinner(player: User): boolean {

        let maxResultPlayer: User;

        if (this.game.players) {
            this.game.players.forEach(player => {

                if (!maxResultPlayer) {
                    maxResultPlayer = player;
                } else {
                    if (maxResultPlayer.currentScore < player.currentScore) {
                        maxResultPlayer = player;
                    }
                }

            });

            return maxResultPlayer.key == player.key;
        }

        return false;

    }

    public addNumber(num: number): void {

        if (!this.wishNumber) {
            this.wishNumber = num;
        } else {
            this.wishNumber = parseInt(this.wishNumber.toString() + num, 10);
        }
    }

    ngOnDestroy() {

        console.log('Game component destroyed');

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
