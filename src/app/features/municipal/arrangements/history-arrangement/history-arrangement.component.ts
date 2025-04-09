import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

@Component({
  selector: 'app-history-arrangement',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // TranslateModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './history-arrangement.component.html',
  styleUrl: './history-arrangement.component.scss',
})
export class HistoryArrangementComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  currentPage = 1;
  isAddingMember: boolean = false;
  isHouseholdFormEnabled: boolean = false;
  autocomplete: any;
  language: string = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  get form() {
    return {
      ...this.addressForm.controls,
      ...this.municipalForm.controls,
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  personalForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    idno: new FormControl(''),
    dob: new FormControl(''),
    iddate: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    telephone: new FormControl(''),
    address: new FormControl(''),
  });

  addressForm = new FormGroup({
    streetAddress: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    address3: new FormControl(''),
    postalAddress: new FormControl(''),
  });

  municipalForm = new FormGroup({
    municipalAccount1: new FormControl(''),
    municipalAccount2: new FormControl(''),
    munAccNo: new FormControl(''),
    village: new FormControl(''),
    ward: new FormControl(''),
    dependents: new FormControl(''),
    salary: new FormControl(''),
    employed: new FormControl(''),
    epwpEmploy: new FormControl(''),
    remarks: new FormControl(''),
  });

  householdForm = new FormGroup({
    idno: new FormControl({ value: '', disabled: true }, [Validators.required]),
    names: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    surname: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    dob: new FormControl({ value: '', disabled: true }, [Validators.required]),
    employed: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    contactNo: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
  });

  uploadedFiles: { [key: string]: { file: File; previewUrl: string } | null } =
    {
      sassa: null,
      idDocument: null,
      payslip: null,
      municipal: null,
    };

  showMunicipalSection: boolean = false;

  constructor(private ngZone: NgZone, private router: Router) {}

  fillAddressFields(place: any) {
    if (!place) return;

    const streetAddress = place.formatted_address || '';

    this.addressForm.reset();

    this.addressForm.patchValue({
      streetAddress: streetAddress,
      address1: '',
      address2: '',
      address3: '',
      postalAddress: '',
    });

    let streetNumber = '';
    let route = '';
    let locality = '';
    let administrativeAreaLevel1 = '';
    let postalCode = '';
    let country = '';

    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number':
          streetNumber = component.long_name;
          break;
        case 'route':
          route = component.long_name;
          break;
        case 'locality':
          locality = component.long_name;
          break;
        case 'administrative_area_level_1':
          administrativeAreaLevel1 = component.long_name;
          break;
        case 'postal_code':
          postalCode = component.long_name;
          break;
        case 'country':
          country = component.long_name;
          break;
      }
    }

    const address1 = streetNumber ? `${streetNumber} ${route}` : route;
    const address2 = locality;
    const address3 = administrativeAreaLevel1;
    const postalAddress = postalCode;

    this.addressForm.patchValue({
      address1: address1,
      address2: address2,
      address3: address3,
      postalAddress: postalAddress,
    });
  }

  mobilePage = 1;
  nextPage() {
    this.router.navigate(['/manage-arrangement']);
  }

  previousPage() {
    if (this.currentPage === 2) {
      this.currentPage = 1;
      this.mobilePage = 1;
    } else if (this.currentPage === 3) {
      this.currentPage = 2;
      this.mobilePage = 1;
    }
  }

  nextMobilePage() {
    if (this.mobilePage < 3) {
      this.mobilePage++;
    }
  }

  prevMobilePage() {
    if (this.mobilePage > 1) {
      this.mobilePage--;
    }
  }

  submitForm() {
    const formData = {
      ...this.personalForm.value,
      ...this.addressForm.value,
      ...this.municipalForm.value,
    };
    console.log('Form submitted:', formData);
  }

  showDocCard: { [key: string]: boolean } = {
    sassa: false,
    idDocument: false,
    payslip: false,
    municipal: false,
  };

  triggerFileInput(id: string) {
    document.getElementById(id)?.click();
  }

  isImage(file: File): boolean {
    return file.type.match('image.*') !== null;
  }

  toggleDocCard(docType: string): void {
    this.showDocCard[docType] = !this.showDocCard[docType];
  }

  closeDocCard(docType: string): void {
    this.showDocCard[docType] = false;
  }

  deleteDocument(docType: string): void {
    this.uploadedFiles[docType] = null;
    this.showDocCard[docType] = false;
  }

  handleFileInput(event: Event, documentType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.uploadedFiles[documentType] = {
          file: file,
          previewUrl: this.isImage(file) ? e.target.result : '',
        };
        this.showDocCard[documentType] = false;
      };

      if (this.isImage(file)) {
        reader.readAsDataURL(file);
      } else {
        this.uploadedFiles[documentType] = {
          file: file,
          previewUrl: '',
        };
        this.showDocCard[documentType] = false;
      }
    }
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';

    const names = fullName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  }

  isFormActive: boolean = false;
  enableHouseholdForm() {
    this.isEditMode = false; // Reset edit mode when adding new
    this.householdForm.enable();
    this.isFormActive = true;
    this.householdForm.reset();
    this.householdForm.updateValueAndValidity();
  }

  addHouseholdMember() {
    if (this.householdForm.valid) {
      if (this.isEditMode) {
        // Update existing member logic
        console.log('Member updated:', this.householdForm.value);
      } else {
        // Add new member logic
        console.log('Member added:', this.householdForm.value);
      }
      this.householdForm.reset();
      this.householdForm.disable();
      this.isFormActive = false;
      this.isEditMode = false;
    }
  }
  deleteMember() {}

  isEditMode: boolean = false;
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.householdForm.enable();
      this.isFormActive = true;
    } else {
      this.householdForm.disable();
      this.isFormActive = false;
    }
    this.householdForm.updateValueAndValidity();
  }
}
