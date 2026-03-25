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
    return !!this.getToken();
  }
}
