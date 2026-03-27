export class TokenService {
  private static TOKEN_KEY = 'token';

  static saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        this.removeToken();
        return false;
      }

      return true;
    } catch {
      this.removeToken();
      return false;
    }
  }
}
