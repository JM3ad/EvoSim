import React from 'react';
import TileModel from '../models/tile';
import Animal from '../models/animal';
import './tile.css';

interface tileParams {
    tile: TileModel;
    herbivores: Animal[];
    carnivores: Animal[];
}

const Tile: React.FC<tileParams> = (params: tileParams) => {
    const tile = params.tile;
    const herbivores = params.herbivores;
    const hasHerbivore = herbivores.length > 0;
    const carnivores = params.carnivores;
    const hasCarnivore = carnivores.length > 0;


    const getClassname = () => {
        if (hasCarnivore) {
          return "tile carnivore";
        }
        
        return hasHerbivore ? "tile herbivore" : "tile";
    }
    
    const classname = getClassname();
    const tileFoodToMaxRatio = tile.getFood() / tile.maxFood;
    const tileStyle = {
        opacity: hasHerbivore || hasCarnivore ? 1 : tileFoodToMaxRatio
    };

  return (
    <div className={classname} style={tileStyle}>
      {herbivores.length}
    </div>
  );
}

export default Tile;
