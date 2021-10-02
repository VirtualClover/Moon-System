import * as universe from './universe';

test('all valuse should be hex colors', () => {

    for (const property in universe) {
        expect(property).toBeDefined();
        expect(universe[property]).toMatch(/^#[0-9a-f]{6}/i);

    }
});
