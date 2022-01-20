/**
 * requireFile - convert a google app script file into a javascript module
 * @param {String} file - path of file to be converted into module
 * @param {Object} options - { mocks: [] }
 * @returns {Object}
 */
const fs = require('fs');
const vm = require('vm');
module.exports = (file, options = {}) => {
    if (typeof file !== 'string') throw Error(`fileName: Expected string, ${typeof file} given`);
    if (typeof options !== 'object' || options instanceof Array) throw Error(`options: Expected object, ${options instanceof Array ? 'array' : typeof options} given`);
    if (options.mocks !== undefined && (typeof options.mocks !== 'object' || options.mocks instanceof Array)) throw Error(`mocks: Expected object, ${options.mocks instanceof Array ? 'array' : typeof options.mocks} given`);
    if (!/(\.js|\.ts)$/.test(file)) throw Error('fileName: Invalid file type');
    try {
        const code = fs.readFileSync(file, 'utf8');
        const context = vm.createContext({});
        try {
            vm.runInContext(code, context);
        }
        catch (error) {
            throw error;
        }

        return context;
    }
    catch (error) {
        if (error.code === 'ENOENT') throw Error('fileName: File not found');
    }
}