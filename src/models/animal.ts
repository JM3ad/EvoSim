import Position from "./position";

class Animal {
    name: string;
    position: Position;
    height: number;
    speed: number;
    lifespan: number;
    age: number;
    desire: number;
    food: number;

    constructor(
        name: string,
        position: Position,
        height: number,
        speed: number,
        lifespan: number,
        desire: number
        ) {
        this.name = name;
        this.position = position;
        this.speed = speed;
        this.lifespan = lifespan;
        this.desire = Math.min(desire, 1);
        this.height = height;        
        this.age = 0;
        // to be passed in?
        this.food = this.getFoodConsumptionPerTurn() * 4;
    }

    getFood(): number {
        return this.food;
    }

    getMaxFood(): number {
        return this.height * this.height * 50;
    }

    getMaxEatPerTurn(): number {
        return 3 * this.speed * this.speed * this.height;
    }

    eatFood(amount: number) {
        this.food += Math.min(amount, this.getMaxFood() - this.food);
    }

    passTurn() {
        this.age++;
        this.food -= this.getFoodConsumptionPerTurn();
    }

    getFoodConsumptionPerTurn() {
        return this.height * this.speed;
    }

    isAlive() {
        return this.age <= this.lifespan && this.food > 0;
    }

    getAge() {
        return this.age;
    }

    isAt(position: Position) {
        return this.position.x === position.x && this.position.y === position.y;
    }
}

export default Animal;