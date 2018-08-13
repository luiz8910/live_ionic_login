import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import firebaseConfig from '../../app/firebase-config';
import * as firebase from 'firebase';
import {HomePage} from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider ) {
    }

    ionViewDidLoad() {
        this.firebaseInit();
        //this.firebaseLoginResult();
        // firebase.auth().getRedirectResult().then((result) => {
        //     console.log(result);
        // });
    }

    //Chamar este método pelo onclick no html
    login() {
        const provider = new firebase.auth.FacebookAuthProvider();

        provider.addScope('public_profile');
        firebase
            .auth()
            .signInWithRedirect(provider)
            .then( () => {

            })
    }

    //Chamar este método pelo onclick no html
    google_login()
    {
        const provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('public_profile');

        firebase.auth().signInWithRedirect(provider)
            .then(() => {

            })
    }

    logout()
    {
        firebase.auth().signOut()
            .then(() => {
                this.navCtrl.setRoot(LoginPage);
            })
    }

    firebaseLoginResult()
    {
        firebase.auth().onAuthStateChanged( (user) => {
            console.log(user);
            this.auth.user.name = user.displayName;
            this.auth.user.photo = user.photoURL;
            this.navCtrl.setRoot(HomePage);
        })
    }

    firebaseInit() {
        firebase.initializeApp(firebaseConfig);
        this.firebaseLoginResult();
    }


}
