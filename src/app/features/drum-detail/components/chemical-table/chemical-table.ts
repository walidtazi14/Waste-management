import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrumContent } from '../../../../shared/models/drum.type';
import { WasteCode } from '../../../../shared/models/chemical.type';
import { ChemicalSearch } from '../../../../shared/components/chemical-search/chemical-search';

@Component({
  selector: 'app-chemical-table',
  standalone: true,
  imports: [ChemicalSearch],
  templateUrl: './chemical-table.html'
})
export class ChemicalTable {
  @Input({ required: true }) chemicals: DrumContent[] = [];
  @Output() chemicalsChange = new EventEmitter<DrumContent[]>();

  addChemical() {
    const nextId = this.chemicals.length > 0 ? Math.max(...this.chemicals.map(c => c.Chemical.id)) + 1 : 1;
    const newContent: DrumContent = {
      ChemicalId: nextId,
      qty: '1',
      size: '',
      nfpa: '',
      Chemical: {
        id: nextId,
        name: '',
        state: '',
        wasteCode: { code: '', Class: '', subclass: '', group: '' }
      }
    };
    this.chemicalsChange.emit([...this.chemicals, newContent]);
  }

  removeChemical(id: number) {
    const updated = this.chemicals.filter(c => c.Chemical.id !== id);
    this.chemicalsChange.emit(updated);
  }

  // We updated this to take a string value directly
  updateChemical(id: number, field: string, value: string) {
    const updated = this.chemicals.map(c => {
      if (c.Chemical.id === id) {
        if (field === 'name' || field === 'state') {
          return { ...c, Chemical: { ...c.Chemical, [field]: value } };
        }
        if (field === 'wasteCode') {
          return { ...c, Chemical: { ...c.Chemical, wasteCode: { ...c.Chemical.wasteCode, code: value } } };
        }
        return { ...c, [field]: value };
      }
      return c;
    });
    this.chemicalsChange.emit(updated);
  }

  // NEW METHOD: When the dropdown makes a selection, auto-fill both fields
  onChemicalSelected(id: number, selection: any) {
    const updated = this.chemicals.map(c =>
      c.Chemical.id === id ? {
        ...c,
        Chemical: {
          ...c.Chemical,
          name: selection.name,
          wasteCode: selection.wasteCode || { code: selection.wasteCodes || '', Class: '', subclass: '', group: '' }
        }
      } : c
    );
    this.chemicalsChange.emit(updated);
  }
}