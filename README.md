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

`requireDir()`
-
- `dirName` - name or path of directory containing files to be imported
- `recursion`
    - `true` to import files from subdirectories too
    - `false` to ignore subdirectories
- `options`
    - `filterExtension`
        - `['.js']` for files with .js extension (default if left `undefined`)
        - `['.ts']` for files with .ts extension
        - `['.js', '.ts']` for files with .js and .ts extensions

## Example

### import a file

```js
const { requireFile } = require('gas-module');

const file = requireFile('filename.js');

//run function defined in file

file.myFunction();
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