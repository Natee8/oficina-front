const OWNER_CUSTOMER_UNIT_ERROR = 'Cliente responsável não está vinculado à unidade informada.';

export function getOsErrorMessage(error: unknown): string {
  const limitMsg = 'Limite de OSs atingido';
  const planMsg = 'Limite do plano atingido';

  const checkLimit = (msg: string) =>
    msg.includes(limitMsg) || msg.includes(planMsg);

  if (typeof error === 'string' && error.trim()) {
    if (checkLimit(error)) {
      return 'Limite do plano atingido: não é possível criar mais OSs neste plano. Faça um upgrade ou exclua OSs antigas.';
    }
    return normalizeOsErrorMessage(error);
  }

  if (error && typeof error === 'object') {
    const apiError = error as {
      error?: { message?: string } | string;
      message?: string;
    };

    if (typeof apiError.error === 'string' && apiError.error.trim()) {
      if (checkLimit(apiError.error)) {
        return 'Limite do plano atingido: não é possível criar mais OSs neste plano. Faça um upgrade ou exclua OSs antigas.';
      }
      return normalizeOsErrorMessage(apiError.error);
    }

    if (apiError.error && typeof apiError.error === 'object' && apiError.error.message?.trim()) {
      if (checkLimit(apiError.error.message)) {
        return 'Limite do plano atingido: não é possível criar mais OSs neste plano. Faça um upgrade ou exclua OSs antigas.';
      }
      return normalizeOsErrorMessage(apiError.error.message);
    }

    if (apiError.message?.trim()) {
      if (checkLimit(apiError.message)) {
        return 'Limite do plano atingido: não é possível criar mais OSs neste plano. Faça um upgrade ou exclua OSs antigas.';
      }
      return normalizeOsErrorMessage(apiError.message);
    }
  }

  return 'Erro ao salvar OS.';
}

function normalizeOsErrorMessage(message: string): string {
  if (message.includes(OWNER_CUSTOMER_UNIT_ERROR)) {
    return OWNER_CUSTOMER_UNIT_ERROR;
  }

  const firstLine = message.split('\n')[0].trim();
  const cleanedMessage = firstLine.replace(/^.*?Exception:\s*/i, '').trim();

  return cleanedMessage || 'Erro ao salvar OS.';
}