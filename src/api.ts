import axios from 'axios';
import { SandboxResponse, DirectoryResponse, CompanyInfo, EmploymentInfo, IndividualInfo } from './types';

export const createSandbox = async (providerId: string): Promise<SandboxResponse> => {
    try {
        const response = await axios.post<SandboxResponse>(`/api/sandbox/create`, {
            provider_id: providerId,
            products: ["company", "directory", "individual", "employment"],
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error; 
    }
};

export const fetchEmployeeDirectory = async (accessToken: string): Promise<DirectoryResponse> => {
    try {
        const response = await axios.get<DirectoryResponse>(`/api/employer/directory`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const fetchIndividualInfo = async (accessToken: string, individualId: string): Promise<IndividualInfo> => {
    try {
        const response = await axios.post(`api/employer/individual`, {
            requests: [{ individual_id: individualId }],
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data.responses[0].body; // Access the first response
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const fetchCompanyInfo = async (accessToken: string): Promise<CompanyInfo> => {
    try {
        const response = await axios.get<CompanyInfo>(`api/employer/company`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Function to fetch employment information based on individual ID
export const fetchEmploymentInfo = async (accessToken: string, individualId: string): Promise<EmploymentInfo> => {
    try {
        const response = await axios.post(`api/employer/employment`, {
            requests: [{ individual_id: individualId }],
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data.responses[0].body; // Access the first response
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
        // Check for specific status codes or error conditions
        if (error.response?.status === 404) {
            console.error("The requested endpoint is not implemented by the provider.");
            throw new Error("The requested endpoint is not implemented by the provider.");
        } else {
            console.error("An error occurred while fetching data.");
            throw new Error("An error occurred while fetching data.");
        }
    }
    console.error("An unexpected error occurred.");
    throw new Error("An unexpected error occurred.");
};
