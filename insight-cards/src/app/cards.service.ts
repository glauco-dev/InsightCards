import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, query } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Card {
  nome: string;
  tags: string[];
  desc: string;
  level: number;
  style: string;
  display_image: string;
}


const firebaseConfig = {

  apiKey: "AIzaSyBZmbCM9z_O2OwaRcxd0OabBBdH14QZEYM",
  authDomain: "insightcards-3b175.firebaseapp.com",
  projectId: "insightcards-3b175",
  storageBucket: "insightcards-3b175.appspot.com",
  messagingSenderId: "816656613094",
  appId: "1:816656613094:web:a25d0a187e902426504527"

};


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cards$!: Observable<Card[]>;

  constructor() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const cardsRef = query(
      collection(db, 'cards'),
    );

    this.cards$ = collectionData(cardsRef) as Observable<Card[]>
  }

}
