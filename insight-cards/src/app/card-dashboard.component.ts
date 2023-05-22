import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardsService } from './cards.service';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="ui container">
    <article *ngIf="(card$ | async) as card" class="ui two column grid container segment padded piled" >
      <div  class="ui card {{card.style}}">
        <div class="content">
          <div class="top-level">
            <h4 class="header">
              {{card.nome}}
            </h4>
            <div class="meta">
              <span class="date">
                lv.{{card.level}}
              </span>
            </div>
          </div>
  
          <div class="image">
            <img src="{{card.display_image}}">
          </div>
        </div>
  
        <div class="extra content">
          <div>
            <span *ngFor="let tag of card.tags">{{tag}}</span>
          </div>
        </div>
      </div>  
      
      <div class="ui container column">
        <h3 class="ui header">
          {{card.nome}}
        </h3>
        <div class="ui segment">
          {{card.desc}}
        </div>
      </div>

      <button (click)="edit($event)">{{this.editCard?"Salvar":"Editar"}}</button>
    </article>
  </div>
  `,
  styles: [`
    div.container{
    }
    article.container{
      padding: 1rem;
      margin-top: 4rem !important;
      margin-inline: auto;
    }
    .image{
      min-height: 150px;
    }
    .description{
      text-align: left;
    }
    .extra div{
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class CardDashboardComponent {
  card$!: Observable<Card>;
  editCard: boolean = false;

  edit(event:MouseEvent){
    this.editCard = !this.editCard
  }

  constructor(private cardService: CardsService, private route: ActivatedRoute) {
    this.card$ = this.cardService.cards$
      .pipe(
        switchMap((cards) => {
          const ids = this.route.paramMap.pipe(map(params => {
            return cards[Number(params.get('index'))]
          }))
          return ids
        }
        )
        ,
        tap(joined => {
          console.log(joined)
        })
      )
  }
}
