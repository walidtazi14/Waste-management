import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrumContent } from '../../../../shared/models/drum.type';
import { WasteCode } from '../../../../shared/models/chemical.type';
import { ChemicalSearch } from '../../../../shared/components/chemical-search/chemical-search';

@Component({
  selector: 'app-chemical-table',
  standalone: true,
  imports: [ChemicalSearch, CommonModule],
  templateUrl: './chemical-table.html'
})
export class ChemicalTable {
  @Input({ required: true }) chemicals: DrumContent[] = [];
  @Output() chemicalsChange = new EventEmitter<DrumContent[]>();

  addChemical() {
    const nextId = this.chemicals.length > 0 ? Math.max(...this.chemicals.map(c => c.chemical.id)) + 1 : 1;
    const newContent: DrumContent = {
      chemicalId: nextId,
      qty: '1',
      size: '',
      nfpa: '',
      chemical: {
        id: nextId,
        name: '',
        state: '',
        wasteCode: { code: '', class: '', subclass: '', group: '' }
      }
    };
    this.chemicalsChange.emit([...this.chemicals, newContent]);
  }

  removeChemical(id: number) {
    const updated = this.chemicals.filter(c => c.chemical.id !== id);
    this.chemicalsChange.emit(updated);
  }

  // We updated this to take a string value directly
  updateChemical(id: number, field: string, value: string) {
    const updated = this.chemicals.map(c => {
      if (c.chemical.id === id) {
        if (field === 'name' || field === 'state') {
          return { ...c, chemical: { ...c.chemical, [field]: value } };
        }
        if (field === 'wasteCode') {
          return { ...c, chemical: { ...c.chemical, wasteCode: { ...c.chemical.wasteCode, code: value } } };
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
      c.chemical.id === id ? {
        ...c,
        chemical: {
          ...c.chemical,
          name: selection.name,
          wasteCode: selection.wasteCode || { code: selection.wasteCodes || '', class: '', subclass: '', group: '' }
        }
      } : c
    );
    this.chemicalsChange.emit(updated);
  }

  isRowInvalid(index: number): boolean {
    if (this.chemicals.length === 0) return false;

    const base = this.chemicals[0];
    const current = this.chemicals[index];

    const baseCode = base.chemical.wasteCode;
    const currentCode = current.chemical.wasteCode;

    if (!baseCode?.class || !currentCode?.class) return false;

    // 1. Class must match base
    if (currentCode.class !== baseCode.class) {
      return true;
    }

    // 2. Subclass logic
    if (baseCode.subclass) {
      // Base has subclass: current must match it or be empty
      if (currentCode.subclass && currentCode.subclass !== baseCode.subclass) {
        return true;
      }
    } else {
      // Base has no subclass: current must have no subclass
      if (currentCode.subclass) {
        return true;
      }
    }

    return false;
  }
}