export default class HttpException extends Error {
  public status: string = 'failure';
  public message: string;
  public statusCode: number;
  // private success: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
