import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePage from "@/shared/simple-page/SimplePage";

export default function TermsPage() {
  const page = createSimplePageContent(
    "Terms of Service",
    "This page is reserved for platform terms, eligibility rules, and service conditions.",
  );

  return <SimplePage description={page.description} title={page.title} />;
}
