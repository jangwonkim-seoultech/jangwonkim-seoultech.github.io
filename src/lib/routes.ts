import navigation from "@config/navigation.json";

/** Routes that are not top-level navigation entries but still need static output. */
export const peopleRoutes = ["people/professor", "people/members", "people/alumni"] as const;

/** One source of truth for every non-article static page. */
export const staticRoutes = [...new Set([...navigation.map((item) => item.path), ...peopleRoutes])];
