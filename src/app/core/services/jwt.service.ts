import { TokenService } from './token.service';

export class JwtService {
  static getPayload(): any | null {
    const token = TokenService.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      TokenService.removeToken();
      return null;
    }
  }

  static getClaim(claimName: string): any | null {
    const payload = this.getPayload();
    return payload?.[claimName] || null;
  }

  static getEmail(): string | null {
    const payload = this.getPayload();
    if (!payload) return null;

    return (
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
      payload['email'] ||
      payload['Email'] ||
      payload['upn'] ||
      null
    );
  }

  static getName(): string | null {
    const payload = this.getPayload();
    if (!payload) return null;

    return (
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
      payload['name'] ||
      payload['Name'] ||
      null
    );
  }

  static getUserId(): string | null {
    const payload = this.getPayload();
    if (!payload) return null;

    return payload['sub'] || payload['id'] || null;
  }
}
