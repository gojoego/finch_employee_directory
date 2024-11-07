import React, { useEffect, useState } from 'react';
import { createSandbox, fetchEmployeeDirectory, fetchCompanyInfo, fetchEmploymentInfo, fetchIndividualInfo } from './api';
import EmployeeList from './components/EmployeeList';
import EmploymentInfo from './components/EmploymentInfo';
import IndividualInfo from './components/PersonalInfo';
import DropdownMenu from './components/DropdownMenu';
import {
  Employee, Provider, EmploymentInfo as EmploymentInfoType,
  IndividualInfo as IndividualInfoType,
} from './types';
import CompanyInfo from './components/CompanyInfo';

const TEST_TOKEN = '';

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>();
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [individualInfo, setIndividualInfo] = useState<IndividualInfoType | null>(null);
  const [employmentInfo, setEmploymentInfo] = useState<EmploymentInfoType | null>(null);

  // useEffect(() => {
  //     const initializeSandbox = async () => {
  //         const sandboxData = await createSandbox('gusto');
  //         setAccessToken(sandboxData.access_token);
  //         setCompanyInfo(sandboxData.company_id); 
  //     };

  //     initializeSandbox();
  // }, [selectedProvider]);

  //   useEffect(() => {
  //     // Set company info based on the selected provider
  //     const setCompanyInfo = (providerId: string) => {
  //         // You could add logic to customize this message based on the provider
  //         setCompanyInfo(`Using provider: ${providerId}`);
  //     };

  //     setCompanyInfo(selectedProvider);
  // }, [selectedProvider]);

  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const info = await fetchCompanyInfo(TEST_TOKEN);
        setCompanyInfo(info);
      } catch (error) {
        console.error('Error fetching company info:', error);
      }
    };

    getCompanyInfo();
  }, []);


  useEffect(() => {
    const getEmployees = async () => {
      if (TEST_TOKEN) {
        const directoryData = await fetchEmployeeDirectory(TEST_TOKEN);
        setEmployees(directoryData.individuals);
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  const onSelectEmployee = (id: string) => {
    setSelectedEmployeeId(id);
  };

  const onSelectProvider = (providerId: string) => {
    console.log("Selected provider ID:", providerId);
    // TODO 
  };

  useEffect(() => {
    const getIndividualAndEmploymentInfo = async () => {
      if (selectedEmployeeId) {
        try {
          const individualData = await fetchIndividualInfo(TEST_TOKEN, selectedEmployeeId);
          setIndividualInfo(individualData);

          const employmentData = await fetchEmploymentInfo(TEST_TOKEN, selectedEmployeeId);
          setEmploymentInfo(employmentData);
        } catch (error) {
          console.error('Error fetching individual or employment info:', error);
        }
      }
    };

    getIndividualAndEmploymentInfo();
  }, [selectedEmployeeId]);

  return (
    <div className="App" style={{ display: 'flex', padding: '50px' }}>
      <DropdownMenu onSelectProvider={onSelectProvider} />
      {companyInfo && <CompanyInfo{...companyInfo} />}
      <EmployeeList employees={employees} onSelectEmployee={onSelectEmployee} />
      {individualInfo && <IndividualInfo{...individualInfo} />}
      {employmentInfo && <EmploymentInfo{...employmentInfo} />}
    </div>
  );
};


export default App;