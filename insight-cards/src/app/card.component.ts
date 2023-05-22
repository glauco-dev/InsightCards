import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from './cards.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="ui card {{card.style}}">
      <div class="content">
        <div class="top-level">
          <h3 class="header">
            {{card.nome}}
          </h3>
          <div class="meta">
            <span class="date">
              lv.{{card.level}}
            </span>
          </div>
        </div>

        <div class="image">
          <img src="{{card.display_image}}">
        </div>

        <div class="description">
          {{card.desc}}
          <a href="/card/{{index}}">Mais ></a>
        </div>
      </div>

      <div class="extra content">
        <div>
          <span *ngFor="let tag of card.tags">{{tag}}</span>
        </div>
      </div>
      
    </div>
  `,
  styles: [`
    .top-level{
      display: flex;
      justify-content: space-around;
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
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() index!: Number;
  constructor(){}

  ngOnInit(): void {
      
  }
}
