import React, { useEffect, useState } from 'react';
import { createSandbox, fetchEmployeeDirectory, fetchCompanyInfo, fetchEmploymentInfo, fetchIndividualInfo } from './api';
import EmployeeList from './EmployeeList';
import { Employee, Provider, CompanyDetails, IndividualInfo, EmploymentInfo } from './types';

const TEST_TOKEN = '';

const PROVIDERS: Provider[] = [
  {id: 'gusto', name: 'Gusto'},
  {id: 'bamboohr', name: 'BambooHR'},
  {id: 'justworks', name: 'Justworks'},
  {id: 'paychex_flex', name: 'Paychex Flex'},
  {id: 'workday', name: 'Workday'}
]

const App: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string>('');
    const [selectedProvider, setSelectedProvider] = useState<string>(PROVIDERS[0].id);
    const [companyInfo, setCompanyInfo] = useState<any>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [individualInfo, setIndividualInfo] = useState<IndividualInfo | null>(null);
    const [employmentInfo, setEmploymentInfo] = useState<EmploymentInfo | null>(null);


    // useEffect(() => {
    //     const initializeSandbox = async () => {
    //         const sandboxData = await createSandbox('gusto');
    //         setAccessToken(sandboxData.access_token);
    //         setCompanyInfo(sandboxData.company_id); 
    //     };

    //     initializeSandbox();
    // }, [selectedProvider]);

    // useEffect(() => {
    //     const getEmployees = async () => {
    //         if (accessToken) {
    //             const directoryData = await fetchEmployeeDirectory(accessToken);
    //             setEmployees(directoryData.individuals);
    //             setLoading(false);
    //         }
    //     };

    //     getEmployees();
    // }, [accessToken]);

    useEffect(() => {
      // Set company info based on the selected provider
      const setCompanyDetails = (providerId: string) => {
          // You could add logic to customize this message based on the provider
          setCompanyInfo(`Using provider: ${providerId}`);
      };

      setCompanyDetails(selectedProvider);
  }, [selectedProvider]);

useEffect(() => {
    const getCompanyInfo = async () => {
        if (TEST_TOKEN) {
            const info = await fetchCompanyInfo(TEST_TOKEN);
            setCompanyInfo(info);
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

useEffect(() => {
  const getIndividualAndEmploymentInfo = async () => {
      if (selectedEmployeeId && TEST_TOKEN) {
          const individualData = await fetchIndividualInfo(TEST_TOKEN, selectedEmployeeId);
          setIndividualInfo(individualData);
          
          const employmentData = await fetchEmploymentInfo(TEST_TOKEN, selectedEmployeeId);
          setEmploymentInfo(employmentData);
      }
  };

  getIndividualAndEmploymentInfo();
}, [selectedEmployeeId]);

useEffect(() => {
    const getIndividualAndEmploymentInfo = async () => {
        if (selectedEmployeeId && TEST_TOKEN) {
            const individualData = await fetchIndividualInfo(TEST_TOKEN, selectedEmployeeId);
            setIndividualInfo(individualData);
            
            const employmentData = await fetchEmploymentInfo(TEST_TOKEN, selectedEmployeeId);
            setEmploymentInfo(employmentData);
        }
    };

    getIndividualAndEmploymentInfo();
}, [selectedEmployeeId]);

const onSelectEmployee = (id: string) => {
  setSelectedEmployeeId(id);
};

return (
  <div className="App" style={{ display: 'flex', padding: '20px' }}>
      {/* Company Info Section */}
      <div style={{ flex: 2, marginRight: '10px' }}>
                <h1>Finch Employee Directory</h1>
                <select>
                    <option value="gusto">Select Provider: Gusto</option>
                    {/* Add more options as needed */}
                </select>
            </div>
      <div style={{ flex: 2, marginRight: '10px' }}>
          {companyInfo && (
              <div>
                  <h1>Company Information</h1>
                  <p><strong>ID</strong> {companyInfo.id}</p>
                  <p><strong>Legal Name</strong> {companyInfo.legal_name}</p>
                  <p><strong>Email</strong> {companyInfo.primary_email}</p>
                  <p><strong>Phone</strong> {companyInfo.primary_phone_number}</p>
                  <p><strong>EIN</strong> {companyInfo.ein}</p>
              </div>
          )}

          {loading ? (
              <p>Loading...</p>
          ) : (
              <EmployeeList employees={employees} onSelectEmployee={onSelectEmployee} />
          )}
      </div>

      {/* Personal and Employment Info Section */}
      <div style={{ flex: 1, marginLeft: '0' }}>
          {individualInfo && (
              <div style={{ marginBottom: '10px' }}>
                  <h2>Personal Information</h2>
                  <p><strong>Name:</strong> {individualInfo.first_name} {individualInfo.middle_name} {individualInfo.last_name}</p>
                  {individualInfo.preferred_name && <p><strong>Preferred Name:</strong> {individualInfo.preferred_name}</p>}
                  <p><strong>Date of Birth:</strong> {individualInfo.dob}</p>
                  <p><strong>Gender:</strong> {individualInfo.gender}</p>
                  <h3>Emails</h3>
                  <ul>
                      {individualInfo.emails.map((email, index) => (
                          <li key={index}><strong>{email.type}:</strong> {email.data}</li>
                      ))}
                  </ul>
                  <h3>Phone Numbers</h3>
                  <ul>
                      {individualInfo.phone_numbers.map((phone, index) => (
                          <li key={index}><strong>{phone.type}:</strong> {phone.data}</li>
                      ))}
                  </ul>
                  <h3>Residence</h3>
                  <p>
                      {individualInfo.residence.line1} {individualInfo.residence.line2 && `, ${individualInfo.residence.line2}`}<br />
                      {individualInfo.residence.city}, {individualInfo.residence.state} {individualInfo.residence.postal_code}<br />
                      {individualInfo.residence.country}
                  </p>
              </div>
          )}

          {employmentInfo && (
              <div>
                  <h2>Employment Information</h2>
                  <p><strong>Title:</strong> {employmentInfo.title}</p>
                  <p><strong>Department:</strong> {employmentInfo.department.name}</p>
                  <p><strong>Start Date:</strong> {employmentInfo.start_date}</p>
                  <p><strong>End Date:</strong> {employmentInfo.end_date || 'N/A'}</p>
                  <p><strong>Status:</strong> {employmentInfo.is_active ? 'Active' : 'Inactive'}</p>
                  <p><strong>Location:</strong> {employmentInfo.location.line1}, {employmentInfo.location.city}, {employmentInfo.location.state}, {employmentInfo.location.postal_code}, {employmentInfo.location.country}</p>
                  <p><strong>Class Code:</strong> {employmentInfo.class_code}</p>
                  <p><strong>Income:</strong> {(employmentInfo.income.amount / 100).toLocaleString()} {employmentInfo.income.currency} (Effective Date: {employmentInfo.income.effective_date})</p>
                  
                  <h3>Income History</h3>
                  <ul>
                      {employmentInfo.income_history.map((income, index) => (
                          <li key={index}>
                              <strong>{income.unit}:</strong> {income.amount / 100} {income.currency} (Effective Date: {income.effective_date})
                          </li>
                      ))}
                  </ul>

                  <h3>Custom Fields</h3>
                  <ul>
                      {employmentInfo.custom_fields.map((field, index) => (
                          <li key={index}>
                              <strong>{field.name}:</strong> {field.value}
                          </li>
                      ))}
                  </ul>
              </div>
          )}
      </div>
  </div>
);
};


export default App;