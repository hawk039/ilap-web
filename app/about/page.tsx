import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function AboutPage() {
  const page = createSimplePageContent(
    "About ILAP",
    "This page is reserved for the program overview, mission, and organizational background.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
