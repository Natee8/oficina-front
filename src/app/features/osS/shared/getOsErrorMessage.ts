const OWNER_CUSTOMER_UNIT_ERROR = 'Cliente responsável não está vinculado à unidade informada.';

export function getOsErrorMessage(error: unknown): string {
  if (typeof error === 'string' && error.trim()) {
    return normalizeOsErrorMessage(error);
  }

  if (error && typeof error === 'object') {
    const apiError = error as {
      error?: { message?: string } | string;
      message?: string;
    };

    if (typeof apiError.error === 'string' && apiError.error.trim()) {
      return normalizeOsErrorMessage(apiError.error);
    }

    if (apiError.error && typeof apiError.error === 'object' && apiError.error.message?.trim()) {
      return normalizeOsErrorMessage(apiError.error.message);
    }

    if (apiError.message?.trim()) {
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