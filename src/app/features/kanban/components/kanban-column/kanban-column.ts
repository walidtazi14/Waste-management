import { Component, Input } from '@angular/core';
import { Drum, DrumStatus } from '../../../../shared/models/drum.type';
import { DrumCardComponent } from '../drum-card/drum-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [DrumCardComponent, CommonModule],
  templateUrl: './kanban-column.html'
})
export class KanbanColumnComponent {
  @Input({ required: true }) status!: DrumStatus;
  @Input({ required: true }) drums: Drum[] = [];

  // Configuration for icons and colors based on status
  statusConfig: Record<string, { color: string, bg: string }> = {
    'IN PROGRESS': { color: 'text-orange-600', bg: 'bg-orange-50' },
    'WAITING APPROVAL': { color: 'text-blue-600', bg: 'bg-blue-50' },
    'WAITING EXPEDITION': { color: 'text-purple-600', bg: 'bg-purple-50' },
    'DONE': { color: 'text-emerald-600', bg: 'bg-emerald-50' }
  };
}