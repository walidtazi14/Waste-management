import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DrumService } from '../../../shared/services/drum';
import { Drum, DrumContent } from '../../../shared/models/drum.type';
import { DrumForm } from '../components/drum-form/drum-form';
import { ChemicalTable } from '../components/chemical-table/chemical-table'; // We will build this next

@Component({
  selector: 'app-drum-detail-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, DrumForm, ChemicalTable],
  templateUrl: './drum-detail-shell.html'
})
export class DrumDetailShell implements OnInit {
  private route = inject(ActivatedRoute);
  private drumService = inject(DrumService);
  private cdr = inject(ChangeDetectorRef);

  drum: Drum | undefined;
  mappedChemicals: DrumContent[] = [];
  pendingChanges: Partial<Drum> = {};

  ngOnInit(): void {
    // 1. Grab the ID from the URL (e.g., /drum/DRM-1001 -> 'DRM-1001')
    const id = this.route.snapshot.paramMap.get('id');

    // 2. Fetch the drum from our service
    if (id) {
      this.drumService.getDrumById(id).subscribe(drum => {
        this.drum = drum;
        this.mappedChemicals = this.drum?.contents || (this.drum as any)?.Contents || [];
        this.cdr.markForCheck();
      });

    }
  }

  // 3. Receive changes from the form
  onFormChanged(updatedFields: Partial<Drum>) {
    this.pendingChanges = { ...this.pendingChanges, ...updatedFields };
  }
  onChemicalsChanged(updatedChemicals: DrumContent[]) {
    this.mappedChemicals = updatedChemicals;

    this.pendingChanges = { ...this.pendingChanges, contents: updatedChemicals };

    // Update local drum object so UI stays synced immediately
    if (this.drum) {
      this.drum.contents = updatedChemicals;
    }
  }

  // 4. Save logic (mocked for now)
  saveDrum() {
    if (this.drum) {
      this.drumService.updateDrum({ ...this.pendingChanges, id: this.drum.id }).subscribe(updatedDrum => {
        this.drum = updatedDrum;
        this.pendingChanges = {};
      });
    }
  }
}