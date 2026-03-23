import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function ContactPage() {
  const page = createSimplePageContent(
    "Contact",
    "This page is reserved for support channels, office contact details, and outreach information.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
