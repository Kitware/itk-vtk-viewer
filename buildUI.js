#!/usr/bin/env node

const path = require('path')
const spawnSync = require('child_process').spawnSync

const cwd = path.join(__dirname, 'src', 'UI', 'reference-ui')
// spawnSync('npm', ['ci'], { cwd, env: process.env, stdio: 'inherit' })
spawnSync('npm', ['run', 'build'], { cwd, env: process.env, stdio: 'inherit' })
