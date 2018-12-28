import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private books = firebase.firestore().collection('books');
  private booksArray: any[];

  constructor(private router: Router) { }

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

}
