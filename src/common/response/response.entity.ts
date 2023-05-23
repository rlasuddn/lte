export class ResponseEntity {
  readonly statusCode: number;
  readonly message: string;
  readonly data: any;

  constructor(status: number, message: string, data: any) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }

  static Ok(status: number, message: string, data?: any): ResponseEntity {
    return new ResponseEntity(status, message, data);
  }
}
