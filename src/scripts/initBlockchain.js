const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

//Execute commands
const execCommand = (command, cwd = process.cwd()) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${command}\n${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

const rootDir = path.join(__dirname, '../../');

const run = async () => {
  try {
    //Remove build
    const buildPath = path.join(__dirname, 'src/smartcontract/build');
    
    //Check if the build folder exists and remove it if it does
    if (await fs.pathExists(buildPath)) {
      console.log('Deleting build folder...');
      await fs.remove(buildPath);
      console.log('Build folder deleted successfully.');
    }

    //Compile
    console.log('Compiling contracts...');
    await execCommand('truffle compile', path.join(__dirname, '../smartcontract'));
    console.log('Contracts compiled successfully.');

    //Migrate
    console.log('Migrating contracts...');
    const migrateResult = await execCommand('truffle migrate --reset --network development', path.join(__dirname, '../smartcontract'));
    console.log('Contracts migrated successfully.');
    console.log('Migration Result:', migrateResult);

    //Execute script registryDevice.js
    console.log('Running registry device...');
    const configResult = await execCommand('node src/scripts/config-device.js', rootDir);
    console.log('Config Result:', configResult);

    console.log('Script executed successfully.');

  } catch (error) {
    console.error('Error during execution:', error);
  }
};

run();
