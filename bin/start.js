#!/usr/bin node

const path = require('path');
const cp = require('child_process');

// start video and item server using mix
const mix = cp.spawn('mix', ['run', '--no-halt']);

mix.stdout.on('data', (data) => {
  console.log(`mix stdout: ${data}`);
});

mix.stderr.on('data', (data) => {
  console.log(`mix stderr: ${data}`);
});

mix.on('close', (code) => {
  console.log(`mix exited with code ${code}`);
});

// serve the client code using node
const node = cp.spawn('node', [path.resolve(__dirname, '../client/server.js')]);

node.stdout.on('data', (data) => {
  console.log(`node stdout: ${data}`);
});

node.stderr.on('data', (data) => {
  console.log(`node stderr: ${data}`);
});

node.on('close', (code) => {
  console.log(`node exited with code ${code}`);
});
