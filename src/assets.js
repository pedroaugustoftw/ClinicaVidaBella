// GitHub Pages serves project sites under /<repository>/ rather than at the domain root.
export function assetUrl(path) {
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
