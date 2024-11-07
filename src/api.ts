import axios from 'axios';
import { SandboxResponse, DirectoryResponse, CompanyDetails, EmploymentInfo, IndividualInfo } from './types';

export const createSandbox = async (providerId: string): Promise<SandboxResponse> => {
    const response = await axios.post<SandboxResponse>(`/api/sandbox/create`, {
        provider_id: providerId,
        products: ["company", "directory", "individual", "employment"],
    });
    console.log("token ", response.data)
    return response.data;
};

export const fetchEmployeeDirectory = async (accessToken: string): Promise<DirectoryResponse> => {
    const response = await axios.get<DirectoryResponse>(`/api/employer/directory`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

// Function to fetch individual information based on individual ID
export const fetchIndividualInfo = async (accessToken: string, individualId: string): Promise<IndividualInfo> => {
    const response = await axios.post(`api/employer/individual`, {
        requests: [{ individual_id: individualId }],
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data.responses[0].body; // Access the first response
};


// Add a new function to fetch company information
export const fetchCompanyInfo = async (accessToken: string): Promise<CompanyDetails> => {
    const response = await axios.get<CompanyDetails>(`api/employer/company`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};

// Function to fetch employment information based on individual ID
export const fetchEmploymentInfo = async (accessToken: string, individualId: string): Promise<EmploymentInfo> => {
    const response = await axios.post(`api/employer/employment`, {
        requests: [{ individual_id: individualId }],
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data.responses[0].body; // Access the first response
};