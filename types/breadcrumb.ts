export type BreadcrumbProps = {
  username?: string;
  avatar?: string | null;
};

export type BreadcrumbSegmentItem = {
  href: string;
  label: string;
  isCurrent: boolean;
};
