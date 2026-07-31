export class AuthError extends Error {
    constructor(
      message: string,
      public statusCode: number = 401
    ) {
      super(message);
      this.name = 'AuthError';
    }
  }
  
  export class InvalidCredentialsError extends AuthError {
    constructor() {
      super('E-posta veya şifre hatalı', 401);
      this.name = 'InvalidCredentialsError';
    }
  }
  
  export class UnauthorizedError extends AuthError {
    constructor() {
      super('Bu işlem için yetkiniz yok', 403);
      this.name = 'UnauthorizedError';
    }
  }
  
  export class TokenExpiredError extends AuthError {
    constructor() {
      super('Oturum süresi doldu, lütfen tekrar giriş yapın', 401);
      this.name = 'TokenExpiredError';
    }
  }
  
  export class UserNotFoundError extends AuthError {
    constructor() {
      super('Kullanıcı bulunamadı', 404);
      this.name = 'UserNotFoundError';
    }
  }
  