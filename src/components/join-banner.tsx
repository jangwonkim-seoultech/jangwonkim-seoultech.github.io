import { href } from "@/lib/i18n";
import { TextLink } from "./ui";

/** Compact research-page call to action. It is intentionally not used on Home. */
export function JoinBanner() {
  return (
    <section className="join-banner">
      <div className="container join-banner-inner">
        <h2>Join RLC Lab</h2>
        <TextLink href={href("join")}>Join Us</TextLink>
      </div>
    </section>
  );
}
