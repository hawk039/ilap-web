import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function SecurityPage() {
  const page = createSimplePageContent(
    "Security",
    "This page is reserved for platform security posture, safeguards, and compliance disclosures.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
