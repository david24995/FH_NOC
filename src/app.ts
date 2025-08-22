import { Server } from './presentation/server';
import { envs } from './config/plugins/env.plugin';

(async () => {
  await main();
})();

async function main() {
  Server.start();
  console.log(envs);
}
