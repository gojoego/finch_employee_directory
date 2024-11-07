import React from 'react';
import { Employee } from '../types';

interface EmployeeListProps {
    employees: Employee[];
    onSelectEmployee: (id: string) => void; // Correctly defined type for the callback
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onSelectEmployee }) => {
    return (
        <div className="employee-list" style={{ flex: .3, marginRight: '10px' }}>
            <h2>Employee Directory</h2>
            {employees.length === 0 ? (
                <p>No employees found.</p>
            ) : (
                <ul>
                    {employees.map((employee) => (
                        <li
                            key={employee.id}
                            onClick={() => onSelectEmployee(employee.id)}
                            style={{ 
                                cursor: 'pointer', 
                                margin: '5px 0', 
                                textDecoration: 'underline' 
                            }}
                        >
                            {employee.first_name} {employee.middle_name ? employee.middle_name + ' ' : ''}{employee.last_name} - {employee.is_active ? 'Active' : 'Inactive'}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployeeList;