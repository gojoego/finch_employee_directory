export interface Employee {
    id: string;
    first_name: string;
    middle_name?: string; 
    last_name: string;
    is_active: boolean;
}

export interface Provider {
    id: string;
    name: string; 
}

export interface SandboxResponse {
    payroll_provider_id: string;
    company_id: string;
    access_token: string;
    sandbox_time: {
        unix: number;
        calendar: string;
    };
}

export interface DirectoryResponse {
    paging: {
        count: number;
        offset: number;
    };
    individuals: Employee[];
}

export interface CompanyInfo {
    id: string;
    legal_name: string;
    entity: {
        type: 'non_profit'; // You can adjust this if you have other entity types
        subtype?: string; // Optional, can be null
    };
    ein: string;
    primary_email: string;
    primary_phone_number: string;
    departments: Department[];
    locations: Location[];
    accounts: Account[];
}

export interface Department {
    name: string;
    parent?: {
        name: string | null; // Optional parent name
    };
}

export interface Location {
    line1: string;
    line2?: string; // Optional
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface Account {
    institution_name: string;
    account_name?: string | null; // Optional account name
    account_number: string;
    account_type: string;
    routing_number: string;
}

export interface Email {
    data: string;
    type: string;
}

export interface PhoneNumber {
    data: string;
    type: string;
}

export interface Residence {
    line1: string;
    line2?: string; // Optional
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface IndividualInfo {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    preferred_name?: string | null;
    dob: string; // Date of birth
    emails: Email[];
    phone_numbers: PhoneNumber[];
    gender: string;
    ethnicity?: string | null;
    residence: Residence;
}

export interface EmploymentInfo {
    id: string;
    title: string;
    department: {
        name: string;
    };
    start_date: string;
    end_date?: string;
    is_active: boolean;
    class_code: string;
    location: {
        line1: string;
        line2?: string; // Optional
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    income: {
        unit: string; // e.g., "yearly"
        amount: number; // Amount in cents
        currency: string; // e.g., "USD"
        effective_date: string; // Date the income is effective
    };
    income_history: IncomeHistory[]; // Add this line
    custom_fields: CustomField[]; // Add this line
}

export interface DirectoryResponse {
    paging: {
        count: number;
        offset: number;
    };
    individuals: Employee[]; // Employee type should be defined if used
}

export interface Employee {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    is_active: boolean;
    // Add other fields as needed
}

export interface IncomeHistory {
    unit: string; // e.g., "yearly"
    amount: number; // Amount in cents
    currency: string; // e.g., "USD"
    effective_date: string; // Date the income was effective
}

export interface CustomField {
    name: string;
    value: string;
}
