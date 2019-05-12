import { Component, OnInit } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {

title = 'blog';

  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
    const config = {
      apiKey: "AIzaSyAyujfoDed8EO9Dw-Dxevwy2ZdYuOzuPJg",
      authDomain: "blog-e1dc7.firebaseapp.com",
      databaseURL: "https://blog-e1dc7.firebaseio.com",
      projectId: "blog-e1dc7",
      storageBucket: "blog-e1dc7.appspot.com",
      messagingSenderId: "155693425425"
    };
    
    firebase.initializeApp(config);
  }

  isAuth = false;
  
  appareils: any[];


  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }




}
