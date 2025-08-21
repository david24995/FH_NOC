export enum LogServeryLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public createdAt: Date;

  constructor(public level: LogServeryLevel, public message: string) {
    this.createdAt = new Date();
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity(level, message);
    log.createdAt = new Date(createdAt);

    return log;
  }
}
