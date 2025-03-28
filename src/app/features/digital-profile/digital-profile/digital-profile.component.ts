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
} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';

declare var google: any;

@Component({
  selector: 'app-digital-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    // TranslateModule,
    FormsModule,
  ],
  templateUrl: './digital-profile.component.html',
  styleUrl: './digital-profile.component.scss',
})
export class DigitalProfileComponent {
  currentPage = 1;
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
    };
  }

  personalForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    idno: new FormControl(''),
    dob: new FormControl(''),
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
    village: new FormControl(''),
    ward: new FormControl(''),
    dependents: new FormControl(''),
  });

  uploadedFiles: { [key: string]: { file: File; previewUrl: string } | null } =
    {
      sassa: null,
      idDocument: null,
      payslip: null,
      municipal: null,
    };

  showMunicipalSection: boolean = false;

  constructor(private ngZone: NgZone) {}

  // changeLanguage(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   const language = target.value;
  //   this.translate.use(language);
  //   sessionStorage.setItem('language', language);
  // }

  // ngAfterViewInit() {
  //   if (this.streetAddressInput?.nativeElement) {
  //     this.initAutocomplete();
  //   } else {
  //     console.error('Street address input element not found');
  //   }
  // }

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

    // Use the formatted address from the place object instead of nativeElement
    const streetAddress = place.formatted_address || '';

    this.addressForm.reset();

    this.addressForm.patchValue({
      streetAddress: streetAddress, // Use the formatted address
      address1: '', // Will be filled below
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
    if (this.currentPage === 1) {
      this.currentPage = 2;
      this.mobilePage = 1;
    } else if (this.currentPage === 2 && this.mobilePage === 2) {
      this.currentPage = 3;
    } else if (this.currentPage === 2) {
      this.currentPage = 3;
    }
  }
  previousPage() {
    if (this.currentPage === 2 && this.mobilePage === 1) {
      this.currentPage = 1;
    } else if (this.currentPage === 2) {
      this.currentPage = 1;
    } else if (this.currentPage === 3) {
      this.currentPage = 2;
      this.mobilePage = 1;
    }
  }

  nextMobilePage() {
    this.mobilePage = 2;
  }
  prevMobilePage() {
    this.mobilePage = 1;
  }

  submitForm() {
    const formData = {
      ...this.personalForm.value,
      ...this.addressForm.value,
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
}
