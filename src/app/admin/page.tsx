import { redirect } from "next/navigation";

// Force dynamic rendering - do not prerender during build
export const dynamic = "force-dynamic";

export default function AdminRoot() {
    redirect("/admin/dashboard");
}
