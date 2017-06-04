
export class User {
    $key: string;
    key: string;

    name: string;

    email: string = '';

    currentGame: string;
    isReady: boolean;

    currentScore: number = 0;
    turnsLimit: number;

    wins: number;
    loses: number;
    games: number;

    public getName(): string {
        if (this.name) {
            return this.name;
        }

        return this.email;
    }
}