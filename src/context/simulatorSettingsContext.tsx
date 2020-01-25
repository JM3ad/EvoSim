import React, { useState, ReactNode, useCallback } from 'react';

export interface SimulatorProviderProps {
    children?: ReactNode;
}

export interface SimulatorSettings {
    offspringCost: number,
    offspringDelay: number,
    carnivoreFoodEfficiency: number,
}

interface SettingsContext {
    settings: SimulatorSettings,
    updateSettings: (newSettings: SimulatorSettings) => void
}

const defaultSettings: SimulatorSettings = {
    offspringCost: 5,
    offspringDelay: 5,
    carnivoreFoodEfficiency: 5,
}

const defaultContext: SettingsContext = {
    settings: defaultSettings,
    updateSettings: (newSettings: SimulatorSettings) => {}
}

export const SimulatorContext = React.createContext<SettingsContext>(defaultContext);

export const useSettings = (): SettingsContext => {
    const [settings, setSettings] = useState<SimulatorSettings>(defaultSettings);
    const updateSettings = useCallback((newSettings) => {
        setSettings(newSettings);
    }, []);

    return {
        settings,
        updateSettings
    }
}

const SimulatorContextProvider = (props: SimulatorProviderProps) => {
    return <SimulatorContext.Provider value={useSettings()}>
        {props.children}
    </SimulatorContext.Provider>
}

export default SimulatorContextProvider;