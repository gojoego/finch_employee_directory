import React from "react";
import { CompanyInfo as CompanyInfoType } from "../types";

interface CompanyInfoProps extends CompanyInfoType {}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
    id, 
    legal_name,
    entity,
    ein,
    primary_email,
    primary_phone_number,
    departments,
    locations, 
    accounts  
}) => {
    return (
        <div>
            <h2>Company Information</h2>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Legal Name:</strong> {legal_name}</p>
            <p><strong>Email:</strong> {primary_email}</p>
            <p><strong>Phone:</strong> {primary_phone_number}</p>
            <p><strong>EIN:</strong> {ein}</p>

            <h3>Entity Information</h3>
            <p><strong>Type:</strong> {entity.type}</p>
            <p><strong>Subtype:</strong> {entity.subtype || 'N/A'}</p>

            <h3>Departments</h3>
            <ul>
                {departments.map((dept, index) => (
                    <li key={index}>{dept.name} {dept.parent?.name && ` (Parent: ${dept.parent.name})`}</li>
                ))}
            </ul>

            <h3>Locations</h3>
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        {location.line1}{location.line2 ? `, ${location.line2}` : ''}, {location.city}, {location.state} {location.postal_code}, {location.country}
                    </li>
                ))}
            </ul>

            <h3>Accounts</h3>
            <ul>
                {accounts.map((account, index) => (
                    <li key={index}>
                        {account.institution_name} - {account.account_type} (Account Number: {account.account_number})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CompanyInfo;