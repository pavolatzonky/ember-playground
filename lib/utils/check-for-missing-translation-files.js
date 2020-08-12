'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');
const { activeLocales } = require('../../config/environment')('development');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const locales = ['cs-test'].concat(activeLocales);

process.exitCode = 0;

/**
 * Checks if a directory has no files
 *
 * It's normal for directories like
 * - translations/
 * - translations/components/
 * to have no translations
 *
 * @param dir
 * @return {Promise<boolean>}
 */
async function hasNoFiles(dir) {
  const contents = await readdir(dir);

  for (const item of contents) {
    try {
      const statResult = await stat(path.join(dir, item));
      if (statResult.isFile()) {
        return false;
      }
    } catch (e) {
      // noop
    }
  }

  return true;
}

/**
 * Recursively get all directories in a given path and save them
 *
 * @param dirName
 * @param result
 * @return {Promise<*[]>}
 */
async function getAllDirectoriesIn(dirName, result = []) {
  const contents = await readdir(dirName);

  for (const item of contents) {
    const currentPath = path.join(dirName, item);

    try {
      const statResult = await stat(currentPath);

      if (statResult.isDirectory()) {
        result.push(currentPath);

        await getAllDirectoriesIn(currentPath, result);
      }
    } catch (e) {
      // noop
    }
  }

  return result;
}

/**
 * Get either staged (pre-commit) or all directories (CI Pipeline)
 *
 * @return {Promise<*[]>}
 */
async function getDirectoriesToCheck() {
  if (process.env.CI) {
    return await getAllDirectoriesIn(
      path.join(__dirname, '..', '..', 'translations')
    );
  }

  const stagedFiles = process.argv.filter(name => /.yaml$/.test(name));
  const stagedDirs = stagedFiles.map(file => path.dirname(file));

  return [...new Set(stagedDirs)];
}

/**
 * Check if a directory has missing translations
 *
 * @param dir
 * @return {Promise<void>}
 */
async function checkDirectory(dir) {
  if (process.env.CI && (await hasNoFiles(dir))) {
    return;
  }

  for (const locale of locales) {
    try {
      await stat(path.join(dir, `${locale}.yaml`));
    } catch (e) {
      process.exitCode = process.env.CI ? 0 : 1;
      console.log(
        `✖   Missing locale ${chalk.yellow(locale)} in ${chalk.yellow(
          path.relative(process.cwd(), dir)
        )}`
      );
    }
  }
}

getDirectoriesToCheck().then(directories => {
  for (const dir of directories) {
    checkDirectory(dir);
  }
});
