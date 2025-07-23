import {
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ExecutionContext) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let exceptionResponse: any;
    let error: any;

    // Handle known NestJS HttpExceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      exceptionResponse = exception.getResponse();
      error =
        typeof exceptionResponse === 'string'
          ? { message: exceptionResponse }
          : exceptionResponse;
    }

    // ✅ Handle MongoDB Duplicate Key Error (E11000)
    else if (exception?.code === 11000) {
      status = HttpStatus.CONFLICT;
      const key = Object.keys(exception.keyValue || {})[0];
      const value = exception.keyValue?.[key];
      error = {
        message: `Duplicate value '${value}' for field '${key}'`,
      };
    }
    response.status(status).json({
      ...error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
