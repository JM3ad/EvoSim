import React, { useState, useEffect } from 'react';
import Simulator from '../models/simulator';
import Tile from './tile';
import './grid.css';
import _ from 'lodash';

interface GridParams {
  simulator: Simulator
}

const GridDisplay: React.FC<GridParams> = (params: GridParams) => {
    const [simulator] = useState(params.simulator);
    const [grid, updateGrid] = useState(params.simulator.grid);
    const [herbivores, updateHerbivores] = useState(params.simulator.herbivores);
    const [carnivores, setCarnivores] = useState(params.simulator.carnivores);

    useEffect(() => {
      const moveGameLoop = () => {
        simulator.passTurn();
        updateGrid(simulator.grid);
        updateHerbivores(simulator.herbivores);
        setCarnivores(simulator.carnivores);
      }

      console.log("Starting game loop");
      window.setInterval(moveGameLoop, 1000);
    }, [simulator]);

    const getTiles = () => {
      const positions = simulator.grid.getPositions().sort((a, b) => {
        if (a.x !== b.x) {
          return a.x - b.x;
        }

        return a.y - b.y;
      });
      const rows = _.uniq(positions.map((pos) => pos.y));

      return <>
      <table>
        {rows.map((row) => {
          return <tr key={row}>
            {positions.filter((pos) => pos.y === row).map((position, index) => {
              const tile = grid.getTileAt(position);
              const herbivoresAtPosition = herbivores.filter((animal) => animal.isAt(position));
              const carnivoresAtPosition = carnivores.filter((animal) => animal.isAt(position));
              return (
                <td>
                  <Tile tile={tile} herbivores={herbivoresAtPosition} carnivores={carnivoresAtPosition} key={index} />
                </td>
              );
            })}
          </tr>
        })}
      </table>
      </>
    }

  return (
    <div className="grid">
      {getTiles()}
    </div>
  );
}

export default GridDisplay;
