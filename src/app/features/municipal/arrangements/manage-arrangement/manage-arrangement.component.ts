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
// import { TranslateModule, TranslateService } from '@ngx-translate/core';

declare var google: any;

@Component({
  selector: 'app-create-arrangement',
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
  templateUrl: './manage-arrangement.component.html',
  styleUrl: './manage-arrangement.component.scss',
})
export class ManageArrangementComponent {
  currentPage = 1;
  isAddingMember: boolean = false;
  isHouseholdFormEnabled: boolean = false;
  @ViewChild('streetAddressInput')
  set streetAddressInput(element: ElementRef) {
    if (element) {
      this.initAutocomplete(element.nativeElement);
    }
  }
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

  initAutocomplete(element: HTMLElement) {
    try {
      if (typeof google === 'undefined' || !google.maps) {
        console.error('Google Maps JavaScript API not loaded');
        return;
      }

      this.autocomplete = new google.maps.places.Autocomplete(element, {
        types: ['geocode'],
        componentRestrictions: { country: 'ZA' },
        fields: ['address_components', 'formatted_address'],
      });

      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          try {
            const place = this.autocomplete.getPlace();
            console.log('Place selected:', place); // Debug log
            if (!place.address_components) {
              console.error('No address components available');
              return;
            }
            this.fillAddressFields(place);
          } catch (error) {
            console.error('Error processing place selection:', error);
          }
        });
      });
    } catch (error) {
      console.error('Error initializing autocomplete:', error);
    }
  }

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
  maxMobilePages = 7;
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
