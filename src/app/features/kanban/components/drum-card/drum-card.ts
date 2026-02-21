import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Drum } from '../../../../shared/models/drum.type';

@Component({
  selector: 'app-drum-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drum-card.html'
})
export class DrumCardComponent {
  @Input({ required: true }) drum!: Drum;
}