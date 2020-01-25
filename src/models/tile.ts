class Tile {
    food: number;
    maxFood: number;

    constructor(maxFood: number) {
        this.food = maxFood / 2;
        this.maxFood = maxFood;
    }

    getFood(): number {
        return this.food;    
    }

    eatFood(amount: number) {
        this.food -= Math.min(amount, this.food);

    }

    growFood(amount: number) {
        this.food += Math.min(amount, this.maxFood - this.food)
    }

    isAtMax() {
        return this.food === this.maxFood;
    }
}

export default Tile;