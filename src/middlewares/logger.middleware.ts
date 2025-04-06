import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // HTTP(context)의 역할 -> HTTP 관련된 요청에서만 logger가 실행 됨 , express의 debug 라이브러리와 같은 역할

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body, query, params } = request;
    const userAgent = request.get('user-agent') || ''; // header에서 가져옴

    const message = {
      method,
      originalUrl,
      body,
      query,
      params,
      userAgent,
      ip,
    };

    this.logger.log(`request: ${JSON.stringify(message)}`);
    next();
  }
}
