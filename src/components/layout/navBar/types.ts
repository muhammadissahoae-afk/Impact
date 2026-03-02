// types.ts
export type NavChild = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  prefixMatch?: boolean;
  children?: NavChild[];
};
