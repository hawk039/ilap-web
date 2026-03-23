import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function HelpCenterPage() {
  const page = createSimplePageContent(
    "Help Center",
    "This page is reserved for self-service help content, knowledge base articles, and troubleshooting guidance.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
