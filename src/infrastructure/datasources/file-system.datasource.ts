import fs from 'fs';

import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogServeryLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource extends LogDataSource {
  private readonly logPath = 'logs/';
  private readonly lowLogsPath = 'logs/logs-low.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    super();
    this.createLogsFile();
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.lowLogsPath, logAsJson);

    if (newLog.level === LogServeryLevel.low) return;

    if (newLog.level === LogServeryLevel.medium)
      return fs.appendFileSync(this.mediumLogsPath, logAsJson);
    if (newLog.level === LogServeryLevel.high)
      return fs.appendFileSync(this.highLogsPath, logAsJson);
  }
  async getLogs(severityLevel: LogServeryLevel): Promise<LogEntity[]> {
    let logs = [];

    switch (severityLevel) {
      case LogServeryLevel.low:
        logs = this.ReadLogFile(this.lowLogsPath);
        break;
      case LogServeryLevel.medium:
        logs = this.ReadLogFile(this.mediumLogsPath);
        break;
      case LogServeryLevel.high:
        logs = this.ReadLogFile(this.highLogsPath);
        break;
      default:
        throw new Error(`${severityLevel} not implemented`);
    }

    return logs;
  }

  private ReadLogFile(severityPath: string): LogEntity[] {
    const content = fs.readFileSync(severityPath, { encoding: 'utf-8' });
    const logs = content.trim().split('\n').map(LogEntity.fromJson);
    return logs;
  }

  private createLogsFile() {
    if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath);

    [this.lowLogsPath, this.mediumLogsPath, this.highLogsPath].map((path) => {
      if (!fs.existsSync(path))
        fs.writeFileSync(path, '', { encoding: 'utf-8' });
    });
  }
}
