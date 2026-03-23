import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function RequestEarlyAccessPage() {
  const page = createSimplePageContent(
    "Request Early Access",
    "This page is reserved for waitlist signup and early-access onboarding.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
