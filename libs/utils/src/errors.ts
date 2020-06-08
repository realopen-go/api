import { HttpException, HttpStatus } from '@nestjs/common';

export const UNAUTHORIZED_ERROR = (message: string) =>
  new HttpException(message, HttpStatus.UNAUTHORIZED);

export const BAD_REQUEST_ERROR = (message: string) =>
  new HttpException(message, HttpStatus.BAD_REQUEST);

export const NOT_FOUND_ENTITY_ERROR = (message: string) =>
  new HttpException(message, HttpStatus.NOT_FOUND);
