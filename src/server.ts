import app from "./app";
import mongoose from "mongoose";
import config from "./app/config/";

const port = config.port;

async function main() {
  await mongoose.connect(config.database_url as string);
  app.listen(port, () => {
    console.log("Server is listening at port no ", port);
  });
}

main();
