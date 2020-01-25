import Position from "./position";

test('position from hashcode has same coordinates as original position', () => {
    // given
    const position = new Position(15, 22);
    const hashcode = position.getHashCode();

    // when
    const newPosition = Position.getPositionFromHashCode(hashcode);

    // then
    expect(newPosition.x).toEqual(position.x);
    expect(newPosition.y).toEqual(position.y);
})