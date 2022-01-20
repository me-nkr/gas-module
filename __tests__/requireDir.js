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
    it('should throw error if options is not an object or undefined', () => {
        expect(() => requireDir('./__tests__/mocks/validDir', false, 25)).toThrowError('options: Expected object, number given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, [])).toThrowError('options: Expected object, array given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, '')).toThrowError('options: Expected object, string given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, true)).toThrowError('options: Expected object, boolean given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, false)).toThrowError('options: Expected object, boolean given');
    });
    it('should throw error if options.filterExtention is not an array or undefined', () => {
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: '.js' })).toThrowError('filterExtension: Expected array, string given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: 25 })).toThrowError('filterExtension: Expected array, number given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: {} })).toThrowError('filterExtension: Expected array, object given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: true })).toThrowError('filterExtension: Expected array, boolean given');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: false })).toThrowError('filterExtension: Expected array, boolean given');
    });
    it('should throw error if options.filterExtention is neither of [\'.js\'], [\'.ts\'], [\'.js\', \'.ts\'] or undefined', () => {
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: ['c'] })).toThrowError('filterExtension: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [25] })).toThrowError('filterExtension: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [{}] })).toThrowError('filterExtension: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [true] })).toThrowError('filterExtension: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [] })).toThrowError('filterExtension: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: [[]] })).toThrowError('filterExtension: invalid file type');
        expect(() => requireDir('./__tests__/mocks/validDir', false, { filterExtension: ['.js', '.ts', '.ss'] })).toThrowError('filterExtension: invalid file type');
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

    describe('On files having dependancy in other files', () => {
        describe('On Error', () => {

            it('should throw error if options.mocks is not an object or undefined', () => {
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { mocks: 'mock' })).toThrowError('mocks: Expected object, string given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { mocks: 25 })).toThrowError('mocks: Expected object, number given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { mocks: [] })).toThrowError('mocks: Expected object, array given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { mocks: true })).toThrowError('mocks: Expected object, boolean given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { mocks: false })).toThrowError('mocks: Expected object, boolean given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { mocks: undefined })).not.toThrowError();
            });

            it('should throw error if options.order is not an array or undefined', () => {
                expect(() => requireDir('./__tests__/order/depenDir', false, { order: 'order' })).toThrowError('order: Expected array, string given');
                expect(() => requireDir('./__tests__/order/depenDir', false, { order: 25 })).toThrowError('order: Expected array, number given');
                expect(() => requireDir('./__tests__/order/depenDir', false, { order: {} })).toThrowError('order: Expected array, object given');
                expect(() => requireDir('./__tests__/order/depenDir', false, { order: true })).toThrowError('order: Expected array, boolean given');
                expect(() => requireDir('./__tests__/order/depenDir', false, { order: false })).toThrowError('order: Expected array, boolean given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: undefined })).not.toThrowError();
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: [] })).not.toThrowError();
            });

            it('should throw error if options.order contains a non string value', () => {
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: [undefined] })).toThrowError('order: Expected string, undefined given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: [23] })).toThrowError('order: Expected string, number given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: [{}] })).toThrowError('order: Expected string, object given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: [[]] })).toThrowError('order: Expected string, array given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: [true] })).toThrowError('order: Expected string, boolean given');
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: [false] })).toThrowError('order: Expected string, boolean given');
            });

            it('should throw error if options.order contains a non-existing filename', () => {
                expect(() => requireDir('./__tests__/mocks/depenDir', false, { order: ['invalidFile'] })).toThrowError('order: invalidFile does not exist');
            });

            it('should throw error when undefined variable is referenced', () => {
                expect(() => requireDir('./__tests__/mocks/depenDir/deep/')).toThrowError('ReferenceError : \'invalid\' is not defined \n this might be because file, which defined \'invalid\', have not executed yet');

            });

            it('should throw error when variable defined, in another file that is not executed yet, is referenced', () => {
                expect(() => requireDir('./__tests__/mocks/depenDir/')).toThrowError('ReferenceError : \'midvar\' is not defined \n this might be because file, which defined \'midvar\', have not executed yet');

            });
        });

        describe('On Success', () => {
            it('should have properties of mock object in returning object', () => {
                const mocks = {
                    editor: 'vscode',
                    hotel: 'trivago'
                };
                const onejs = 'function uno() {\n    console.log(\'uno\');\n}';
                const result = requireDir('./__tests__/mocks/validDir/', false, { mocks: mocks });

                expect(result).toHaveProperty('editor');
                expect(result.editor).toBe(mocks.editor);
                expect(result).toHaveProperty('hotel');
                expect(result.editor).toBe(mocks.hotel);
                expect(result).toHaveProperty('one');
                expect(result.one).toBe(onejs);
            });
            it('should execute dependant file without error', () => {
                let result;
                expect(() => result = requireDir('./__tests__/mocks/depenDir/deep/', false, {
                    order: [
                        'second.js',
                        'first.js'
                    ]
                })).not.toThrowError();

                expect(result).toHaveProperty('invalid');
                expect(result.invalid).toBe('mock');
                expect(result).toHaveProperty('single');
                expect(result.single).toBe('mock');
            });
            it('should execute files in order', () => {
                let result;
                expect(() => result = requireDir('./__tests__/mocks/depenDir/', false, {
                    order: [
                        'top.js',
                        'mid.js'
                    ]
                })).not.toThrowError();

                expect(result).toHaveProperty('topvar');
                expect(result.topvar).toBe('top');
                expect(result).toHaveProperty('topfun');
                expect(result.topfun()).toBe('top');
                expect(result).toHaveProperty('midvar');
                expect(result.midvar).toBe('mid');
                expect(result).toHaveProperty('midfun');
                expect(result.midfun()).toBe('top');
                expect(result).toHaveProperty('secfun');
                expect(result.secfun()).toBe(true);
                expect(result).toHaveProperty('botvar');
                expect(result.botvar).toBe('mid');
                expect(result).toHaveProperty('botfun');
                expect(result.botfun()).toBe('yin');
                expect(result).toHaveProperty('lastfun');
                expect(result.lastfun()).toBe('top');

            })
        });
    });
});