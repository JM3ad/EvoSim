import Position from "./position";
import Grid from "./grid";
import Animal from "./animal";
import getOffspring from "../services/breedingService";
import _ from "lodash";
import { SimulatorSettings } from "../context/simulatorSettingsContext";

// For now, hardcode starting animal settings
const STARTING_LIFESPAN = 30.;
const STARTING_HEIGHT = 2;
const STARTING_SPEED = 2;
const STARTING_DESIRE = 0.1;

class Simulator {
    grid: Grid;
    herbivores: Animal[];
    carnivores: Animal[];
    turnCount: number;
    settings: SimulatorSettings;

    constructor(sideLength: number, maxFood: number, settings: SimulatorSettings) {
        this.grid = new Grid(sideLength, maxFood);
        this.herbivores = [this.getStartingAnimal(), this.getStartingAnimal()];
        this.carnivores = [];
        this.turnCount = 0;
        this.settings = settings;
    }

    getFreshSimulator = (): Simulator => {
        return new Simulator(this.grid.sideLength, this.grid.maxFood, this.settings);
    }

    getStartingCarnivore(): Animal {
        return new Animal(
            'velociraptor',
            new Position(5,5),
            STARTING_HEIGHT,
            STARTING_SPEED,
            STARTING_LIFESPAN * 2,
            STARTING_DESIRE
        )
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
        this.turnCount++;
        this.increaseFood();
        this.animalsMoveRandomly(this.herbivores);
        this.animalsMoveTowardsHerbivores(this.carnivores);
        this.herbivoresEat();
        this.carnivoresEat();
        this.animalsExist();
        this.removeDeadAnimals();
        this.possiblySpawnCarnivore();
        this.animalsMate(this.herbivores);
        this.animalsMate(this.carnivores);
        this.printStats();
    }

    updateSettings = (settings: SimulatorSettings) => {
        this.settings = settings;
    }

    printStats = () => {
        if(this.turnCount % 10 !== 0) {
            return; 
        }
        console.log("There are currently: " + this.herbivores.length + " herbivores")

        const averageLifespan = this.herbivores.reduce((prev, current) => prev + current.lifespan, 0) / this.herbivores.length;
        const averageDesire = this.herbivores.reduce((prev, current) => prev + current.desire, 0) / this.herbivores.length;
        const averageSpeed = this.herbivores.reduce((prev, current) => prev + current.speed, 0) / this.herbivores.length;
        const averageHeight = this.herbivores.reduce((prev, current) => prev + current.height, 0) / this.herbivores.length;
        const averageFood = this.herbivores.reduce((prev, current) => prev + current.food, 0) / this.herbivores.length;

        console.log("With avg lifespan: " + averageLifespan);
        console.log("With avg height: " + averageHeight);
        console.log("With avg speed: " + averageSpeed);
        console.log("With avg desire: " + averageDesire);
        console.log("With avg food: " + averageFood);

        console.log("There are currently: " + this.carnivores.length + " carnivores")

        const averageLifespanC = this.carnivores.reduce((prev, current) => prev + current.lifespan, 0) / this.carnivores.length;
        const averageDesireC = this.carnivores.reduce((prev, current) => prev + current.desire, 0) / this.carnivores.length;
        const averageSpeedC = this.carnivores.reduce((prev, current) => prev + current.speed, 0) / this.carnivores.length;
        const averageHeightC = this.carnivores.reduce((prev, current) => prev + current.height, 0) / this.carnivores.length;
        const averageFoodC = this.carnivores.reduce((prev, current) => prev + current.food, 0) / this.carnivores.length;

        console.log("With avg lifespan: " + averageLifespanC);
        console.log("With avg height: " + averageHeightC);
        console.log("With avg speed: " + averageSpeedC);
        console.log("With avg desire: " + averageDesireC);
        console.log("With avg food: " + averageFoodC);
    }

    increaseFood = () => {
        this.grid.applyToAllTiles((tile) => {
            tile.growFood(1);
        });
        this.grid.applyToAllTileNeighbours((tile) => tile.growFood(2), (tile) => tile.isAtMax());
    }

    herbivoresEat = () => {
        this.herbivores.forEach((animal) => {
            const tile = this.grid.getTileAt(animal.position);
            const foodAvailable = tile.getFood();
            const foodEaten = Math.min(foodAvailable, animal.getMaxEatPerTurn());
            tile.eatFood(foodEaten);
            animal.eatFood(foodEaten);
        });
    }

    carnivoresEat = () => {
        this.carnivores.forEach((carnivore) => {
            const herbivoresAtLocation = this.herbivores.filter((herb) => herb.isAt(carnivore.position));
            herbivoresAtLocation.forEach((herb) => {
                if (carnivore.height >= herb.height) {
                    carnivore.eatFood(herb.height * this.settings.carnivoreFoodEfficiency);
                    // this will kill the herb for now, better patterns exist
                    herb.eatFood(-herb.food);
                }
            });
        });
    }

    possiblySpawnCarnivore = () => {
        if (this.carnivores.length === 0 && Math.random() < 0.1) {
            this.carnivores.push(this.getStartingCarnivore());
        }
    }

    animalsExist = () => {
        this.herbivores.forEach((animal) => {
            animal.passTurn();
        });
        this.carnivores.forEach((animal) => {
            animal.passTurn();
        })
    }

    removeDeadAnimals = () => {
        this.herbivores = this.herbivores.filter((animal) => animal.isAlive());
        this.carnivores = this.carnivores.filter((animal) => animal.isAlive());
    }

    animalsMoveRandomly = (animals: Animal[]) => {
        animals.forEach((animal) => {
            this.moveRandomly(animal);
        });
    }

    animalsMoveTowardsHerbivores = (animals: Animal[]) => {
        animals.forEach((animal) => {
            const closestHerbivore = _.find(this.herbivores,
                (herb) => 
                // won't work across grid boundary!
                Math.abs(herb.position.x - animal.position.x) + Math.abs(herb.position.y - animal.position.y) <= animal.speed
            )

            if (closestHerbivore) {
                animal.position = closestHerbivore.position;
                return;
            }

            this.moveRandomly(animal);
        });
    }

    moveRandomly = (animal: Animal) => {
        const speed = Math.floor(animal.speed);
        const xMove = Math.floor(Math.random() * (speed + 1));
        const yMove = speed - xMove;
        const xDirection = this.getRandomBool() ? 1 : -1;
        const yDirection = this.getRandomBool() ? 1 : -1;
        animal.position = this.grid.getNewPosition(animal.position, xMove * xDirection, yMove * yDirection);
    }

    // Currently asexual reproduction
    animalsMate = (animals: Animal[]) => {
        animals.filter((animal) => 
            animal.getFood() > animal.getFoodConsumptionPerTurn() * this.settings.offspringDelay
        ).forEach((animal) => {
            const random = Math.random();
            if (random < animal.desire) {
                const offspring = getOffspring(animal);
                animals.push(offspring);
                animal.eatFood(-offspring.getFood());
            }
        });
    }

    getRandomBool = () => {
        return Math.random() < 0.5;
    }
}

export default Simulator;