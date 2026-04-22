import { createSimplePageContent } from "@/shared/simple-page/createSimplePageContent";
import SimplePanel from "@/shared/simple-page/SimplePanel";

export default function ProfilePage() {
  const page = createSimplePageContent(
    "Profile",
    "This page is reserved for account details, preferences, and professional profile management.",
  );

  return <SimplePanel description={page.description} title={page.title} />;
}
