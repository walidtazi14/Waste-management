import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Drum } from '../../../../shared/models/drum.type';

@Component({
  selector: 'app-drum-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './drum-form.html'
})
export class DrumForm implements OnChanges {
  @Input({ required: true }) drum!: Drum;
  @Output() formChange = new EventEmitter<Partial<Drum>>();

  drumForm: FormGroup;

  // Options for dropdowns
  sizes = ['5', '14', '20', '30', '55'];
  types = ['DF', 'DM', 'DP', 'CF', 'Poly', 'Steel'];
  statuses = ['IN PROGRESS', 'WAITING APPROVAL', 'WAITING EXPEDITION', 'DONE'];

  constructor(private fb: FormBuilder) {
    this.drumForm = this.fb.group({
      status: [''],
      generator: [''],
      address: [''],
      epaId: [''],
      drumSize: [''],
      drumType: [''],
      psn: [''],
      unNumber: [''],
      hazardClass: [''],
      pg: [''],
      treatmentCode: ['']
    });

    // Listen to form changes and emit them up to the parent
    this.drumForm.valueChanges.subscribe(value => {
      this.formChange.emit({
        status: value.status,
        generator: value.generator,
        drumSize: value.drumSize,
        treatmentCode: value.treatmentCode
      });
    });
  }

  // When the input 'drum' changes, patch the form with the new values
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['drum'] && changes['drum'].currentValue) {
      this.drumForm.patchValue({
        status: this.drum.status,
        generator: this.drum.generator,
        drumSize: this.drum.drumSize,
        treatmentCode: this.drum.treatmentCode
      }, { emitEvent: false });
    }
  }
}