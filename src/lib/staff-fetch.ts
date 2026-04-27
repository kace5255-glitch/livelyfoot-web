export function staffFetch(url: string, options?: RequestInit, token?: string | null): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
