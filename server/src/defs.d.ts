declare module 'dos-config' {
  const config: Config;

  export interface Config {
    env: string;
    endpoints: { webapp: string };
    jwt: {
      secret: string;
      expiration: string;
    };
    port: string;
    mongo: {
      db: string;
      url: string;
    };
    passwordSalt: string;
    version: string;
  }

  export default config;
}

declare module 'express-jwt' {
  import express = require('express');
  import unless = require('express-unless');

  export = jwt;

  function jwt(options: jwt.Options): jwt.RequestHandler;
  namespace jwt {
      export type secretType = string | Buffer
      export type ErrorCode =
          "revoked_token" |
          "invalid_token" |
          "credentials_bad_scheme" |
          "credentials_bad_format" |
          "credentials_required"

      export interface SecretCallbackLong {
          (req: express.Request, header: any, payload: any, done: (err: any, secret?: secretType) => void): void;
      }
      export interface SecretCallback {
          (req: express.Request, payload: any, done: (err: any, secret?: secretType) => void): void;
      }
      export interface IsRevokedCallback {
          (req: express.Request, payload: any, done: (err: any, revoked?: boolean) => void): void;
      }
      export interface GetTokenCallback {
          (req: express.Request): any;
      }
      export interface Options {
          secret: secretType | SecretCallback | SecretCallbackLong;
          userProperty?: string;
          skip?: string[];
          credentialsRequired?: boolean;
          isRevoked?: IsRevokedCallback;
          requestProperty?: string;
          getToken?: GetTokenCallback;
          [property: string]: any;
      }
      export interface RequestHandler extends express.RequestHandler {
          unless: typeof unless;
      }

      export class UnauthorizedError extends Error  {
          status: number;
          message: string;
          name: 'UnauthorizedError';
          code: ErrorCode;
          inner: { message: string };

          constructor(code: ErrorCode, error: { message: string });
      }
  }
}
