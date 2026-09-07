export type Publication = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  order: number;
  type: "journal" | "conference" | "preprint";
  venue: string;
  featured?: boolean;
  links: {
    paper?: string;
    code?: string;
    project?: string;
    video?: string;
  };
  draft?: boolean;
};

export type Research = {
  id: string;
  order: number;
  title: string;
  description: string;
  media: Array<{ src: string; alt: string }>;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  category: "graduate" | "undergraduate";
  email: string;
  image: string;
  research: string[];
  joined: string;
  homepage: string;
  github: string;
  scholar: string;
  status: "current" | "alumni";
  order: number;
};

export type News = {
  id: string;
  date: string;
  category: "lab" | "publication" | "award" | "conference" | "student" | "research";
  title: string;
  body: string[];
  image: string;
  imageAlt: string;
  source: string;
  draft?: boolean;
};

export type GalleryItem = {
  id: string;
  date: string;
  title: string;
  image: string;
  alt: string;
  order: number;
};
