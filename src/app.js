const app = require('./config/appConfig');
const config = require('./config/dotenvConfig');

app.listen(config.serverPort, () => {
  console.log(`Server is running on port ${config.serverPort}`);
});