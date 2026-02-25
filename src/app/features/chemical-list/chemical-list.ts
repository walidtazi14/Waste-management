import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChemicalService } from '../../shared/services/chemical';
import { Chemical } from '../../shared/models/chemical.type';

@Component({
  selector: 'app-chemical-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chemical-list.html'
})
export class ChemicalList implements OnInit {
  private chemicalService = inject(ChemicalService);
  private cdr = inject(ChangeDetectorRef);

  chemicals: Chemical[] = [];
  filteredChemicals: Chemical[] = [];
  searchTerm = '';

  ngOnInit() {
    this.chemicalService.getChemicals().subscribe(data => {
      this.chemicals = data;
      this.filteredChemicals = data;
      this.cdr.markForCheck();
    });
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = query;

    this.filteredChemicals = this.chemicals.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.wasteCode?.code.toLowerCase().includes(query)
    );
  }
}