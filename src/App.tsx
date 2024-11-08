import React, { useEffect, useState } from 'react';
import { createSandbox, fetchEmployeeDirectory, fetchCompanyInfo, fetchEmploymentInfo, fetchIndividualInfo } from './api';
import EmployeeList from './components/EmployeeList';
import EmploymentInfo from './components/EmploymentInfo';
import IndividualInfo from './components/PersonalInfo';
import DropdownMenu from './components/DropdownMenu';
import {
  Employee, EmploymentInfo as EmploymentInfoType,
  IndividualInfo as IndividualInfoType,
  DirectoryResponse,
} from './types';
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
  const [error, setError] = useState<string | null>(null); // New state for error messages

  const handleSelectProvider = (id: string) => {
    setSelectedProvider(id);
    setError(null); 
  };

  const handleCreateToken = async (id: string) => {
    setError(null); 
    try {
      const tokenResponse = await createSandbox(id);
      setAccessToken(tokenResponse.access_token); 
      fetchData(tokenResponse.access_token);
    } catch (error) {
      setError("Failed to create sandbox or invalid provider ID."); 
      console.error("Error creating sandbox:", error);
    }
  };

  const fetchData = async (token: string) => {
    setLoading(true);
    setError(null); 
    try {
      const companyData = await fetchCompanyInfo(token);
      setCompanyInfo(companyData);
      
      const employeeData: DirectoryResponse = await fetchEmployeeDirectory(token);
      setEmployees(employeeData.individuals); 
    } catch (error) {
      setError("Error fetching company or employee data."); 
      console.error("Error fetching data:", error);
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
        setError(null); 
        try {
          const individualData = await fetchIndividualInfo(accessToken, selectedEmployeeId);
          setIndividualInfo(individualData);

          const employmentData = await fetchEmploymentInfo(accessToken, selectedEmployeeId);
          setEmploymentInfo(employmentData);
        } catch (error) {
          setError("Error fetching individual or employment info.");
          console.error('Error fetching individual or employment info:', error);
        }
      }
    };

    getIndividualAndEmploymentInfo();
  }, [selectedEmployeeId]);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', padding: '40px' }}>
      <DropdownMenu onSelectProvider={handleSelectProvider} onCreateToken={handleCreateToken} />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      {!error && (
        <>
          {loading && <p>Loading...</p>}
          {companyInfo && <CompanyInfo {...companyInfo} />}
          
          {/* Flex container for employee list and additional info */}
          <div>
            <div style={{ flex: 1, marginRight: '20px' }}>
              <EmployeeList employees={employees} onSelectEmployee={setSelectedEmployeeId} />
            </div>
            
          
              {individualInfo && Object.keys(individualInfo).length > 0 && <IndividualInfo {...individualInfo} />}
              {employmentInfo && Object.keys(employmentInfo).length > 0 && <EmploymentInfo {...employmentInfo} />}
            
          </div>
        </>
      )}
    </div>
  );
}  

export default App;

