import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

const CHEMICAL_DATABASE = [
  { name: 'calcium carbide', code: 'RD4.3 gr I' },
  { name: 'sodium borohydride', code: 'RD4.3 gr I' },
  { name: 'sodium cyano borohydride', code: 'RD4.3 (6,1) gr II' },
  { name: 'calcium hydride', code: 'RD4.3' },
  { name: 'aluminum nitride', code: 'RD4.3 (8)' },
  { name: 'strontium powder', code: 'RD4.3 gr II' },
  { name: 'zinc phosphide', code: 'R 4.3 (6.1)' },
  { name: 'trityl chloride', code: 'RA8 gr II' },
  { name: 'thionyl chloride', code: '8 gr II' },
  { name: 'acetyl chloride', code: '3 (8) gr II' },
  { name: 'metallic hydride debrits', code: 'RD4.3' },
  { name: 'potassium borohydride', code: 'RD4.3' },
  { name: 'sodium hydride', code: 'RD4.3' },
  { name: 'zinc powder in oil', code: 'LA99H 4.3' },
  { name: 'Vitride (sodium bis(2-methoxyethoxy)aluminum hydride)', code: 'RD 4.3(3)' },
  { name: 'pyridine', code: '3 gr II' },
  { name: 'phosphorus trichloride', code: 'RA I B 1809' },
  { name: 'isobutyl chloroformate', code: 'I B 3489' },
  { name: 'phenyl chloroformate', code: 'C6.1 8' },
  { name: 'lithium aluminum hydride', code: '4.3 gr I' },
  { name: 'magnesium powder', code: '4.3 (4.2) gr II' },
  { name: 'sodium cyanide', code: '6.1 gr I' },
  { name: '1 butanethiol', code: '3 gr II' },
  { name: 'tungsten hexacarbonyl', code: 'C 6.1 Gr III' },
  { name: 'vanadium', code: 'RD4.1' },
  { name: 'valyric bromide', code: '8 (6.1) Gr I' }
];

@Component({
  selector: 'app-chemical-search',
  standalone: true,
  templateUrl: './chemical-search.html'
})
export class ChemicalSearch {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() chemicalSelected = new EventEmitter<{name: string, wasteCodes: string}>();

  isOpen = false;
  filteredChemicals: {name: string, code: string}[] = [];

  constructor(private eRef: ElementRef) {}

  onInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.value = query;
    this.valueChange.emit(query);

    if (query.length > 1) {
      const lowerQuery = query.toLowerCase();
      this.filteredChemicals = CHEMICAL_DATABASE.filter(c =>
        c.name.toLowerCase().includes(lowerQuery)
      );
      this.isOpen = this.filteredChemicals.length > 0;
    } else {
      this.isOpen = false;
      this.filteredChemicals = [];
    }
  }

  selectChemical(chem: {name: string, code: string}) {
    this.value = chem.name;
    this.isOpen = false;
    this.valueChange.emit(this.value);

    // Emit the full selection so the parent can auto-fill the waste code
    this.chemicalSelected.emit({ name: chem.name, wasteCodes: chem.code });
  }

  // Close dropdown if user clicks elsewhere on the screen
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}