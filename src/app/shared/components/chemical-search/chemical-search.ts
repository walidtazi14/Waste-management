import { Component, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChemicalService } from '../../services/chemical';
import { Chemical, WasteCode } from '../../models/chemical.type';

@Component({
  selector: 'app-chemical-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chemical-search.html'
})
export class ChemicalSearch {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() chemicalSelected = new EventEmitter<{name: string, wasteCode: WasteCode}>();

  private chemicalService = inject(ChemicalService);

  isOpen = false;
  filteredChemicals: Chemical[] = [];

  constructor(private eRef: ElementRef) {}

  onInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.value = query;
    this.valueChange.emit(query);

    if (query.length > 1) {
      this.filteredChemicals = this.chemicalService.searchChemicals({ name: query });
      this.isOpen = this.filteredChemicals.length > 0;
      this.chemicalService.searchChemicals({ name: query }).subscribe(results => {
        this.filteredChemicals = results;
        this.isOpen = this.filteredChemicals.length > 0;
      });
    } else {
      this.isOpen = false;
      this.filteredChemicals = [];
    }
  }

  selectChemical(chem: Chemical) {
    this.value = chem.name;
    this.isOpen = false;
    this.valueChange.emit(this.value);

    // Emit the full selection so the parent can auto-fill the waste code
    this.chemicalSelected.emit({ name: chem.name, wasteCode: chem.wasteCode });
  }

  // Close dropdown if user clicks elsewhere on the screen
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}