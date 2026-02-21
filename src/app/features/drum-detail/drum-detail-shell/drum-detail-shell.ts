import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DrumService } from '../../../shared/services/drum';
import { Drum } from '../../../shared/models/drum.type';
import { DrumForm } from '../components/drum-form/drum-form';
import { ChemicalTable } from '../components/chemical-table/chemical-table'; // We will build this next
import { Chemical } from '../../../shared/models/chemical.type';

@Component({
  selector: 'app-drum-detail-shell',
  standalone: true,
  imports: [RouterLink, DrumForm, ChemicalTable],
  templateUrl: './drum-detail-shell.html'
})
export class DrumDetailShell implements OnInit {
  private route = inject(ActivatedRoute);
  private drumService = inject(DrumService);

  drum: Drum | undefined;
  pendingChanges: Partial<Drum> = {};

  ngOnInit(): void {
    // 1. Grab the ID from the URL (e.g., /drum/DRM-1001 -> 'DRM-1001')
    const id = this.route.snapshot.paramMap.get('id');

    // 2. Fetch the drum from our service
    if (id) {
      this.drum = this.drumService.getDrumById(id);
    }
  }

  // 3. Receive changes from the form
  onFormChanged(updatedFields: Partial<Drum>) {
    this.pendingChanges = { ...this.pendingChanges, ...updatedFields };
  }
  onChemicalsChanged(updatedChemicals: Chemical[]) {
    this.pendingChanges = { ...this.pendingChanges, chemicals: updatedChemicals };

    // Update local drum object so UI stays synced immediately
    if (this.drum) {
      this.drum.chemicals = updatedChemicals;
    }
  }

  // 4. Save logic (mocked for now)
  saveDrum() {
    if (this.drum) {
      // In a real app, you'd call this.drumService.updateDrum(...) here
      console.log('Saving updates to DB:', this.pendingChanges);
      alert('Drum updated successfully!');
    }
  }
}