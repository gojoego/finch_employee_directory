import React from "react";
import { Provider as ProviderType } from "../types";

const PROVIDERS: ProviderType[] = [
    { id: 'gusto', name: 'Gusto' },
    { id: 'bamboohr', name: 'BambooHR' },
    { id: 'justworks', name: 'Justworks' },
    { id: 'paychex_flex', name: 'Paychex Flex' },
    { id: 'workday', name: 'Workday' }
];

interface ProviderMenuProps {
    onSelectProvider: (providerId: string) => void;
    onCreateToken: (providerId: string) => void;
}

const DropdownMenu: React.FC<ProviderMenuProps> = ({ onSelectProvider, onCreateToken }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProviderId = event.target.value;
        onSelectProvider(selectedProviderId);

        // Check if token already exists before creating a new one
        const storedToken = localStorage.getItem(`access_token_${selectedProviderId}`);
        if (!storedToken) {
            onCreateToken(selectedProviderId); // Create token if not in storage
        }
    };

    return (
        <select onChange={handleSelect} className="provider-button">
            <option value="">Select a Provider</option>
            {PROVIDERS.map(provider => (
                <option key={provider.id} value={provider.id}>{provider.name}</option>
            ))}
        </select>
    );
};

export default DropdownMenu;