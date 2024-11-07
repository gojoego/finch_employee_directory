import React from "react";
import { IndividualInfo as IndividualInfoType } from "../types";

interface IndividualInfoProps extends IndividualInfoType {}

const IndividualInfo: React.FC<IndividualInfoProps> = ({
    id, 
    first_name,
    middle_name,
    last_name,
    preferred_name,
    dob,
    emails,
    phone_numbers,
    gender,
    ethnicity,
    residence,
}) => {
    return (
             <div style={{ flex: .3, marginRight: '10px' }}>
                  <h2>Personal Information</h2>
                  <p><strong>Name:</strong> {first_name} {middle_name} {last_name}</p>
                  {preferred_name && <p><strong>Preferred Name:</strong> {preferred_name}</p>}
                  <p><strong>Date of Birth:</strong> {dob}</p>
                  <p><strong>Gender:</strong> {gender}</p>
                  <h3>Emails</h3>
                  <ul>
                      {emails.map((email, index) => (
                          <li key={index}><strong>{email.type}:</strong> {email.data}</li>
                      ))}
                  </ul>
                  <h3>Phone Numbers</h3>
                  <ul>
                      {phone_numbers.map((phone, index) => (
                          <li key={index}><strong>{phone.type}:</strong> {phone.data}</li>
                      ))}
                  </ul>
                  <h3>Ethnicity</h3>
                  <p>{ethnicity}</p>
                  <h3>Residence</h3>
                  <p>
                      {residence.line1} {residence.line2 && `, ${residence.line2}`}<br />
                      {residence.city}, {residence.state} {residence.postal_code}<br />
                      {residence.country}
                  </p>
              </div>
    )
}

export default IndividualInfo;