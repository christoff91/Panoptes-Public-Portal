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
import { MatExpansionModule } from '@angular/material/expansion';
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

export interface Arrangement {
  id: number;
  reference: string;
  name: string;
  surname: string;
  idNumber: string;
  accountNumber: string;
  arrangementType: string;
  status: 'Active' | 'Closed' | 'Pending';
  dateCreated: Date;
  amount: number;
  contactNumber: string;
  email: string;
}
const ARRANGEMENT_DATA: Arrangement[] = [
  {
    id: 1,
    reference: 'ARR-2023-001',
    name: 'John',
    surname: 'Doe',
    idNumber: '8501011234081',
    accountNumber: '1002003001',
    arrangementType: 'Personal Loan',
    status: 'Active',
    dateCreated: new Date('2023-01-15'),
    amount: 25000,
    contactNumber: '0821234567',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    reference: 'ARR-2023-002',
    name: 'Jane',
    surname: 'Smith',
    idNumber: '9005051234082',
    accountNumber: '1002003002',
    arrangementType: 'Credit Card',
    status: 'Active',
    dateCreated: new Date('2023-02-20'),
    amount: 50000,
    contactNumber: '0839876543',
    email: 'jane.smith@example.com',
  },
  {
    id: 3,
    reference: 'ARR-2023-003',
    name: 'Robert',
    surname: 'Johnson',
    idNumber: '8808081234083',
    accountNumber: '1002003003',
    arrangementType: 'Home Loan',
    status: 'Pending',
    dateCreated: new Date('2023-03-10'),
    amount: 1500000,
    contactNumber: '0844567890',
    email: 'robert.j@example.com',
  },
  {
    id: 4,
    reference: 'ARR-2023-004',
    name: 'Sarah',
    surname: 'Williams',
    idNumber: '9202021234084',
    accountNumber: '1002003004',
    arrangementType: 'Vehicle Finance',
    status: 'Closed',
    dateCreated: new Date('2023-01-05'),
    amount: 350000,
    contactNumber: '0812345678',
    email: 'sarah.w@example.com',
  },
  {
    id: 5,
    reference: 'ARR-2023-005',
    name: 'Michael',
    surname: 'Brown',
    idNumber: '8707071234085',
    accountNumber: '1002003005',
    arrangementType: 'Personal Loan',
    status: 'Active',
    dateCreated: new Date('2023-04-18'),
    amount: 75000,
    contactNumber: '0856789012',
    email: 'michael.b@example.com',
  },
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
    MatExpansionModule,
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
  displayedColumns: string[] = [
    'reference',
    'name',
    'idNumber',
    'accountNumber',
    'arrangementType',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Arrangement>(ARRANGEMENT_DATA);

  getFullName(element: Arrangement): string {
    return `${element.name} ${element.surname}`;
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

  viewDetails(element: Arrangement): void {
    // Navigate to details page or open dialog
    console.log('View details:', element);
    this.router.navigate(['/manage-arrangement', element.id]);
  }

  cancelArrangement(element: Arrangement): void {
    // Implement cancellation logic
    console.log('Cancel arrangement:', element);
    // You might want to open a confirmation dialog here
  }
}
