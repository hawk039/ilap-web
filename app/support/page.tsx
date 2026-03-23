import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function SupportPage() {
  const page = createSimplePageContent(
    "Support",
    "This page is reserved for support channels, platform help, and operational assistance.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
