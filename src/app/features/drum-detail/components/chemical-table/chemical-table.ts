import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chemical } from '../../../../shared/models/chemical.type';
import { ChemicalSearch } from '../../../../shared/components/chemical-search/chemical-search';

@Component({
  selector: 'app-chemical-table',
  standalone: true,
  imports: [ChemicalSearch], // <--- ADD THIS HERE
  templateUrl: './chemical-table.html'
})
export class ChemicalTable {
  @Input({ required: true }) chemicals: Chemical[] = [];
  @Output() chemicalsChange = new EventEmitter<Chemical[]>();

  addChemical() {
    const nextId = this.chemicals.length > 0 ? Math.max(...this.chemicals.map(c => c.id)) + 1 : 1;
    const newChemical: Chemical = {
      id: nextId, name: '', qty: '1', size: '', slg: '', ox: '', nfpa: '', wasteCodes: ''
    };
    this.chemicalsChange.emit([...this.chemicals, newChemical]);
  }

  removeChemical(id: number) {
    const updated = this.chemicals.filter(c => c.id !== id);
    this.chemicalsChange.emit(updated);
  }

  // We updated this to take a string value directly
  updateChemical(id: number, field: keyof Chemical, value: string) {
    const updated = this.chemicals.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    );
    this.chemicalsChange.emit(updated);
  }

  // NEW METHOD: When the dropdown makes a selection, auto-fill both fields
  onChemicalSelected(id: number, selection: {name: string, wasteCodes: string}) {
    const updated = this.chemicals.map(c =>
      c.id === id ? { ...c, name: selection.name, wasteCodes: selection.wasteCodes } : c
    );
    this.chemicalsChange.emit(updated);
  }
}