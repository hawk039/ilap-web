import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export default function LegalCategoriesPage() {
  redirect(routes.dashboard);
}
