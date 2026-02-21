import { Component, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// --- Types & Interfaces ---

interface Product {
  id: number;
  name: string;
  qty: string;
  size: string;
  slg: string;
  ox: string;
  nfpa: string;
  wasteCodes: string;
}

interface HeaderInfo {
  drumId: string;
  status: string;
  treatmentCode: string;
  generator: string;
  address: string;
  epaId: string;
  drumSize: string;
  drumType: string;
  psn: string;
  unNumber: string;
  hazardClass: string;
  pg: string;
  oxidizer: string;
  nfpaClass: string;
}

interface DrumList {
  id: string;
  headerInfo: HeaderInfo;
  products: Product[];
  updatedAt: string;
}

interface SearchState {
  id: number | null;
  query: string;
}

// --- Predefined Constants ---

const DRUM_SIZES = ['5', '14', '20', '30', '55'];

const DRUM_TYPES = [
  { code: 'DF', label: 'Fiber (DF)' },
  { code: 'DM', label: 'Metal (DM)' },
  { code: 'DP', label: 'Plastic (DP)' },
  { code: 'CF', label: 'Carton (CF)' }
];

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

const STATUS_OPTIONS = [
  { id: 'in_progress', label: 'In progress', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'waiting_approval', label: 'Waiting approval', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'waiting_expedition', label: 'Waiting expedition', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'done', label: 'Done', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
];

const API_KEY = ""; // Environment provided key

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 // Signals
  currentView = signal<'dashboard' | 'editor'>('dashboard');
  selectedListId = signal<string | null>(null);
  activeSearch = signal<SearchState>({ id: null, query: '' });
  isAiLoading = signal<boolean>(false);
  aiError = signal<string | null>(null);

  // Constants
  drumSizes = DRUM_SIZES;
  drumTypes = DRUM_TYPES;
  statusOptions = STATUS_OPTIONS;

  lists = signal<DrumList[]>([
    {
      id: '588239-106',
      headerInfo: {
        drumId: '588239-106',
        status: 'in_progress',
        treatmentCode: 'LRCTD',
        generator: 'CRI Environnement',
        address: '75 Rue Du Progres Coteau-Du-Lac, QC J0P 1B0 CA',
        epaId: 'N/A',
        drumSize: '55',
        drumType: 'DF',
        psn: 'Water-reactive solid, toxic, N.O.S',
        unNumber: 'UN 3134',
        hazardClass: 'Class 4.3 (6)',
        pg: 'PG I',
        oxidizer: 'No',
        nfpaClass: 'N/A'
      },
      products: [
        { id: 1, name: 'calcium carbide', qty: '2', size: '2,5 kg', slg: 'g', ox: '', nfpa: '', wasteCodes: 'RD4.3 gr I' },
        { id: 2, name: 'sodium borohydride', qty: '1', size: '500g', slg: 'p', ox: '', nfpa: '', wasteCodes: 'RD4.3 gr I' },
      ],
      updatedAt: new Date().toLocaleDateString()
    }
  ]);

  // Computed
  activeList = computed(() => this.lists().find(l => l.id === this.selectedListId()));

  filteredChemicals = computed(() => {
    const query = this.activeSearch().query.toLowerCase();
    if (query.length <= 1) return [];
    return CHEMICAL_DATABASE.filter(c => c.name.toLowerCase().includes(query));
  });

  // Methods
  createNewList() {
    const newId = `DRUM-${Math.floor(100000 + Math.random() * 900000)}`;
    const newList: DrumList = {
      id: newId,
      headerInfo: {
        drumId: newId,
        status: 'in_progress',
        treatmentCode: 'LRCTD',
        generator: '',
        address: '',
        epaId: 'N/A',
        drumSize: '55',
        drumType: 'DF',
        psn: '',
        unNumber: '',
        hazardClass: '',
        pg: '',
        oxidizer: '',
        nfpaClass: ''
      },
      products: [],
      updatedAt: new Date().toLocaleDateString()
    };
    this.lists.update(l => [...l, newList]);
    this.selectedListId.set(newId);
    this.currentView.set('editor');
  }

  deleteList(id: string) {
    this.lists.update(l => l.filter(item => item.id !== id));
  }

  openList(id: string) {
    this.selectedListId.set(id);
    this.currentView.set('editor');
  }

  goBack() {
    this.currentView.set('dashboard');
  }

  getListsByStatus(status: string) {
    return this.lists().filter(l => l.headerInfo.status === status);
  }

  getStatusColor(statusId: string): string {
    return this.statusOptions.find(s => s.id === statusId)?.color || 'bg-slate-100 text-slate-700';
  }

  getStatusLabel(statusId: string): string {
     return this.statusOptions.find(s => s.id === statusId)?.label || statusId;
  }

  updateListHeader<K extends keyof HeaderInfo>(field: K, value: any) {
    const id = this.selectedListId();
    if (!id) return;

    this.lists.update(lists => lists.map(list => {
      if (list.id === id) {
        return {
          ...list,
          headerInfo: { ...list.headerInfo, [field]: value },
          updatedAt: new Date().toLocaleDateString()
        };
      }
      return list;
    }));
  }

  updateProduct(productId: number, field: keyof Product, value: string) {
    const listId = this.selectedListId();
    if (!listId) return;

    this.lists.update(lists => lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          products: list.products.map(p =>
            p.id === productId ? { ...p, [field]: value } : p
          ),
          updatedAt: new Date().toLocaleDateString()
        };
      }
      return list;
    }));

    if (field === 'name') {
      this.activeSearch.set({ id: productId, query: value });
    }
  }

  addProduct() {
    const listId = this.selectedListId();
    if (!listId) return;

    this.lists.update(lists => lists.map(list => {
      if (list.id === listId) {
        const nextId = list.products.length > 0 ? Math.max(...list.products.map(p => p.id)) + 1 : 1;
        return {
          ...list,
          products: [...list.products, { id: nextId, name: '', qty: '1', size: '', slg: '', ox: '', nfpa: '', wasteCodes: '' }],
          updatedAt: new Date().toLocaleDateString()
        };
      }
      return list;
    }));
  }

  removeProduct(productId: number) {
    const listId = this.selectedListId();
    if (!listId) return;

    this.lists.update(lists => lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          products: list.products.filter(p => p.id !== productId),
          updatedAt: new Date().toLocaleDateString()
        };
      }
      return list;
    }));
  }

  selectChemical(productId: number, chemical: { name: string, code: string }) {
    this.updateProduct(productId, 'name', chemical.name);
    this.updateProduct(productId, 'wasteCodes', chemical.code);
    this.activeSearch.set({ id: null, query: '' });
  }

  // --- AI Logic ---
  async callGemini(prompt: string, systemPrompt = "") {
    let retries = 0;
    const maxRetries = 5;
    while (retries <= maxRetries) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        if (!response.ok) throw new Error('API request failed');
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (err) {
        if (retries === maxRetries) throw err;
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
        retries++;
      }
    }
    return null;
  }

  async suggestWasteCode(productId: number, chemName: string) {
    if (!chemName) return;
    this.isAiLoading.set(true);
    this.aiError.set(null);
    try {
      const prompt = `Hazardous waste code for chemical: "${chemName}". Return ONLY the code (e.g., RD4.3).`;
      const code = await this.callGemini(prompt, "Waste specialist.");
      if (code) {
        this.updateProduct(productId, 'wasteCodes', code.trim());
      }
    } catch (err) {
      this.aiError.set("AI failed to suggest code.");
    } finally {
      this.isAiLoading.set(false);
    }
  }

  async autoClassifyDrum() {
    const listId = this.selectedListId();
    const list = this.lists().find(l => l.id === listId);
    if (!list || list.products.length === 0) return;

    this.isAiLoading.set(true);
    this.aiError.set(null);
    try {
      const productList = list.products.map(p => p.name).join(", ");
      const prompt = `Analyze this chemical list for a lab pack drum: [${productList}]. Return ONLY JSON: { "psn": "string", "unNumber": "string", "hazardClass": "string", "pg": "string" }.`;
      const resultText = await this.callGemini(prompt, "Hazardous waste specialist. Return JSON format only.");
      if (resultText) {
         const cleaned = resultText.replace(/```json|```/g, "").trim();
         const suggestion = JSON.parse(cleaned);
         this.lists.update(lists => lists.map(l => {
           if (l.id === listId) {
             return { ...l, headerInfo: { ...l.headerInfo, ...suggestion } };
           }
           return l;
         }));
      }
    } catch (err) {
      this.aiError.set("AI classification failed. Check your list.");
    } finally {
      this.isAiLoading.set(false);
    }
  }

  exportToCSV() {
    const list = this.activeList();
    if (!list) return;

    const headers = ["NO.", "CHEMICAL NAME", "QTY", "SIZE", "S/L/G", "Waste Codes"];
    const rows = list.products.map((p, i) => [i + 1, p.name, p.qty, p.size, p.slg, p.wasteCodes]);
    let csv = "data:text/csv;charset=utf-8,";
    csv += `Drum ID,${list.headerInfo.drumId}\nGenerator,${list.headerInfo.generator}\nStatus,${list.headerInfo.status}\n\n`;
    csv += headers.join(",") + "\n" + rows.map(r => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `Inventory_${list.headerInfo.drumId}.csv`;
    link.click();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Basic check: if activeSearch has an ID, we might need to close it if the click wasn't inside an input
    // For simplicity in a single file, we rely on the specific interaction logic or UI overlay
    // But since the search dropdown is tied to `activeSearch().id`, clicking elsewhere (e.g., dashboard background)
    // usually triggers other events or simply doesn't matter unless we click *another* input.
    // To strictly close on outside click, we'd need template refs.
    // Given the complexity of single-file ViewChild, we will just close if the user clicks a non-input element if desired,
    // but the React version attached a listener to document.

    if (!target.closest('.search-container')) {
      this.activeSearch.set({ id: null, query: '' });
    }
  }
}