import {User} from "./user.model";
export class Game {
    $key: string;
    name:string = '';
    status: string;
    maxPlayers:number = 2;
    players: User[] = [];

    wishedNumber: number;
    playerGuesingId: string;
    playerWishingId: string;
}