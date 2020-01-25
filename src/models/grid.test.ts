import Grid from './grid';
import Position from './position';

test('new grid creates tiles', () => {
    // given
    const grid = new Grid(10, 10);

    // when
    const tile = grid.getTileAt(new Position(2, 2));

    // then
    expect(tile).toBeTruthy();
});

test('new grid returns correct tile', () => {
    // given
    const grid = new Grid(10, 10);
    const position = new Position(2, 2);
    const tile = grid.getTileAt(position);
    const startingFood = tile.getFood();

    // when
    tile.growFood(2);

    // then 
    const sameTile = grid.getTileAt(position);
    expect(sameTile.getFood()).toEqual(startingFood + 2);
});

test('get positions next to gets four surrounding positions', () => {
    // given
    const grid = new Grid(10, 10);
    const position = new Position(2, 2);

    // when
    const adjacentPositions = grid.getPositionsNextTo(position);

    // then
    expect(adjacentPositions.length).toEqual(4);
    expect(adjacentPositions.filter(p => p.x === 2 && p.y === 1).length).toEqual(1);
    expect(adjacentPositions.filter(p => p.x === 2 && p.y === 3).length).toEqual(1);
    expect(adjacentPositions.filter(p => p.x === 1 && p.y === 2).length).toEqual(1);
    expect(adjacentPositions.filter(p => p.x === 3 && p.y === 2).length).toEqual(1);
});

test('get position next to wraps around grid', () => {
    // given
    const grid = new Grid(10, 10);
    const position = new Position(0, 0);

    // when
    const adjacentPositions = grid.getPositionsNextTo(position);

    // then
    expect(adjacentPositions.length).toEqual(4);
    expect(adjacentPositions.filter(p => p.x === 0 && p.y === 1).length).toEqual(1);
    expect(adjacentPositions.filter(p => p.x === 1 && p.y === 0).length).toEqual(1);
    expect(adjacentPositions.filter(p => p.x === 9 && p.y === 0).length).toEqual(1);
    expect(adjacentPositions.filter(p => p.x === 0 && p.y === 9).length).toEqual(1);
});