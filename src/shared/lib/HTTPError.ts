export class HTTPError extends Error {
  status: number;
  code?: number;
  content?: null;

  constructor(status: number, code?: number, content?: null, message?: string) {
    super(message);

    this.name = "HTTPError";
    this.status = status;
    this.content = content;
    this.code = code;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
