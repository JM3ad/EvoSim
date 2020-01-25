class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        if (x >= 1000 || y >= 1000) {
            throw new Error('grid size is limited to 1000 or less');
        }
        this.x = x;
        this.y = y;
    }

    getHashCode(): number {
        return this.x * 1000 + this.y * 1000;
    }
}

export default Position;