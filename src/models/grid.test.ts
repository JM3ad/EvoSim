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
})