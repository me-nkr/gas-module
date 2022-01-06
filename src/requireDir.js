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
module.exports = (directory, recursion, options) => {
    if (typeof directory !== 'string') throw Error(`dirName: Expected string, ${typeof directory} given`);
    if (!(fs.existsSync(directory) && fs.statSync(directory).isDirectory())) throw Error('dirName: Directory not found');
    if (typeof recursion !== 'boolean') throw Error(`recursion: Expected boolean, ${typeof recursion} given`);
    if (typeof options !== 'object' || options instanceof Array) throw Error(`options: Expected object, ${options instanceof Array ? 'array' : typeof options} given`);
    options.filterExtension = options.filterExtension === undefined ? ['.js'] : options.filterExtension;
    if (!(options.filterExtension instanceof Array)) throw Error(`options: Expected array, ${typeof options.filterExtension} given`);
    // console.log(directory, recursion, options);
    if (options.filterExtension < 1 || !(options.filterExtension.every(extension => /^(\.js|\.ts)$/.test(extension)))) throw Error('options: invalid file type');

    const context = vm.createContext({});

    const loadDirectory = directory => {
        let files = [];
        const content = fs.readdirSync(directory);
        content.forEach(file => {
            file = directory + '/' + file;
            if (fs.statSync(file).isDirectory()) {
                if (recursion) files = files.concat(loadDirectory(file));
            } else if (options.filterExtension.some(extension => extension === path.extname(file))) files.push(file);
        });
        return files;
    };

    const codeFiles = loadDirectory(directory);

    codeFiles.forEach(file => {
        const code = fs.readFileSync(file);

        try {
            vm.runInContext(code, context);
        }
        catch (error) {
            throw error;
        }
    })

    return context;
}