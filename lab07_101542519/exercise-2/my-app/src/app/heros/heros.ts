import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HEROES } from '../mock.heros';
import { RemoveSpacesPipe } from '../remove-spaces-pipe';
import { InputFormat } from '../input-format';

@Component({
  selector: 'app-heros',
  imports: [CommonModule, FormsModule, RemoveSpacesPipe, InputFormat],
  templateUrl: './heros.html',
  styleUrl: './heros.css',
})
export class Heros {
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
