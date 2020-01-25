import Animal from './animal';
import Position from './position';

const HEIGHT = 15;
const SPEED = 10;
const LIFESPAN = 5;
const DESIRE = 0.5;

const getAnimal = () => new Animal(
    'An Animal',
    new Position(0,0),
    HEIGHT,
    SPEED,
    LIFESPAN,
    DESIRE
);

test('new animal has age 0', () => {
    // given
    const animal = getAnimal();

    // when
    const age = animal.getAge();

    // then
    expect(age).toBe(0);
    expect(animal.isAlive()).toBeTruthy();
});

test('animal age increases as turns pass', () => {
    // given
    const animal = getAnimal();

    // when
    animal.passTurn();

    // then
    expect(animal.getAge()).toBe(1);
});

test('animal is dead if age > lifespan', () => {
    // given
    const animal = getAnimal();

    // when
    for(let i = 0; i <= LIFESPAN; i++) {
        animal.passTurn();
    }

    // then
    expect(animal.getAge()).toBeGreaterThan(LIFESPAN);
    expect(animal.isAlive()).toBeFalsy();
});

test('animal has max desire to mate of 1', () => {
    // when
    const animal = new Animal(
        'An Animal',
        new Position(0,0),
        HEIGHT,
        SPEED,
        LIFESPAN,
        5
    );

    // then
    expect(animal.desire).toBe(1);
});