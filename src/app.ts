import { env } from 'process';
import { LogModel, MongoDatabase } from './data/mongodb';
import { Server } from './presentation/server';
import { envs } from './config/plugins/env.plugin';

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  await Server.start();
}
