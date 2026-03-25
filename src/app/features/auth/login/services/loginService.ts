import api from '../../../../core/api/apiConfig';
import { LoginData, LoginResponse } from '../model/auth.dto';

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao fazer login');
    } else {
      throw new Error('Erro de conexão');
    }
  }
};
