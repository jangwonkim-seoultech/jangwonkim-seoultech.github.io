import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { GalleryItem, News, Person, Publication, Research } from "./schemas";
import siteData from "@config/site.json";
import piData from "@content/people/pi.json";

const root = process.cwd();
function files<T>(folder: string): T[] {
  return readdirSync(path.join(root, "content", folder))
    .filter((file) => file.endsWith(".json") && file !== "pi.json")
    .map((file) => JSON.parse(readFileSync(path.join(root, "content", folder, file), "utf8")) as T);
}

const sortNews = (data: News[]) => data.filter((x) => !x.draft).sort((a, b) => b.date.localeCompare(a.date));
const publicationTypeOrder: Record<Publication["type"], number> = {
  journal: 0,
  conference: 1,
  preprint: 2,
};
const sortPublications = (data: Publication[]) =>
  data
    .filter((x) => !x.draft)
    .sort((a, b) => publicationTypeOrder[a.type] - publicationTypeOrder[b.type] || String(b.year).localeCompare(String(a.year)) || a.order - b.order);
const sortGallery = (data: GalleryItem[]) => data.sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);
const sortPeople = (data: Person[]) => data.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
const sortResearch = (data: Research[]) => data.sort((a, b) => a.order - b.order);

export const getNews = () => sortNews(files<News>("news"));
export const getPublications = () => sortPublications(files<Publication>("publications"));
export const getGallery = () => sortGallery(files<GalleryItem>("gallery"));
export const getPeople = () => sortPeople(files<Person>("people"));
export const getResearch = () => sortResearch(files<Research>("research"));

export async function getNewsRemote() { return getNews(); }
export async function getPublicationsRemote() { return getPublications(); }
export async function getGalleryRemote() { return getGallery(); }
export async function getPeopleRemote() { return getPeople(); }
export async function getResearchRemote() { return getResearch(); }

export const site = siteData;
export const pi = piData;
export async function getSiteRemote() { return site; }
export async function getPiRemote() { return pi; }

function addressLines() {
  return [`2F, ${site.location.building}, ${site.location.street.replace(/^(\d+)\s/, "$1, ")}, ${site.location.city}, ${site.location.country}`];
}
function koreanAddressLines() {
  return [site.location.koreanAddress];
}
function office() { return site.location.office; }
export async function addressLinesRemote() { return addressLines(); }
export async function koreanAddressLinesRemote() { return koreanAddressLines(); }
export async function officeRemote() { return office(); }
