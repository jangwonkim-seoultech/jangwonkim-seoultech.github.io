import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fullDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const yearMonth = /^\d{4}-(0[1-9]|1[0-2])$/;
const localImage = /^\/images\/[\w/.-]+$/;
const localResearchMedia = /^\/(?:images|media)\/[\w/.-]+\.(?:png|jpe?g|gif|webp|svg|mp4)$/i;

function text(value, label, allowEmpty = false) {
  assert(typeof value === "string" && (allowEmpty || value.trim()), `${label} must be a string${allowEmpty ? "" : " and is required"}.`);
}
function image(value, label) {
  if (!value) return;
  assert(localImage.test(value), `${label} must use /images/...`);
  assert(existsSync(path.join("public", value)), `Image does not exist: ${value}`);
}
function researchMedia(value, label) {
  text(value, label);
  assert(localResearchMedia.test(value), `${label} must be a local PNG/JPG/JPEG/GIF/WebP/SVG/MP4 file under /images/... or /media/...`);
  assert(existsSync(path.join("public", value)), `Research media does not exist: ${value}`);
}
function httpsOrLocal(value, label) {
  if (!value) return;
  assert(/^https:\/\//.test(value) || /^\/(?!\/)/.test(value), `${label} must be HTTPS or a local /path.`);
}
function validDate(value, label) {
  assert(fullDate.test(value), `${label} must be YYYY-MM-DD.`);
  assert(new Date(`${value}T00:00:00Z`).toISOString().startsWith(value), `${label} is not a valid calendar date.`);
}
function validYearMonth(value, label) {
  assert(yearMonth.test(value), `${label} must be YYYY-MM.`);
}
function records(folder) {
  return readdirSync(`content/${folder}`).filter((name) => name.endsWith(".json") && name !== "pi.json").map((name) => [name, readJson(`content/${folder}/${name}`)]);
}
function uniqueIds(folder, items) {
  const seen = new Set();
  for (const [file, item] of items) {
    assert(slug.test(item.id), `${folder}/${file}: invalid id.`);
    assert(!seen.has(item.id), `${folder}: duplicate id ${item.id}.`);
    seen.add(item.id);
  }
}

const site = readJson("config/site.json");
const copy = readJson("config/copy.json");
const pi = readJson("content/people/pi.json");

text(site.lab.name, "site.lab.name");
text(site.affiliation.university, "site.affiliation.university");
text(site.affiliation.department, "site.affiliation.department");
text(site.location.building, "site.location.building");
text(site.location.office, "site.location.office");
text(site.location.street, "site.location.street");
text(site.location.city, "site.location.city");
text(site.location.country, "site.location.country");
text(site.home.heroImageAlt, "site.home.heroImageAlt");
text(site.home.heroTitle, "site.home.heroTitle");
text(site.home.heroCta, "site.home.heroCta");
text(site.home.introductionTitle, "site.home.introductionTitle");
text(site.home.introductionBody, "site.home.introductionBody");
text(copy.seo?.home, "copy.seo.home");
text(copy.seo?.description, "copy.seo.description");
image(site.lab.logo.src, "site.lab.logo.src");
image(site.lab.headerFooterLogo.src, "site.lab.headerFooterLogo.src");
image(site.home.heroImage, "site.home.heroImage");
image(site.join.image, "site.join.image");
text(site.join.imageAlt, "site.join.imageAlt");
assert([3, 5, 10].includes(site.display.homeNewsCount), "site.display.homeNewsCount must be 3, 5, or 10.");
assert([3, 5, 10].includes(site.display.homePublicationCount), "site.display.homePublicationCount must be 3, 5, or 10.");
assert([3, 5, 10].includes(site.display.homeInternationalConferenceCount), "site.display.homeInternationalConferenceCount must be 3, 5, or 10.");
assert([3, 5, 10].includes(site.display.homeDomesticConferenceCount), "site.display.homeDomesticConferenceCount must be 3, 5, or 10.");
assert(!site.url || /^https:\/\//.test(site.url), "config/site.json url must be HTTPS or empty.");
for (const [key, value] of Object.entries(site.links)) assert(/^https:\/\//.test(value), `site.links.${key} must use HTTPS.`);
if (process.env.SITE_URL) assert(/^https:\/\/[^\s/$.?#].[^\s]*$/.test(process.env.SITE_URL), "SITE_URL must be an HTTPS URL.");

text(pi.name, "pi.name");
text(pi.role, "pi.role");
image(pi.image, "pi.image");
assert(Array.isArray(pi.education) && pi.education.length > 0, "PI education is required.");
assert(Array.isArray(pi.experience) && pi.experience.length > 0, "PI experience is required.");
for (const [i, edu] of pi.education.entries()) { text(edu.degree, `pi.education[${i}].degree`); text(edu.institution, `pi.education[${i}].institution`); }
for (const [i, exp] of pi.experience.entries()) { text(exp.period, `pi.experience[${i}].period`); text(exp.title, `pi.experience[${i}].title`); if (exp.institution !== undefined) text(exp.institution, `pi.experience[${i}].institution`); }

const publications = records("publications");
const people = records("people");
const news = records("news");
const gallery = records("gallery");
const research = records("research");
for (const [folder, items] of Object.entries({ publications, people, news, gallery, research })) uniqueIds(folder, items);

for (const [file, p] of publications) {
  text(p.title, `${file}.title`);
  assert(Array.isArray(p.authors) && p.authors.length > 0, `${file}: authors are required.`);
  const publicationDate = String(p.year);
  validYearMonth(publicationDate, `${file}.year`);
  const publicationYear = Number(publicationDate.slice(0, 4));
  assert(publicationYear >= 1900 && publicationYear <= 2100, `${file}: invalid year.`);
  assert(["journal", "conference", "preprint"].includes(p.type), `${file}: invalid publication type.`);
  image(p.thumbnail, `${file}.thumbnail`);
  if (p.type === "conference") {
    assert(["international", "domestic"].includes(p.conferenceType), `${file}: conferenceType must be international or domestic.`);
  }
  for (const [key, value] of Object.entries(p.links || {})) httpsOrLocal(value, `${file}.links.${key}`);
}
for (const [file, p] of people) {
  text(p.name, `${file}.name`); text(p.role, `${file}.role`); image(p.image, `${file}.image`);
  assert(Array.isArray(p.research), `${file}.research must be an array.`);
  assert(["graduate", "undergraduate"].includes(p.category), `${file}: invalid category.`);
  assert(["current", "alumni"].includes(p.status), `${file}: invalid status.`);
  assert(/^\d{4}-\d{2}$/.test(p.joined), `${file}: joined must be YYYY-MM.`);
  for (const key of ["homepage", "github", "scholar"]) httpsOrLocal(p[key], `${file}.${key}`);
}
for (const [file, n] of news) {
  validDate(n.date, file); text(n.title, `${file}.title`);
  assert(Array.isArray(n.body) && n.body.length && n.body.every((x) => typeof x === "string"), `${file}: body must be a non-empty string array.`);
  image(n.image, `${file}.image`);
  if (n.image) text(n.imageAlt, `${file}.imageAlt`);
  httpsOrLocal(n.source, `${file}.source`);
}
for (const [file, g] of gallery) { validDate(g.date, file); text(g.title, `${file}.title`); text(g.alt, `${file}.alt`); image(g.image, `${file}.image`); }
for (const [file, r] of research) {
  text(r.title, `${file}.title`);
  text(r.description, `${file}.description`);
  assert(Array.isArray(r.media) && r.media.length > 0, `${file}: at least one media item is required.`);
  for (const media of r.media) { researchMedia(media.src, `${file}.media.src`); text(media.alt, `${file}.media.alt`); }
}

const researchIds = new Set(research.map(([, item]) => item.id));
assert(research.length === 3, "The site must keep exactly three main research categories.");
for (const id of ["reinforcement-learning", "robot-learning", "ai-optimization"]) assert(researchIds.has(id), `Missing research id: ${id}`);

console.log(`Content valid: ${research.length} research areas, ${publications.length} publications, ${news.filter(([,x]) => !x.draft).length} published news entries, ${gallery.length} gallery items, ${people.length} people records.`);
