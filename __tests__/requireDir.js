const { requireDir } = require('../src');

describe('Directory', () => {
    it.todo('should throw error if directory name is not a string');
    it.todo('should throw error if given is not directory');
    it.todo('should throw error if recrsion is not a boolean');
    it.todo('should throw error if options is not an object');
    it.todo('should throw error if options.filterExtention is not a string or an array');
    it.todo('should throw error if options.filterExtention is neither of [\'.js\'] or [\'.ts\'] or [\'.js\', \'.ts\']');

    describe('On Sucess', () => {
        it.todo('should return an object');

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