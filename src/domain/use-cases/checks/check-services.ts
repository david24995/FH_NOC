import { LogEntity, LogServeryLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface ICheckService {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements ICheckService {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
    private readonly logRepository: LogRepository
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const newLog = new LogEntity(
        LogServeryLevel.low,
        `Service ${url} working`
      );
      this.logRepository.saveLog(newLog);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const newLog = new LogEntity(LogServeryLevel.high, errorMessage);
      this.logRepository.saveLog(newLog);

      this.errorCallback(errorMessage);

      return false;
    }
  }
}
