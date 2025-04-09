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

@Component({
  selector: 'app-accounts',
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
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  currentPage = 1;
  isAddingMember: boolean = false;
  isHouseholdFormEnabled: boolean = false;
  @ViewChild('streetAddressInput')
  autocomplete: any;
  language: string = '';

  get form() {
    return {
      ...this.addressForm.controls,
      ...this.municipalForm.controls,
    };
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

  mobilePage = 1;
  maxMobilePages = 4;
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
    if (this.mobilePage < this.maxMobilePages) {
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
