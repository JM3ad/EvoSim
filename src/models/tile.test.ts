import Tile from './tile';

const MAX_FOOD = 10;

test('tile grow food adds to food', () => {
    // given
    const tile = new Tile(MAX_FOOD);
    const startingFood = tile.getFood();

    // when
    tile.growFood(1);

    // then
    expect(tile.getFood()).toEqual(startingFood + 1);
});

test('tile eat food takes from food', () => {
    // given
    const tile = new Tile(MAX_FOOD);
    tile.growFood(5);
    const startingFood = tile.getFood();

    // when
    tile.eatFood(2);

    // then
    expect(tile.getFood()).toEqual(startingFood - 2);
});

test('tile food cannot go below 0', () => {
    // given
    const tile = new Tile(MAX_FOOD);

    // when
    tile.eatFood(MAX_FOOD + 1);

    // then
    expect(tile.getFood()).toEqual(0);
});

test('tile food cannot go above max', () => {
    // given
    const tile = new Tile(MAX_FOOD);

    // when
    tile.growFood(MAX_FOOD * 2);

    // then
    expect(tile.getFood()).toEqual(MAX_FOOD);
});

test('isAtMax returns true if food maxed', () => {
    // given
    const tile = new Tile(MAX_FOOD);
    tile.growFood(MAX_FOOD);

    // when
    const isAtMax = tile.isAtMax();

    // then
    expect(isAtMax).toBeTruthy();
})

test('isAtMax returns false if food below max', () => {
    // given
    const tile = new Tile(MAX_FOOD);
    tile.growFood(MAX_FOOD);
    tile.eatFood(1);

    // when
    const isAtMax = tile.isAtMax();

    // then
    expect(isAtMax).toBeFalsy();
})