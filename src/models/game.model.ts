import {User} from "./user.model";

export class Game {

    $key: string;
    name:string = '';
    status: string;
    maxPlayers:number = 2;
    players: User[] = [];

    hostPlayerId: string;

    createdAt: string;
    startedAt: string;
    finishedAt: string;

    turnsLimit: number;
    currentTurn: number;

    wishedNumber: number;
    playerGuesingId: string;
    playerWishingId: string;

}