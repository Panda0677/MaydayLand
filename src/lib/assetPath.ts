export function assetPath(src: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!basePath || !src.startsWith("/")) return src;
  if (src.startsWith(`${basePath}/`)) return src;
  return `${basePath}${src}`;
}
