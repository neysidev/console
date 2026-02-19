export type NavItem = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }> | null;
};

export type NavGroup = NavItem[];

export type NavSectionConfig = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: NavItem[];
};
