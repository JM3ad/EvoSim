import React, { useContext } from 'react';
import './settings.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SimulatorContext } from '../context/simulatorSettingsContext';

interface SimSettingsProps {
    restartSimulator: () => void;
}

const SimSettings: React.FC<SimSettingsProps> = ({restartSimulator}) => {
    const {settings, updateSettings} = useContext(SimulatorContext);

    const handleOffspringCostChange = (event: number) => {
        settings.offspringCost = event;
        updateSettings(settings);
    }
    
    const handleOffspringDelayChange = (event: number) => {
        settings.offspringDelay = event;
        updateSettings(settings);
    }
    
    const handleCarnivoreFoodEfficiencyChange = (event: number) => {
        settings.carnivoreFoodEfficiency = event;
        updateSettings(settings);
    }

    const restart = () => {
        restartSimulator()
    }

    return (
        <div className="settings">
            <label>Offspring cost: {settings.offspringCost}</label>
            <Slider
                value={settings.offspringCost}
                onChange={handleOffspringCostChange}
                aria-labelledby="continuous-slider"
                min={0}
                max={10}
                step={2}
            />
            <label>Offspring delay: {settings.offspringDelay}</label>
            <Slider
                value={settings.offspringDelay}
                onChange={handleOffspringDelayChange}
                aria-labelledby="continuous-slider"
                min={0}
                max={10}
                step={2}
            />
            <label>Carnivore Food Efficiency: {settings.carnivoreFoodEfficiency}</label>
            <Slider
                value={settings.carnivoreFoodEfficiency}
                onChange={handleCarnivoreFoodEfficiencyChange}
                aria-labelledby="continuous-slider"
                min={0}
                max={10}
                step={2}
            />
            <button onClick={restart}> Restart </button>
        </div>
    );
}

export default SimSettings;
