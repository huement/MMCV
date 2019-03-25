#!/usr/bin/env node

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

console.log(' ');
// console.log(' ');
// console.log('       WEBP IMAGE BUILDER STARTING....');
// console.log(' ');

/**
 * Output directory
 * Where all the compressed images will go
 */
const OUTPUT_DIR = './';

/**
 * List of input directories
 */
const INPUT_DIRS = [
  './build/images'
];

/**
 * Helper functions to get directories / sub-directories
 *
 * @see https://stackoverflow.com/a/40896897/4364074
 */
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);
const getDirectoriesRecursive = source => [
  source,
  ...getDirectories(source)
    .map(getDirectoriesRecursive)
    .reduce((a, b) => a.concat(b), [])
];

try {
  console.log('Beginning image compression...');

  (async () => {
    let imageDirs = [];

    INPUT_DIRS.map(
      dirname =>
        (imageDirs = imageDirs.concat(getDirectoriesRecursive(dirname)))
    );

    /**
     * Loop through all subfolders, and recursively run imagemin,
     * outputting to the same subfolders inside OUTPUT_DIR folder
     */
    for (let i in imageDirs) {
      const dir = imageDirs[i];
      await imagemin([`${dir}/*.{jpg,png,gif}`], join(OUTPUT_DIR, dir), {
        plugins: [
    			imageminJpegtran(),
    			imageminPngquant({
    				quality: [0.6, 0.8]
    			})
    		]
      });
      console.log(`...${(((+i + 1) / imageDirs.length) * 100).toFixed(0)}%`);
    }
    console.log(' ');
    console.log('Finished compressing all images!');
    console.log(' ');
    console.log(' ');
  })();
} catch (e) {
  console.log(e);
}


//
// imagemin(['./build/images/**/*.{jpg,png}'], './build/images', {
//   use: [
//       imageminWebp({
//         quality: 80
//       })
//   ]
// }).then(() => {
//   console.log('       WEBP IMAGES CREATED!');
//   console.log(' ');
// });
