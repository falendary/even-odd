import { Injectable } from '@angular/core';

import {User} from "../models/user.model";

@Injectable()
export class MetaHelper {

    public  getRandom(min: number, max: number) {

        return Math.floor(Math.random() * (max - min) + min);

    }

    public  getUsername(user: User) {

        if (user.name) {
            return user.name;
        }

        return user.email;
    }

}