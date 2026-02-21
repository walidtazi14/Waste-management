import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanShell } from './kanban-shell';

describe('KanbanShell', () => {
  let component: KanbanShell;
  let fixture: ComponentFixture<KanbanShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
