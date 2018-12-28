import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
// You don't need to import firebase/app either since it's being imported above

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private books = firebase.firestore().collection('books'); 
   booksArray: any[];

  constructor(
    private router: Router, 
    private auth: AuthService,
    private session: SessionService
    ) { }

  ngOnInit() {
    this.getAllBooks().then(response =>{
      this.booksArray = response;
    })
    .catch(error => {
      console.error(error);
    })
  }

  async getAllBooks(){
    let array: any[] = [];
    try {
      const querySnapshot = await this.books.get();
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        array.push(doc.data());
      });

      return array;
    } catch (error) {
      throw new Error(error);
    }
  }


  login(){
    this.auth.login();
  }

  logout(){
    this.auth.logout();
  }

  get isAuthenticathed(){
    return this.auth.isAuthenticated;
  }

  get username(){
    return this.session.getUser().displayName;
  }
  

}
