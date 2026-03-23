import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function PrivacyPage() {
  const page = createSimplePageContent(
    "Privacy Policy",
    "This page is reserved for privacy disclosures, data handling practices, and consent terms.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
