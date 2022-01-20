const { requireDir } = require('../src');

describe('Directory', () => {
    it('should throw error if directory name is not a string', () => {
        expect(() => requireDir(25)).toThrowError('dirName: Expected string, number given');
        expect(() => requireDir()).toThrowError('dirName: Expected string, undefined given');
        expect(() => requireDir([])).toThrowError('dirName: Expected string, object given');
        expect(() => requireDir({})).toThrowError('dirName: Expected string, object given');
        expect(() => requireDir(true)).toThrowError('dirName: Expected string, boolean given');
        expect(() => requireDir(false)).toThrowError('dirName: Expected string, boolean given');
    });
    it('should throw error if given is not directory', () => {
        expect(() => requireDir('./__tests__/mocks/invalidDir')).toThrowError('dirName: Directory not found');
        expect(() => requireDir('./__tests__/mocks/invalidDir', false, {})).toThrowError('dirName: Directory not found');
        expect(() => requireDir('./__tests__/mocks/invalidDir', true)).toThrowError('dirName: Directory not found');
        expect(() => requireDir('./__tests__/mocks/one.js')).toThrowError('dirName: Directory not found');
    });
    it('should throw error if recrsion is not a boolean', () => {
        expect(() => requireDir('./__tests__/mocks/validDir', 25)).toThrowError('recursion: Expected boolean, number given');
        expect(() => requireDir('./__tests__/mocks/validDir', [])).toThrowError('recursion: Expected boolean, object given');
        expect(() => requireDir('./__tests__/mocks/validDir', {})).toThrowError('recursion: Expected boolean, object given');
        expect(() => requireDir('./__tests__/mocks/validDir', 'true')).toThrowError('recursion: Expected boolean, string given');
        expect(() => requireDir('./__tests__/mocks/validDir', 'false')).toThrowError('recursion: Expected boolean, string given');
    });
    it('should throw error if options is not an object', () => {
        expect(() => requireDir('./__tests__/mocks/validDir', false, 25)).toThrowError('options: Expected object, number given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, [])).toThrowError('options: Expected object, array given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, '')).toThrowError('options: Expected object, string given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, true)).toThrowError('options: Expected object, boolean given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, false)).toThrowError('options: Expected object, boolean given');
    });
    it('should throw error if options.filterExtention is not an array', () => {
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: '.js' })).toThrowError('options: Expected array, string given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: 25 })).toThrowError('options: Expected array, number given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: {} })).toThrowError('options: Expected array, object given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: true })).toThrowError('options: Expected array, boolean given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: false })).toThrowError('options: Expected array, boolean given');
    });
    it('should throw error if options.filterExtention is neither of [\'.js\'], [\'.ts\'], [\'.js\', \'.ts\'] or undefined', () => {
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: ['c'] })).toThrowError('options: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [25] })).toThrowError('options: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [{}] })).toThrowError('options: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [true] })).toThrowError('options: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [] })).toThrowError('options: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [[]] })).toThrowError('options: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: ['.js', '.ts', '.ss'] })).toThrowError('options: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: undefined })).not.toThrowError();
    });

    describe('On Sucess', () => {
        const result = requireDir('./__tests__/mocks/validDir', false, { filterExtension: ['.js', '.ts'] });
        it('should return an object', () => {
            expect(typeof result).toBe('object');
        });

        describe('Recursion is true', () => {
            const result = requireDir('./__tests__/mocks/validDir', true, { filterExtension: ['.js', '.ts'] });
            const zerots = 'function nada() {\n    console.log(\'nada\');\n}';
            const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
            const twojs = {
                duo: 'function duo() {\n    console.log(\'duo\');\n}',
                dos: 'function dos() {\n    console.log(\'dos\');\n}'
            }
            const threejs = 'function theen() {\n    console.log(\'theen\');\n}';
            const fourts = 'function quad() {\n    console.log(\'quad\');\n}';
            it('should have functions in the deepest file in the returning object', () => {
                expect(result).toHaveProperty('nada');
                expect(result.nada.toString()).toBe(zerots);
                expect(result).toHaveProperty('uno');
                expect(result.uno.toString()).toBe(onejs);
                expect(result).toHaveProperty('duo');
                expect(result).toHaveProperty('dos');
                expect(result.duo.toString()).toBe(twojs.duo);
                expect(result.dos.toString()).toBe(twojs.dos);
                expect(result).toHaveProperty('theen');
                expect(result.theen.toString()).toBe(threejs);
                expect(result).toHaveProperty('quad');
                expect(result.quad.toString()).toBe(fourts);
            });
        });

        describe('Recursion is false', () => {
            const result = requireDir('./__tests__/mocks/validDir', false, { filterExtension: ['.js', '.ts'] });
            const zerots = 'function nada() {\n    console.log(\'nada\');\n}';
            const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
            const twojs = {
                duo: 'function duo() {\n    console.log(\'duo\');\n}',
                dos: 'function dos() {\n    console.log(\'dos\');\n}'
            }

            it('should not have functions in the file in the subdirectory in the returning object', () => {
                expect(result).toHaveProperty('nada');
                expect(result.nada.toString()).toBe(zerots);
                expect(result).toHaveProperty('uno');
                expect(result.uno.toString()).toBe(onejs);
                expect(result).toHaveProperty('duo');
                expect(result).toHaveProperty('dos');
                expect(result.duo.toString()).toBe(twojs.duo);
                expect(result.dos.toString()).toBe(twojs.dos);
                expect(result).not.toHaveProperty('theen');
                expect(result).not.toHaveProperty('quad');
            });
        });

        describe('Recursion is undefined', () => {
            const result = requireDir('./__tests__/mocks/validDir', undefined, { filterExtension: ['.js', '.ts'] });
            const zerots = 'function nada() {\n    console.log(\'nada\');\n}';
            const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
            const twojs = {
                duo: 'function duo() {\n    console.log(\'duo\');\n}',
                dos: 'function dos() {\n    console.log(\'dos\');\n}'
            }

            it('should not have functions in the file in the subdirectory in the returning object', () => {
                expect(result).toHaveProperty('nada');
                expect(result.nada.toString()).toBe(zerots);
                expect(result).toHaveProperty('uno');
                expect(result.uno.toString()).toBe(onejs);
                expect(result).toHaveProperty('duo');
                expect(result).toHaveProperty('dos');
                expect(result.duo.toString()).toBe(twojs.duo);
                expect(result.dos.toString()).toBe(twojs.dos);
                expect(result).not.toHaveProperty('theen');
                expect(result).not.toHaveProperty('quad');
            });
        });

        describe('Recursion and options is undefined', () => {
            const result = requireDir('./__tests__/mocks/validDir');
            const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
            const twojs = {
                duo: 'function duo() {\n    console.log(\'duo\');\n}',
                dos: 'function dos() {\n    console.log(\'dos\');\n}'
            }

            it('should have functions in the files from given directory in the returning object', () => {
                expect(result).toHaveProperty('uno');
                expect(result.uno.toString()).toBe(onejs);
                expect(result).toHaveProperty('duo');
                expect(result).toHaveProperty('dos');
                expect(result.duo.toString()).toBe(twojs.duo);
                expect(result.dos.toString()).toBe(twojs.dos);

            })

            it('should not have functions in the file in the subdirectory or \'.ts\' files in the returning object', () => {
                expect(result).not.toHaveProperty('nada');
                expect(result).not.toHaveProperty('theen');
                expect(result).not.toHaveProperty('quad');
            });
        });

        describe('Options is undefined', () => {
            const result = requireDir('./__tests__/mocks/validDir', true, undefined);
            const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
            const twojs = {
                duo: 'function duo() {\n    console.log(\'duo\');\n}',
                dos: 'function dos() {\n    console.log(\'dos\');\n}'
            }
            const threejs = 'function theen() {\n    console.log(\'theen\');\n}';

            it('should have functions from \'.js\' files', () => {
                expect(result).toHaveProperty('uno');
                expect(result.uno.toString()).toBe(onejs);
                expect(result).toHaveProperty('duo');
                expect(result).toHaveProperty('dos');
                expect(result.duo.toString()).toBe(twojs.duo);
                expect(result.dos.toString()).toBe(twojs.dos);
                expect(result).toHaveProperty('theen');
                expect(result.theen.toString()).toBe(threejs);
            });
            it('should not have functions from \'.ts\' files', () => {
                expect(result).not.toHaveProperty('nada');
                expect(result).not.toHaveProperty('quad');
            });
        });

        describe('FilterExtension is \'.js\'', () => {
            const result = requireDir('./__tests__/mocks/validDir', true, { filterExtension: ['.js'] });
            const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
            const twojs = {
                duo: 'function duo() {\n    console.log(\'duo\');\n}',
                dos: 'function dos() {\n    console.log(\'dos\');\n}'
            }
            const threejs = 'function theen() {\n    console.log(\'theen\');\n}';

            it('should have functions from \'.js\' files', () => {
                expect(result).toHaveProperty('uno');
                expect(result.uno.toString()).toBe(onejs);
                expect(result).toHaveProperty('duo');
                expect(result).toHaveProperty('dos');
                expect(result.duo.toString()).toBe(twojs.duo);
                expect(result.dos.toString()).toBe(twojs.dos);
                expect(result).toHaveProperty('theen');
                expect(result.theen.toString()).toBe(threejs);
            });
            it('should not have functions from \'.ts\' files', () => {
                expect(result).not.toHaveProperty('nada');
                expect(result).not.toHaveProperty('quad');
            });
        });

        describe('FilterExtension is \'.ts\'', () => {
            const result = requireDir('./__tests__/mocks/validDir', true, { filterExtension: ['.ts'] });
            const zerots = 'function nada() {\n    console.log(\'nada\');\n}';
            const fourts = 'function quad() {\n    console.log(\'quad\');\n}';
            it('should have functions from \'.ts\' files', () => {
                expect(result).toHaveProperty('nada');
                expect(result.nada.toString()).toBe(zerots);
                expect(result).toHaveProperty('quad');
                expect(result.quad.toString()).toBe(fourts);
            });
            it('should not have functions from \'.js\' files', () => {
                expect(result).not.toHaveProperty('uno');
                expect(result).not.toHaveProperty('duo');
                expect(result).not.toHaveProperty('dos');
                expect(result).not.toHaveProperty('theen');
            });
        });

        describe('FilterExtension is \'.js\' and \'.ts\'', () => {
            const result = requireDir('./__tests__/mocks/validDir', true, { filterExtension: ['.js', '.ts'] });
            const zerots = 'function nada() {\n    console.log(\'nada\');\n}';
            const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
            const twojs = {
                duo: 'function duo() {\n    console.log(\'duo\');\n}',
                dos: 'function dos() {\n    console.log(\'dos\');\n}'
            }
            const threejs = 'function theen() {\n    console.log(\'theen\');\n}';
            const fourts = 'function quad() {\n    console.log(\'quad\');\n}';
            it('should have all functions from both \'.js\' and \'.ts\' files', () => {
                expect(result).toHaveProperty('nada');
                expect(result.nada.toString()).toBe(zerots);
                expect(result).toHaveProperty('uno');
                expect(result.uno.toString()).toBe(onejs);
                expect(result).toHaveProperty('duo');
                expect(result).toHaveProperty('dos');
                expect(result.duo.toString()).toBe(twojs.duo);
                expect(result.dos.toString()).toBe(twojs.dos);
                expect(result).toHaveProperty('theen');
                expect(result.theen.toString()).toBe(threejs);
                expect(result).toHaveProperty('quad');
                expect(result.quad.toString()).toBe(fourts);

            });
        });

    });
});