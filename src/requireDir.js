/**
 * requireDir - convert google app script files in the directory into a javascript module
 * @param {String} directory - path of directory to be converted into module
 * @param {Boolean} recursion - decides to ignore or consider subdirectories
 * @param {Object} options : {
 *  filterExtensions: default- .js
 * }
 * @returns {Object}
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path')
module.exports = (directory, recursion = false, options = {}) => {
    if (typeof directory !== 'string') throw Error(`dirName: Expected string, ${typeof directory} given`);
    if (!(fs.existsSync(directory) && fs.statSync(directory).isDirectory())) throw Error('dirName: Directory not found');
    directory = directory.replace(/\/$/, '');
    if (typeof recursion !== 'boolean') throw Error(`recursion: Expected boolean, ${typeof recursion} given`);
    if (typeof options !== 'object' || options instanceof Array) throw Error(`options: Expected object, ${options instanceof Array ? 'array' : typeof options} given`);
    options.filterExtension = options.filterExtension === undefined ? ['.js'] : options.filterExtension;
    if (!(options.filterExtension instanceof Array)) throw Error(`filterExtension: Expected array, ${typeof options.filterExtension} given`);
    if (options.filterExtension.length < 1 || !(options.filterExtension.every(extension => /^(\.js|\.ts)$/.test(extension)))) throw Error('filterExtension: invalid file type');
    if (options.mocks !== undefined && (typeof options.mocks !== 'object' || options.mocks instanceof Array)) throw Error(`mocks: Expected object, ${options.mocks instanceof Array ? 'array' : typeof options.mocks} given`);
    if (options.order !== undefined && !(options.order instanceof Array)) throw Error(`order: Expected array, ${typeof options.order} given`);
    if (options.order !== undefined && !(options.order.every(file => typeof file === 'string'))) throw Error('order: invalid filename given')

    const context = options.mocks ? vm.createContext(options.mocks) : vm.createContext({});

    const loadDirectory = directory => {
        let files = {};
        const content = fs.readdirSync(directory);
        content.forEach(file => {
            file = directory + '/' + file;
            if (fs.statSync(file).isDirectory()) {
                if (recursion) files = { ...files, ...loadDirectory(file) };
            } else if (options.filterExtension.some(extension => extension === path.extname(file))) files[file] = null;
        });
        return files;
    };

    const codeFiles = loadDirectory(directory);
    const orderedFiles = [];

    if (options.order !== undefined) {
        options.order.forEach(file => {
            if (codeFiles[file] === undefined) throw Error(`order: ${file} does not exist`)
            orderedFiles.push(file);
            delete codeFiles[file];
        })
    }
    if (Object.keys(codeFiles).length > 0) {
        Object.entries(codeFiles).forEach(([file, value]) => {
            orderedFiles.push(file);
        });
    }

    orderedFiles.forEach(file => {
        const code = fs.readFileSync(file);

        try {
            vm.runInContext(code, context);
        }
        catch (error) {
            if (/is\snot\sdefined$/.test(error.message)) throw Error(`ReferenceError: ${error.message} \n this might be because file, which defined the variable, have not executed yet`);
            throw error;
        }
    })

    return context;
}