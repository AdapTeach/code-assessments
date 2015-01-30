describe("A suite", function () {
    describe("with a nested context", function () {
        it("contains spec with an expectation", function () {
            expect(true).toBe(true);
        });
        it("passes", function () {
            expect(true).toBe(true);
        });
    });
});