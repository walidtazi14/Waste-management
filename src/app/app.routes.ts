import { Routes } from '@angular/router';
import { KanbanShell } from './features/kanban/kanban-shell/kanban-shell';
import { DrumDetailShell } from './features/drum-detail/drum-detail-shell/drum-detail-shell';
import { ChemicalList } from './features/chemical-list/chemical-list';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: KanbanShell },
  { path: 'drum/:id', component: DrumDetailShell },
  { path: 'chemicals', component: ChemicalList }
];