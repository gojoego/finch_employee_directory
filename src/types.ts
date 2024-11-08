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
        type: 'non_profit'; 
        subtype?: string; 
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
    line2?: string; 
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
    dob: string; 
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
        line2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    income: {
        unit: string; 
        amount: number; 
        currency: string; 
        effective_date: string; 
    };
    income_history: IncomeHistory[]; 
    custom_fields: CustomField[]; 
}

export interface DirectoryResponse {
    paging: {
        count: number;
        offset: number;
    };
    individuals: Employee[]; 
}

export interface Employee {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    is_active: boolean;
}

export interface IncomeHistory {
    unit: string; 
    amount: number; 
    currency: string; 
    effective_date: string; 
}

export interface CustomField {
    name: string;
    value: string;
}
