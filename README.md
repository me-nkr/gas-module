# gas-module

![npm](https://img.shields.io/npm/v/gas-module) [![GitHub license](https://img.shields.io/github/license/me-nkr/gas-module)](https://github.com/me-nkr/gas-module/blob/main/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/me-nkr/gas-module)](https://github.com/me-nkr/gas-module/issues)

import local google appscript files written with `.js` or `.ts` extension for testing

## Install

```
$ npm install gas-module
```

## Usage

`requireFile()`
-
- `fileName` - name or path of file to be imported
- `options` (optional)
    - `mocks` - object containing mock variables and functions

`requireDir()`
-
- `dirName` - name or path of directory containing files to be imported
- `recursion`
    - `true` to import files from subdirectories too
    - `false` to ignore subdirectories
- `options` (optional)
    - `filterExtension`
        - `['.js']` for files with .js extension (default if left `undefined`)
        - `['.ts']` for files with .ts extension
        - `['.js', '.ts']` for files with .js and .ts extensions
    - `mocks` - object containing mock variables and functions
    - `order` - array of filenames in desired order of execusion, if there is files that is not in the array, it will be executed after

## Example

### import a file

```js
const { requireFile } = require('gas-module');

const file = requireFile('filename.js');

//run function defined in file

file.myFunction();
```

#### import with mocks

```js
const { requireFile } = require('gas-module');

const mock = {
    editor: 'vscode',
    hotel: 'trivago'
}
const file = requireFile('filename.js', { mocks: mock});

// run function defined in file

file.myFunction();

// use mock varibale

console.log(file.editor);
```

### import a directory

#### read only `.js` files and ignore subdirectories

```js
const { requireDir } = require('gas-module');

const functions = requireDir('directoryname', false, { filterExtension: ['.js']})

// run function defined in any file

functions.myFunction();
```

#### read only `.ts` files including ones from subdirectories

```js
const { requireDir } = require('gas-module');

const functions = requireDir('directoryname', true, { filterExtension: ['.ts']})

// run function defined in any file

functions.myFunction();
```

#### read from both `.js` and `.ts` files

```js
const { requireDir } = require('gas-module');

const functions = requireDir('directoryname', true, { filterExtension: ['.js', '.ts']})

// run function defined in any file

functions.myFunction();
```

#### import with mocks

```js
const { requireDir } = require('gas-module');

const mock = {
    editor: 'vscode',
    hotel: 'trivago'
}
const file = requireDir('directoryname', false, { mocks: mock});

// run function defined in file

file.myFunction();

// use mock varibale

console.log(file.editor);
```