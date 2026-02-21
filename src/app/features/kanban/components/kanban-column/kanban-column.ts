import { Component, Input } from '@angular/core';
import { Drum, DrumStatus } from '../../../../shared/models/drum.type';
import { DrumCardComponent } from '../drum-card/drum-card';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [DrumCardComponent],
  templateUrl: './kanban-column.html'
})
export class KanbanColumnComponent {
  @Input({ required: true }) status!: DrumStatus;
  @Input({ required: true }) drums: Drum[] = [];
}