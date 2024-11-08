import React from "react";
import { EmploymentInfo as EmploymentInfoType } from "../types";

interface EmploymentInfoProps extends EmploymentInfoType {}

const EmploymentInfo: React.FC<EmploymentInfoProps> = ({
    id,
    title,
    department,
    start_date,
    end_date,
    is_active,
    class_code,
    location,
    income,
    income_history = [],
    custom_fields = []
}) => {
    return (
        <div>
            <h2>Employment Information</h2>
            <p><strong>Title:</strong> {title || 'N/A'}</p>
            <p><strong>Department:</strong> {department?.name || 'N/A'}</p>
            <p><strong>Start Date:</strong> {start_date || 'N/A'}</p>
            <p><strong>End Date:</strong> {end_date || 'N/A'}</p>
            <p><strong>Status:</strong> {is_active ? 'Active' : 'Inactive'}</p>
            <p><strong>Location:</strong> 
               {location 
                   ? `${location.line1 || ''}, ${location.city || ''}, ${location.state || ''}, ${location.postal_code || ''}, ${location.country || ''}`
                   : 'N/A'}
            </p>
            <p><strong>Class Code:</strong> {class_code || 'N/A'}</p>
            <p><strong>Income:</strong> {(income?.amount / 100)?.toLocaleString() || 'N/A'} {income?.currency || ''} 
            (Effective Date: {income?.effective_date || 'N/A'})</p>
            
            <h3>Income History</h3>
            <ul>
                {income_history?.length > 0 ? (
                    income_history.map((income, index) => (
                        <li key={index}>
                            <strong>{income.unit}:</strong> {income.amount / 100} {income.currency} 
                            (Effective Date: {income.effective_date})
                        </li>
                    ))
                ) : (
                    <li>No income history available</li>
                )}
            </ul>

            <h3>Custom Fields</h3>
            <ul>
                {custom_fields?.length > 0 ? (
                    custom_fields.map((field, index) => (
                        <li key={index}>
                            <strong>{field.name}:</strong> {field.value}
                        </li>
                    ))
                ) : (
                    <li>No custom fields available</li>
                )}
            </ul>
        </div>
    );
};


export default EmploymentInfo;