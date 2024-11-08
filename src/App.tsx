import React, { useEffect, useState } from 'react';
import { createSandbox, fetchEmployeeDirectory, fetchCompanyInfo, fetchEmploymentInfo, fetchIndividualInfo } from './api';
import EmployeeList from './components/EmployeeList';
import EmploymentInfo from './components/EmploymentInfo';
import IndividualInfo from './components/PersonalInfo';
import DropdownMenu from './components/DropdownMenu';
import { Employee, EmploymentInfo as EmploymentInfoType, IndividualInfo as IndividualInfoType, DirectoryResponse } from './types';
import CompanyInfo from './components/CompanyInfo';

const App: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string>('');
    const [selectedProvider, setSelectedProvider] = useState<string>();
    const [companyInfo, setCompanyInfo] = useState<any>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [individualInfo, setIndividualInfo] = useState<IndividualInfoType | null>(null);
    const [employmentInfo, setEmploymentInfo] = useState<EmploymentInfoType | null>(null);
    const [companyError, setCompanyError] = useState<string | null>(null); // New state for company errors
    const [employeeError, setEmployeeError] = useState<string | null>(null); // New state for employee errors

    const handleSelectProvider = (id: string) => {
        setSelectedProvider(id);
        setCompanyError(null);
        setEmployeeError(null);
    };

    const handleCreateToken = async (id: string) => {
        setCompanyError(null); 
        setEmployeeError(null);
        try {
            const tokenResponse = await createSandbox(id);
            setAccessToken(tokenResponse.access_token); 
            fetchData(tokenResponse.access_token);
        } catch (error) {
            setCompanyError("Failed to create sandbox or invalid provider ID."); 
            console.error("Error creating sandbox:", error);
        }
    };

    const fetchData = async (token: string) => {
        setLoading(true);
        setCompanyError(null); // Clear previous company errors
        setEmployeeError(null); // Clear previous employee errors

        // Fetch company data
        try {
            const companyData = await fetchCompanyInfo(token);
            setCompanyInfo(companyData);
        } catch (error) {
            setCompanyError("Error fetching company data."); // Set company error message
            console.error("Error fetching company data:", error);
        }

        // Fetch employee data
        try {
            const employeeData: DirectoryResponse = await fetchEmployeeDirectory(token);
            setEmployees(employeeData.individuals);
        } catch (error) {
            setEmployeeError("Error fetching employee data."); // Set employee error message
            console.error("Error fetching employee data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedProvider) {
            const storedToken = localStorage.getItem(`access_token_${selectedProvider}`);
            if (storedToken) {
                setAccessToken(storedToken);
                fetchData(storedToken);
            }
        }
    }, [selectedProvider]);

    useEffect(() => {
        const getIndividualAndEmploymentInfo = async () => {
            if (selectedEmployeeId) {
                setCompanyError(null); 
                setEmployeeError(null);
                try {
                    const individualData = await fetchIndividualInfo(accessToken, selectedEmployeeId);
                    setIndividualInfo(individualData);

                    const employmentData = await fetchEmploymentInfo(accessToken, selectedEmployeeId);
                    setEmploymentInfo(employmentData);
                } catch (error) {
                    setEmployeeError("Error fetching individual or employment info.");
                    console.error('Error fetching individual or employment info:', error);
                }
            }
        };

        getIndividualAndEmploymentInfo();
    }, [selectedEmployeeId]);

    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column', padding: '40px' }}>
          <DropdownMenu onSelectProvider={handleSelectProvider} onCreateToken={handleCreateToken} />
          
          {companyError && <p style={{ color: 'red' }}>{companyError}</p>} {/* Company error message */}
          {employeeError && <p style={{ color: 'red' }}>{employeeError}</p>} {/* Employee error message */}
  
          {loading && <p>Loading...</p>} {/* Loading state message */}
  
          {!loading && (
              <>
                  {companyInfo && !companyError ? ( // Check if companyInfo exists and no error occurred
                      <CompanyInfo {...companyInfo} />
                  ) : (
                      <p>No company information available.</p>
                  )}
  
                  <div style={{ flex: 1, marginRight: '20px' }}>
                      {employees.length > 0 ? (
                          <EmployeeList employees={employees} onSelectEmployee={setSelectedEmployeeId} />
                      ) : (
                          <p>No employees found.</p>
                      )}
                  </div>
                  
                  {individualInfo && Object.keys(individualInfo).length > 0 && <IndividualInfo {...individualInfo} />}
                  {employmentInfo && Object.keys(employmentInfo).length > 0 && <EmploymentInfo {...employmentInfo} />}
              </>
          )}
      </div>
  );
}

export default App;
