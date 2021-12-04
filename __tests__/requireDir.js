const { requireDir } = require('../src');

describe('Directory', () => {
    it('should throw error if directory name is not a string', () => {
       expect(requireDir(25)).toThrowError('dirName: Expected string, number given'); 
       expect(requireDir()).toThrowError('dirName: Expected string, undefined given'); 
       expect(requireDir([])).toThrowError('dirName: Expected string, object given'); 
       expect(requireDir({})).toThrowError('dirName: Expected string, object given'); 
       expect(requireDir(true)).toThrowError('dirName: Expected string, boolean given'); 
       expect(requireDir(false)).toThrowError('dirName: Expected string, boolean given'); 
    });
    it('should throw error if given is not directory', () => {
        expect(requireDir('invalidDir')).toThrowError('dirName: Directory not found');
        expect(requireDir('invalidDir', false, {})).toThrowError('dirName: Directory not found');
        expect(requireDir('invalidDir', true)).toThrowError('dirName: Directory not found');
    });
    it('should throw error if recrsion is not a boolean', () => {
       expect(requireDir('validDir', 25)).toThrowError('recursion: Expected boolean, number given'); 
       expect(requireDir('validDir', [])).toThrowError('recursion: Expected boolean, object given'); 
       expect(requireDir('validDir', {})).toThrowError('recursion: Expected boolean, object given'); 
       expect(requireDir('validDir', 'true')).toThrowError('recursion: Expected boolean, string given'); 
       expect(requireDir('validDir', 'false')).toThrowError('recursion: Expected boolean, string given'); 
    });
    it('should throw error if options is not an object', () => {
       expect(requireDir('validDir', false, 25)).toThrowError('options: Expected object, number given'); 
       expect(requireDir('validDir', false, [])).toThrowError('options: Expected object, array given'); 
       expect(requireDir('validDir', false, '')).toThrowError('options: Expected object, string given'); 
       expect(requireDir('validDir', false, true)).toThrowError('options: Expected object, boolean given'); 
       expect(requireDir('validDir', false, false)).toThrowError('options: Expected object, boolean given'); 
    });
    it('should throw error if options.filterExtention is not an array', () => {
       expect(requireDir('validDir', false, { filrerExtension: '.js'})).toThrowError('options: Expected array, string given'); 
       expect(requireDir('validDir', false, { filrerExtension: 25})).toThrowError('options: Expected array, number given'); 
       expect(requireDir('validDir', false, { filrerExtension: {}})).toThrowError('options: Expected array, object given'); 
       expect(requireDir('validDir', false, { filrerExtension: true})).toThrowError('options: Expected array, boolean given'); 
       expect(requireDir('validDir', false, { filrerExtension: false})).toThrowError('options: Expected array, boolean given'); 
    });
    it('should throw error if options.filterExtention is neither of [\'.js\'] or [\'.ts\'] or [\'.js\', \'.ts\']', () => {
       expect(requireDir('validDir', false, { filterExtension: ['c']})).toThrowError('options: invalid file type'); 
       expect(requireDir('validDir', false, { filterExtension: [25]})).toThrowError('options: invalid file type'); 
       expect(requireDir('validDir', false, { filterExtension: [{}]})).toThrowError('options: invalid file type'); 
       expect(requireDir('validDir', false, { filterExtension: [true]})).toThrowError('options: invalid file type'); 
       expect(requireDir('validDir', false, { filterExtension: []})).toThrowError('options: invalid file type'); 
       expect(requireDir('validDir', false, { filterExtension: [[]]})).toThrowError('options: invalid file type'); 
       expect(requireDir('validDir', false, { filterExtension: ['.js', '.ts', '.ss']})).toThrowError('options: invalid file type'); 
    });

    describe('On Sucess', () => {
        const result = requireDir('validDir', false, {filterExtension: ['.js']});
        it('should return an object', () => {
            expect(typeof result).toBe('object');
        });

        describe('Recursion is true', () => {
            it.todo('should have functions in the deepest file in the returning object');
		});

        describe('Recursion is false', () => {
            it.todo('should not have functions in the file in the subdirectory in the returning object');
		});

        describe('FileExtension is \'.js\'', () => {
            it.todo('should not have functions from \'.ts\' files');
		});

        describe('FileExtension is \'.ts\'', () => {
            it.todo('should not have functions from \'.js\' files');
		});

        describe('FileExtension is \'.js\' and \'.ts\'', () => {
            it.todo('should have all functions from both \'.js\' and \'.ts\' files');
		});

    });
});