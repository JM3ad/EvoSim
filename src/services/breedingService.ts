import Animal from '../models/animal';

const getOffspring = (animal: Animal) => {
    return new Animal(
        animal.name,
        animal.position,
        mutateInt(animal.height),
        mutateInt(animal.speed),
        mutateInt(animal.lifespan),
        mutateRatio(animal.desire)
    );
}

const mutateInt = (num: number) => {
    const random = getRandomBetween(0, 100);
    if (random < 10) {
        return Math.max(1, num - 1);
    }

    if (random > 90) {
        return num + 1;
    }

    return num;
}

const mutateRatio = (num: number) => {
    const random = getRandomBetween(0, 100);
    if (random < 10) {
        return Math.max(1, num - 0.1);
    }

    if (random > 90) {
        return num + 0.1;
    }

    return num;
}

const getRandomBetween = (lower: number, upper: number) => {
    return Math.random() * (upper - lower) + lower;
}

export default getOffspring;