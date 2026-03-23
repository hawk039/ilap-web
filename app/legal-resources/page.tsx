import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function LegalResourcesPage() {
  const page = createSimplePageContent(
    "Legal Resources",
    "This page is reserved for resource directories, legal guidance, and practitioner materials.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
