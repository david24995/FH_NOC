import { LogEntity, LogServeryLevel } from '../entities/log.entity';

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogServeryLevel): Promise<LogEntity[]>;
}
