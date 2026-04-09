import { environment } from '../../../environments/environments';

export function buildApiUrl(path = ''): string {
  const normalizedBaseUrl = environment.apiUrl.replace(/\/+$/, '');
  const normalizedPath = path.replace(/^\/+/, '');

  return normalizedPath ? `${normalizedBaseUrl}/${normalizedPath}` : normalizedBaseUrl;
}