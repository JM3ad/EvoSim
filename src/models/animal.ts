import Position from "./position";
import { validate } from "@babel/types";

class Animal {
    name: string;
    position: Position;
    height: number;
    speed: number;
    lifespan: number;
    age: number;
    desire: number;
    food: number;

    constructor(name: string, position: Position, height: number, speed: number, lifespan: number, desire: number) {
        this.name = name;
        this.position = position;
        this.speed = speed;
        this.lifespan = lifespan;
        this.desire = Math.min(desire, 1);
        this.height = height;        
        this.age = 0;
        // to be passed in?
        this.food = 5;
    }

    getFood(): number {
        return this.food;
    }

    getMaxFood(): number {
        return this.height * 10;
    }

    eatFood(amount: number) {
        this.food += Math.min(amount, this.getMaxFood() - this.food);
    }

    passTurn() {
        this.age++;
    }

    isAlive() {
        return this.age <= this.lifespan;
    }

    getAge() {
        return this.age;
    }
}

export default Animal;