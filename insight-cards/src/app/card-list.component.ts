import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardsService } from './cards.service';
import { CardComponent } from './card.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <section class="cards-section ui container">
      <h2 class="list-title">Insight Cards list</h2>
      <article class="card-list" class="ui grid equal width">
        <app-card *ngFor="let card of (cardService.cards$ | async); let i = index" [index]="i" [card]="card"></app-card>
      </article>
    </section>
  `,
  styles: [`
    section.container{
      padding-top: 2rem;
      gap: 2rem;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class CardListComponent implements OnInit {
  cards$!: Card[]
  constructor(readonly cardService: CardsService) {
    this.cardService.cards$
      .subscribe(cards => {
        this.cards$ = cards
      })
  }
  ngOnInit(): void {

  }
}
