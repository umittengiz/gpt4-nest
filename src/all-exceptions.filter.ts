import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = this.getStatus(exception);
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal Server Error';
      console.error(exception);
  
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  
    private getStatus(exception: unknown): number {
      if (exception instanceof HttpException) {
        return exception.getStatus();
      }
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }