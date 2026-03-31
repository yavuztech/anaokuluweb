export type Slide = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
};

export type StatItem = {
  id: string;
  label: string;
  value: string;
};

export type AboutContent = {
  title: string;
  lead: string;
  description: string;
  stats: StatItem[];
};

export type ValueItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  imageUrl: string;
};

export type LessonItem = {
  id: string;
  title: string;
  ageGroup: string;
  schedule: string;
  description: string;
  accentColor: string;
};

export type SiteContent = {
  schoolName: string;
  tagline: string;
  contactPhone: string;
  contactEmail: string;
  heroSlides: Slide[];
  about: AboutContent;
  values: ValueItem[];
  gallery: GalleryItem[];
  lessons: LessonItem[];
};