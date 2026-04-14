export function getBasePath() {
  return import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
}

export function withBase(path = '') {
  return `${getBasePath()}${path.replace(/^\/+/, '')}`;
}

export function toAbsolute(path: string, site: URL | string) {
  const siteUrl = typeof site === 'string' ? site : site.toString();
  return new URL(withBase(path), siteUrl).toString();
}
