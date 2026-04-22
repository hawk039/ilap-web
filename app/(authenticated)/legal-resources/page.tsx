import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePanel from "@/shared/simple-page/SimplePanel";

export default function LegalResourcesPage() {
  const page = createSimplePageContent(
    "Legal Resources",
    "This page is reserved for resource directories, legal guidance, and practitioner materials.",
  );

  return <SimplePanel description={page.description} title={page.title} />;
}
