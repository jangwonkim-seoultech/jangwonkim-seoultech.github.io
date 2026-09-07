export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export function assetPath(value: string) {
  if (!value || /^(?:https?:)?\/\//.test(value) || value.startsWith("data:")) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${basePath}${normalized}`;
}

export function rootPath() {
  return basePath ? `${basePath}/` : "/";
}
