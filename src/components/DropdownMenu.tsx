import React, {useState} from "react";
import { Provider as ProviderType } from "../types";

const PROVIDERS: ProviderType[] = [
    { id: 'gusto', name: 'Gusto' },
    { id: 'bamboohr', name: 'BambooHR' },
    { id: 'justworks', name: 'Justworks' },
    { id: 'paychex_flex', name: 'Paychex Flex' },
    { id: 'workday', name: 'Workday' }
  ]

  interface ProviderMenuProps {
    onSelectProvider: (providerId: string) => void; // Callback function type
}

const DropdownMenu: React.FC<ProviderMenuProps> = ({ onSelectProvider }) => {
    const [selectedProvider, setSelectedProvider] = useState<string>(PROVIDERS[0].id); // Default to the first provider

    const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const providerId = event.target.value;
        setSelectedProvider(providerId);
        onSelectProvider(providerId); // Call the passed function to notify parent
    };
    
    return (
        <div style={{ flex:.3, marginRight: '2px' }}>
            <h2>Choose Provider</h2>
            <select value={selectedProvider} onChange={handleProviderChange}>
                {PROVIDERS.map(provider => (
                    <option value={provider.id} key={provider.id}>
                        {provider.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropdownMenu;