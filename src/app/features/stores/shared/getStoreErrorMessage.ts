export function getStoreErrorMessage(error: unknown): string {
  const messages = extractMessages(error);

  if (
    messages.some(
      (message) =>
        /IX_Units_TenantId_Cnpj/i.test(message) ||
        (/Duplicate entry/i.test(message) && /Cnpj/i.test(message)),
    )
  ) {
    return 'Loja com CNPJ existente';
  }

  const firstMessage = messages.find((message) => message.trim());
  if (firstMessage) {
    return firstMessage.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim();
  }

  return 'Erro ao processar a loja.';
}

function extractMessages(error: unknown): string[] {
  if (typeof error === 'string') {
    return [error];
  }

  if (!error || typeof error !== 'object') {
    return [];
  }

  const apiError = error as {
    error?: { message?: string; title?: string; errors?: Record<string, string[]> } | string;
    message?: string;
  };

  const messages: string[] = [];

  if (typeof apiError.error === 'string' && apiError.error.trim()) {
    messages.push(apiError.error.trim());
  }

  if (apiError.error && typeof apiError.error === 'object') {
    if (apiError.error.message?.trim()) {
      messages.push(apiError.error.message.trim());
    }

    if (apiError.error.title?.trim()) {
      messages.push(apiError.error.title.trim());
    }

    const validationMessages = Object.values(apiError.error.errors ?? {}).flat();
    messages.push(...validationMessages.filter((message) => message?.trim()));
  }

  if (apiError.message?.trim()) {
    messages.push(apiError.message.trim());
  }

  return messages;
}