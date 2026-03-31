import { TokenService } from './token.service';

export class JwtService {
  private static decodeBase64Url(value: string): string {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
    return atob(normalized + padding);
  }

  static getPayload(): any | null {
    const token = TokenService.getToken();
    if (!token) return null;

    try {
      const [, payload] = token.split('.');
      if (!payload) return null;
      return JSON.parse(this.decodeBase64Url(payload));
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

  static isAdmin(): boolean {
    const roleClaims = [
      this.getClaim('http://schemas.microsoft.com/ws/2008/06/identity/claims/role'),
      this.getClaim('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'),
      this.getClaim('role'),
      this.getClaim('roles'),
      this.getClaim('Role'),
    ];

    const hasAdmin = (value: unknown) =>
      String(value).trim().toLowerCase() === 'admin';

    for (const claim of roleClaims) {
      if (Array.isArray(claim)) {
        if (claim.some((item) => hasAdmin(item))) {
          return true;
        }
        continue;
      }

      if (typeof claim === 'string' && hasAdmin(claim)) {
        return true;
      }
    }

    return false;
  }
}
