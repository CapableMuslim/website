/** Prefix an internal path with the site base URL path. */
export function withBase(path: string): string {
    if (!path || /^(https?:|mailto:|#|tel:)/.test(path)) {
        return path;
    }

    const base = import.meta.env.BASE_URL;
    const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

    return normalizedPath ? `${baseWithSlash}${normalizedPath}` : baseWithSlash;
}

export const searchIndexUrl = `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}search.json`;
