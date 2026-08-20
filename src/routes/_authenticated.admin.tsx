import { createFileRoute, Outlet } from "@tanstack/react-router";

const ADMIN_DESCRIPTION =
  "Manage The Genesis Moment podcast episodes, Thoughtcasts, and guests.";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — The Genesis Moment" },
      { name: "description", content: ADMIN_DESCRIPTION },
      { property: "og:title", content: "Admin — The Genesis Moment" },
      { property: "og:description", content: ADMIN_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return <Outlet />;
}