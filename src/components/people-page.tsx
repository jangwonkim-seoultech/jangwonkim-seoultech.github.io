import { getPeopleRemote } from "@/lib/content";
import type { ReactNode } from "react";
import { PageIntro } from "./ui";
import { ProfessorProfile } from "./people/professor-profile";
import { PeopleGroup } from "./people/people-group";

function PeopleLayout({
  title,
  children,
}: {
  title: "Professor" | "Members" | "Alumni";
  children: ReactNode;
}) {
  return (
    <>
      <PageIntro title={title} />
      <div className="container people-page">{children}</div>
    </>
  );
}

/** Each people category has its own URL; profile data remains JSON-driven. */
export function ProfessorPage(_: { locale?: string } = {}) {
  return (
    <PeopleLayout title="Professor">
      <ProfessorProfile />
    </PeopleLayout>
  );
}

export async function MembersPage(_: { locale?: string } = {}) {
  const members = (await getPeopleRemote()).filter((person) => person.status === "current");
  return (
    <PeopleLayout title="Members">
      <PeopleGroup title="Members" members={members} />
    </PeopleLayout>
  );
}

export async function AlumniPage(_: { locale?: string } = {}) {
  const alumni = (await getPeopleRemote()).filter((person) => person.status === "alumni");
  return (
    <PeopleLayout title="Alumni">
      <PeopleGroup title="Alumni" members={alumni} />
    </PeopleLayout>
  );
}
