import { LabLogo } from "./lab-logo";
import { addressLinesRemote, koreanAddressLinesRemote } from "@/lib/content";

export async function Footer() {
  const [address, koreanAddress] = await Promise.all([addressLinesRemote(), koreanAddressLinesRemote()]);
  return (
    <footer className="site-footer">
      <div className="container footer-simple">
        <LabLogo variant="black" />
        <address className="footer-address">
          <div lang="en">
            {address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <div lang="ko">
            {koreanAddress.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </address>
      </div>
    </footer>
  );
}
