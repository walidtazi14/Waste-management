import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DrumService } from '../../../shared/services/drum';
import { Drum, DrumStatus } from '../../../shared/models/drum.type';
import { KanbanColumnComponent } from '../components/kanban-column/kanban-column';

@Component({
  selector: 'app-kanban-shell',
  standalone: true,
  imports: [KanbanColumnComponent, AsyncPipe],
  templateUrl: './kanban-shell.html'
})
export class KanbanShell {
  private drumService = inject(DrumService);
  drums$ = this.drumService.drums$;

  statuses: DrumStatus[] = ['IN PROGRESS', 'WAITING APPROVAL', 'WAITING EXPEDITION', 'DONE'];

  getDrumsByStatus(status: DrumStatus, drums: Drum[] | null): Drum[] {
    if (!drums) return [];
    return drums.filter(d => d.status === status);
  }
}