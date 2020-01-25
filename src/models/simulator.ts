import Position from "./position";
import Grid from "./grid";
import Animal from "./animal";
import getOffspring from "../services/breedingService";

// For now, hardcode starting animal settings
const STARTING_LIFESPAN = 50;
const STARTING_HEIGHT = 2;
const STARTING_SPEED = 5;
const STARTING_DESIRE = 0.4;

class Simulator {
    grid: Grid;
    animals: Animal[];

    constructor(sideLength: number, maxFood: number) {
        this.grid = new Grid(sideLength, maxFood);
        this.animals = [this.getStartingAnimal(), this.getStartingAnimal()];
    }

    getStartingAnimal(): Animal {
        return new Animal(
            'Hippo',
            new Position(0,1),
            STARTING_HEIGHT,
            STARTING_SPEED,
            STARTING_LIFESPAN,
            STARTING_DESIRE
        );
    }

    passTurn = () => {
        this.increaseFood();
        this.animalsEat();
        this.removeDeadAnimals();
        this.animalsMove();
        this.animalsMate();
    }

    increaseFood = () => {
        this.grid.applyToAllTiles((tile) => {
            tile.growFood(1);
        });
        this.grid.applyToAllTileNeighbours((tile) => tile.growFood(2), (tile) => tile.isAtMax());
    }

    animalsEat = () => {
        this.animals.forEach((animal) => {
            const tile = this.grid.getTileAt(animal.position);
            const food = tile.getFood();
            tile.eatFood(food);
            animal.eatFood(food);
        });
    }

    removeDeadAnimals = () => {
        this.animals = this.animals.filter((animal) => animal.isAlive());
    }

    // totally random for now
    animalsMove = () => {
        this.animals.forEach((animal) => {
            const speed = Math.floor(animal.speed);
            const xMove = Math.floor(Math.random() * (speed + 1));
            const yMove = speed - xMove;
            const xDirection = this.getRandomBool() ? 1 : -1;
            const yDirection = this.getRandomBool() ? 1 : -1;
            animal.position = this.grid.getNewPosition(animal.position, xMove * xDirection, yMove * yDirection);
        });
    }

    // Currently asexual reproduction
    animalsMate = () => {
        this.animals.filter((animal) => {
            animal.getFood() > animal.getFoodConsumptionPerTurn() * 4;
        }).forEach((animal) => {
            const random = Math.random();
            if (random < animal.desire) {
                this.animals.push(getOffspring(animal));
            }
        });
    }

    getRandomBool = () => {
        return Math.random() < 0.5;
    }
}

export default Grid;