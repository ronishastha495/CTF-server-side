const app = require("./src/app");
const config = require("./src/config/config");
const connectDB = require("./src/config/db");

const startServer = async () => {
  await connectDB();
  const port = config.port || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
};

startServer();
