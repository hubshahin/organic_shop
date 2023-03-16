import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.user = user);
  }

  logout() {
    this.afAuth.signOut();
  }
}
