#!/usr/bin/env node

/*
 * Using libraries within examples and linking them within packages.json like:
 * "react-native-library-name": "file:../"
 * will cause problems with the metro bundler if the example will run via
 * `react-native run-[ios|android]`. This will result in an error as the metro
 * bundler will find multiple versions for the same module while resolving it.
 * The reason for that is that if the library is installed it also copies in the
 * example folder itself as well as the node_modules folder of the library
 * although their are defined in .npmignore and should be ignored in theory.
 *
 * This postinstall script removes the node_modules folder as well as all
 * entries from the libraries .npmignore file within the examples node_modules
 * folder after the library was installed. This should resolve the metro
 * bundler issue mentioned above.
 *
 * It is expected this scripts lives in the libraries root folder within a
 * scripts folder. As first parameter the relative path to the libraries
 * folder within the example's node_modules folder may be provided.
 * This script will determine the path from this project's package.json file
 * if no such relative path is provided.
 * An example's package.json entry could look like:
 * "postinstall": "node ../scripts/examples_postinstall.js node_modules/react-native-library-name/"
 */

'use strict';

const fs = require('fs');
const path = require('path');

/// Delete all files and directories for the given path
const removeFileDirectoryRecursively = fileDirPath => {
  // Remove file
  if (!fs.lstatSync(fileDirPath).isDirectory()) {
    fs.unlinkSync(fileDirPath);
    return;
  }

  // Go down the directory an remove each file / directory recursively
  fs.readdirSync(fileDirPath).forEach(entry => {
    const entryPath = path.join(fileDirPath, entry);
    removeFileDirectoryRecursively(entryPath);
  });
  fs.rmdirSync(fileDirPath);
};

/// Remove example/node_modules/react-native-library-name/node_modules directory
const removeLibraryNodeModulesPath = nodeModulesPath => {
  if (!fs.existsSync(nodeModulesPath)) {
    console.log(
      `No node_modules found at ${nodeModulesPath}. Skipping delete.`,
    );
    return;
  }

  try {
    removeFileDirectoryRecursively(nodeModulesPath);
    console.log(`Successfully deleted: ${nodeModulesPath}`);
  } catch (err) {
    console.log(`Error deleting ${nodeModulesPath}: ${err.message}`);
  }
};

/// Remove all entries from the .npmignore within example/node_modules/react-native-library-name/
const removeLibraryNpmIgnorePaths = (npmIgnorePath, libraryNodeModulesPath) => {
  if (!fs.existsSync(npmIgnorePath)) {
    console.log(
      `No .npmignore found at ${npmIgnorePath}. Skipping deleting content.`,
    );
    return;
  }

  fs.readFileSync(npmIgnorePath, 'utf8')
    .split(/\r?\n/)
    .forEach(entry => {
      if (entry.length === 0) {
        return;
      }

      const npmIgnoreLibraryNodeModulesEntryPath = path.resolve(
        libraryNodeModulesPath,
        entry,
      );
      if (!fs.existsSync(npmIgnoreLibraryNodeModulesEntryPath)) {
        return;
      }

      try {
        removeFileDirectoryRecursively(npmIgnoreLibraryNodeModulesEntryPath);
        console.log(
          `Successfully deleted: ${npmIgnoreLibraryNodeModulesEntryPath}`,
        );
      } catch (err) {
        console.log(
          `Error deleting ${npmIgnoreLibraryNodeModulesEntryPath}: ${err.message}`,
        );
      }
    });
};

// Main start sweeping process
(() => {
  // Read out dir of example project
  const cwd = process.cwd();

  console.log(`Starting postinstall cleanup for ${cwd}`);

  // Resolve the React Native library's path within the example's node_modules directory
  const libraryNodeModulesPath =
    process.argv.length > 2
      ? path.resolve(cwd, process.argv[2])
      : path.resolve(cwd, 'node_modules', require('../package.json').name);

  console.log('Removing nested node_modules directory...');
  const nodeModulesPath = path.resolve(libraryNodeModulesPath, 'node_modules');
  removeLibraryNodeModulesPath(nodeModulesPath);

  console.log('Processing .npmignore entries...');
  const npmIgnorePath = path.resolve(__dirname, '../.npmignore');
  removeLibraryNpmIgnorePaths(npmIgnorePath, libraryNodeModulesPath);
})();
