// navItems.ts

// navItemsEnum.ts
// the enum have to be like this : CollectionName = "good href value"
// later on try to use the same names CollectionName name and href value where you initialise  of the project
export enum NavItemsEnum {
  Accueil = "accueil",
  Services = "services",
  Propos = "propos",
  Contact = "contact",
}

export const navItems = [
  { href: "#accueil", text: NavItemsEnum.Accueil },
  { href: "#services", text: NavItemsEnum.Services },
  { href: "#propos", text: NavItemsEnum.Propos },
  { href: "#contact", text: NavItemsEnum.Contact },
];
