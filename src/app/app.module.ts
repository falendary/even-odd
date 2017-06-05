import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GameService } from '../providers/game.service';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';
import { AngularFireModule } from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {GamePage} from "../pages/game/game";
import {AuthPage} from "../pages/auth/main/auth.main";
import {SignupPage} from "../pages/auth/signup/auth.signup";
import {LoginPage} from "../pages/auth/login/auth.login";
import {MetaService} from "../providers/meta.service";
import {MetaHelper} from "../helpers/meta.helper";
import {OrderByPipe} from "../pipes/orderby.pipe";

export const firebaseConfig = {
    apiKey: "AIzaSyClJd828Vi82QuSWhqMqtpK6-CYi_bthFg",
    authDomain: "even-odd-e12be.firebaseapp.com",
    databaseURL: "https://even-odd-e12be.firebaseio.com",
    projectId: "even-odd-e12be",
    storageBucket: "even-odd-e12be.appspot.com",
    messagingSenderId: "977783643865"
};


@NgModule({
    declarations: [
        MyApp,
        ProfilePage,
        LeaderboardPage,
        HomePage,
        TabsPage,
        GamePage,
        AuthPage,
        LoginPage,
        SignupPage,


        OrderByPipe
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ProfilePage,
        LeaderboardPage,
        HomePage,
        TabsPage,
        GamePage,
        AuthPage,
        LoginPage,
        SignupPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GameService,
        UserService,
        AuthService,
        MetaService,
        MetaHelper
    ]
})
export class AppModule {
}
