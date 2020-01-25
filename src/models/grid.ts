import Tile from "./tile";
import Position from "./position";

class Grid {
    sideLength: number;
    grid: Map<number, Tile>;

    constructor(sideLength: number, maxFood: number) {
        this.sideLength = sideLength;
        this.grid = new Map();
        for (let x = 0; x < this.sideLength; x++) {
            for (let y = 0; y < this.sideLength; y++) {
                const position = new Position(x, y);
                this.grid.set(position.getHashCode(), new Tile(maxFood));
            }
        }
    }

    getTileAt(position: Position): Tile {
        const tile = this.grid.get(position.getHashCode());
        if (!tile) {
            throw new RangeError();
        }
        return tile;
    }
}

export default Grid;