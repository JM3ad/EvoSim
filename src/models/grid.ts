import Tile from "./tile";
import Position from "./position";

class Grid {
    sideLength: number;
    grid: Map<number, Tile>;
    maxFood: number;

    constructor(sideLength: number, maxFood: number) {
        this.sideLength = sideLength;
        this.maxFood = maxFood;
        this.grid = new Map();
        for (let x = 0; x < this.sideLength; x++) {
            for (let y = 0; y < this.sideLength; y++) {
                const position = new Position(x, y);
                this.grid.set(position.getHashCode(), new Tile(maxFood));
            }
        }
    }

    // better way to store this? 
    getPositions = () => {
        return Array.from(this.grid).map(([key, value]) => Position.getPositionFromHashCode(key));
    }

    getTileAt = (position: Position) => {
        const tile = this.grid.get(position.getHashCode());
        if (!tile) {
            throw new RangeError();
        }
        return tile;
    }

    applyToAllTiles = (func: (tile: Tile) => void) => {
        this.grid.forEach((tile, key) => {
            func(tile);
        })
    }

    applyToTile = (position: Position, func: (tile: Tile) => void) => {
        func(this.getTileAt(position));
    }

    applyToAllTileNeighbours = (func: (tile: Tile) => void, condition?: (tile: Tile) => boolean) => {
        this.grid.forEach((tile, key) => {
            if(!condition || condition(tile)){
                const adjacentPositions = this.getPositionsNextTo(Position.getPositionFromHashCode(key));
                adjacentPositions.forEach((pos) => {
                    func(this.getTileAt(pos));
                });
            }
        })
    }

    getPositionsNextTo = (position: Position) => {
        return [
            new Position(this.getCoordWithWraparound(position.x + 1), position.y),
            new Position(this.getCoordWithWraparound(position.x - 1), position.y),
            new Position(position.x, this.getCoordWithWraparound(position.y + 1)),
            new Position(position.x, this.getCoordWithWraparound(position.y - 1)
            )
        ];
    }

    getNewPosition = (startingPosition: Position, dx: number, dy: number) => {
        return new Position(
            this.getCoordWithWraparound(startingPosition.x + dx),
            this.getCoordWithWraparound(startingPosition.y + dy)
        );
    }

    getCoordWithWraparound = (coord: number) => {
        coord %= this.sideLength;
        if (coord < 0){
            coord += this.sideLength;
        }
        return coord;
    }
}

export default Grid;