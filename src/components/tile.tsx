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

    const getFoodDisplay = () => {
      if (hasCarnivore) {
        return carnivores[0].food;
      }
      return hasHerbivore ? herbivores[0].food : tile.getFood();
    }

  // Would be nice if we could see food per animal, and only have 1 per tile
  return (
    <div className={classname} style={tileStyle}>
      {getFoodDisplay()}
    </div>
  );
}

export default Tile;
