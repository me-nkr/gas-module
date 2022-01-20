const { requireFile } = require('../src');

describe('Single File', () => {
    it('should throw error if file name is not a string', () => {
        expect(() => requireFile(25)).toThrowError('fileName: Expected string, number given');
        expect(() => requireFile()).toThrowError('fileName: Expected string, undefined given');
        expect(() => requireFile([])).toThrowError('fileName: Expected string, object given');
        expect(() => requireFile({})).toThrowError('fileName: Expected string, object given');
        expect(() => requireFile(true)).toThrowError('fileName: Expected string, boolean given');
        expect(() => requireFile(false)).toThrowError('fileName: Expected string, boolean given');
    });
    it('should throw error if options is not an object or undefined', () => {
        expect(() => requireFile('./__tests__/mocks/one.js', 25)).toThrowError('options: Expected object, number given');
        expect(() => requireFile('./__tests__/mocks/one.js', [])).toThrowError('options: Expected object, array given');
        expect(() => requireFile('./__tests__/mocks/one.js', '')).toThrowError('options: Expected object, string given');
        expect(() => requireFile('./__tests__/mocks/one.js', true)).toThrowError('options: Expected object, boolean given');
        expect(() => requireFile('./__tests__/mocks/one.js', false)).toThrowError('options: Expected object, boolean given');
        expect(() => requireFile('./__tests__/mocks/one.js')).not.toThrowError();
    });

    it('should throw error if options.mocks is not an object or undefined', () => {
        expect(() => requireFile('./__tests__/mocks/one.js', { mocks: 'mock' })).toThrowError('mocks: Expected object, string given');
        expect(() => requireFile('./__tests__/mocks/one.js', { mocks: 25 })).toThrowError('mocks: Expected object, number given');
        expect(() => requireFile('./__tests__/mocks/one.js', { mocks: [] })).toThrowError('mocks: Expected object, array given');
        expect(() => requireFile('./__tests__/mocks/one.js', { mocks: true })).toThrowError('mocks: Expected object, boolean given');
        expect(() => requireFile('./__tests__/mocks/one.js', { mocks: false })).toThrowError('mocks: Expected object, boolean given');
        expect(() => requireFile('./__tests__/mocks/one.js', { mocks: undefined })).not.toThrowError();
    });

    it('should throw error on non \'.js\' or \'.ts\' file name', () => {
        expect(() => requireFile('test.txt')).toThrowError('fileName: Invalid file type');
        expect(() => requireFile('test.json')).toThrowError('fileName: Invalid file type');
        expect(() => requireFile('test.c')).toThrowError('fileName: Invalid file type');
    });
    it('should throw error when given file does\'nt exist', () => {
        expect(() => requireFile('nonExisting.js')).toThrowError('fileName: File not found')
    });

    describe('On Success', () => {
        const oneResult = requireFile('./__tests__/mocks/one.js');
        const twoResult = requireFile('./__tests__/mocks/two.js');
        const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
        const twojs = {
            duo: 'function duo() {\n    console.log(\'duo\');\n}',
            dos: 'function dos() {\n    console.log(\'dos\');\n}'
        }
        it('should return an object', () => {
            expect(typeof oneResult).toBe('object');
            expect(typeof twoResult).toBe('object');
        });
        it('should have all the functions in the file', () => {
            expect(oneResult).toHaveProperty('uno');
            expect(oneResult.uno.toString()).toBe(onejs);
            expect(twoResult).toHaveProperty('duo');
            expect(twoResult).toHaveProperty('dos');
            expect(twoResult.duo.toString()).toBe(twojs.duo);
            expect(twoResult.dos.toString()).toBe(twojs.dos);
        });
        describe('With mocks', () => {
            const mocks = {
                editor: 'vscode',
                hotel: 'trivago'
            }
            const result = requireFile('./__tests__/mocks/zero.ts', { mocks: mocks });

            const zerots = 'function nada() {\n    console.log(\'nada\');\n}';

            it('should have properties form mocks in returning object', () => {
                expect(result).toHaveProperty('editor');
                expect(result.editor).toBe(mocks.editor);
                expect(result).toHaveProperty('hotel');
                expect(result.hotel).toBe(mocks.hotel);
                expect(result).toHaveProperty('nada');
                expect(result.nada.toString()).toBe(zerots);

            })
        })
    });
});