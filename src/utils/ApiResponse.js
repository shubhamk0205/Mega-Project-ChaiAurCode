class ApiResponse {
  constructor(statusCode , message="sucess", data) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}