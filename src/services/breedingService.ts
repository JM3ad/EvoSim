import Animal from '../models/animal';

const getOffspring = (animal: Animal) => {
    return new Animal(
        animal.name,
        animal.position,
        animal.height * getRandomBetween(0.9, 1.1),
        animal.speed * getRandomBetween(0.9, 1.1),
        animal.lifespan * getRandomBetween(0.9, 1.1),
        animal.desire * getRandomBetween(0.9, 1.1)
    );
}

const getRandomBetween = (lower: number, upper: number) => {
    return Math.random() * (upper - lower) + lower;
}

export default getOffspring;