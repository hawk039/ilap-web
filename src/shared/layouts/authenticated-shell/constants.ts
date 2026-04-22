import { routes } from "@/lib/routes";

export const authenticatedShellContent = {
  brand: "ILAP",
  topNav: [
    { label: "Home", href: routes.dashboard },
    { label: "Chat", href: routes.chat },
    { label: "Profile", href: routes.profile },
  ],
  user: {
    avatarSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6hjwku7BOVtiGUjNGsKMwllH9V3KcJTUPGImvcZ4MeVHIMQM4N73nes1A4wm9cMX6qAJGmaGSqIZEjd7WRS8kaNMNEx4N89jyxsxsu1WS3aU7BVGrn-r81Uj6L2L0zLzXcZVSPihAwbjDafzw5doX5llAakOZIlmku9PtrNdbJ51mbgo0B8-mv79ej-L0pBDjf4OaRpM59uWdUsOJIwod4nq72ttJZiktVqSuFJiyHQ-lb8qVPw2Kbie3_NFVfz11t66YZHGcK30",
    avatarAlt:
      "Professional headshot of a lawyer in a dark suit with a neutral background",
  },
};
