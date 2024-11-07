// src/EmployeeList.tsx
import React from 'react';
import { Employee } from './types';

interface EmployeeListProps {
    employees: Employee[];
    onSelectEmployee: (id: string) => void; // Make sure this is correctly defined
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onSelectEmployee }) => {
    return (
        <div>
            <h2>Employee Directory</h2>
            <div>
                {employees.map((employee) => (
                    <span
                        key={employee.id}
                        onClick={() => onSelectEmployee(employee.id)}
                        style={{ 
                            cursor: 'pointer', 
                            display: 'block', // Use block to ensure it occupies a line
                            margin: '5px 0', // Add a small margin for separation
                            textDecoration: 'underline' // Optional: underline to indicate it's clickable
                        }}
                    >
                        {employee.first_name} {employee.middle_name} {employee.last_name} - {employee.is_active ? 'Active' : 'Inactive'}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;

