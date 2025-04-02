export class AppError<TContext = unknown> extends Error {
  public readonly context?: TContext;
  public readonly stackTrace?: string;

  constructor(message: string, context?: TContext) {
    super(message);
    this.name = new.target.name;
    this.context = context;

    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
      this.stackTrace = this.stack;
    } else {
      this.stackTrace = new Error(message).stack;
    }
  }
}
