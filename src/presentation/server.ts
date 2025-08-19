import { CheckService } from '../domain/use-cases/checks/check-services';
import { CronService } from './cron/cron-service';

export class Server {
  public static start() {
    console.log('Server started');

    const job = CronService.createJob('*/10 * * * * * ', () => {
      // new CheckService().execute('https://google.com');
      new CheckService(
        () => console.log('success'),
        (err) => console.log(`${err} desde server.ts`)
      ).execute('http://localhost:3000/');
    });
  }
}
