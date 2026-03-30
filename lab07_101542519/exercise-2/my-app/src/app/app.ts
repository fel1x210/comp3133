import { Component, signal } from '@angular/core';
import { Heros } from './heros/heros';

@Component({
  selector: 'app-root',
  imports: [Heros],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Tour of Heroes');
}
