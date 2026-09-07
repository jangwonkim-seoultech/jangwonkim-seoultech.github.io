import copy from "@config/copy.json";

export type Dictionary = typeof copy;
export const dictionary: Dictionary = copy;

export function href(path: string = "") {
  const [route, hash] = path.split("#");
  const clean = route.replace(/^\/+|\/+$/g, "");
  return `/${clean ? `${clean}/` : ""}${hash ? `#${hash}` : ""}`;
}

export function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    ...(day ? { day: "numeric" as const } : {}),
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day || 1)));
}
