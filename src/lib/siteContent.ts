import { defaultContent } from '../data/defaultContent';
import type { AboutContent, GalleryItem, LessonItem, SiteContent, Slide, StatItem, ValueItem } from '../types/content';

function ensureText(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function normalizeSlides(value: unknown): Slide[] {
  if (!Array.isArray(value)) {
    return defaultContent.heroSlides;
  }

  return value
    .map((item, index) => ({
      id: ensureText(item?.id, `slide-${index + 1}`),
      title: ensureText(item?.title),
      subtitle: ensureText(item?.subtitle),
      imageUrl: ensureText(item?.imageUrl),
      ctaLabel: ensureText(item?.ctaLabel),
      ctaHref: ensureText(item?.ctaHref),
    }))
    .filter((item) => item.title || item.imageUrl);
}

function normalizeStats(value: unknown): StatItem[] {
  if (!Array.isArray(value)) {
    return defaultContent.about.stats;
  }

  return value
    .map((item, index) => ({
      id: ensureText(item?.id, `stat-${index + 1}`),
      label: ensureText(item?.label),
      value: ensureText(item?.value),
    }))
    .filter((item) => item.label || item.value);
}

function normalizeAbout(value: unknown): AboutContent {
  const about = (value as Partial<AboutContent> | undefined) || {};

  return {
    title: ensureText(about.title, defaultContent.about.title),
    lead: ensureText(about.lead, defaultContent.about.lead),
    description: ensureText(about.description, defaultContent.about.description),
    stats: normalizeStats(about.stats),
  };
}

function normalizeValues(value: unknown): ValueItem[] {
  if (!Array.isArray(value)) {
    return defaultContent.values;
  }

  return value
    .map((item, index) => ({
      id: ensureText(item?.id, `value-${index + 1}`),
      title: ensureText(item?.title),
      description: ensureText(item?.description),
      icon: ensureText(item?.icon),
    }))
    .filter((item) => item.title || item.description);
}

function normalizeGallery(value: unknown): GalleryItem[] {
  if (!Array.isArray(value)) {
    return defaultContent.gallery;
  }

  return value
    .map((item, index) => ({
      id: ensureText(item?.id, `gallery-${index + 1}`),
      title: ensureText(item?.title),
      imageUrl: ensureText(item?.imageUrl),
    }))
    .filter((item) => item.title || item.imageUrl);
}

function normalizeLessons(value: unknown): LessonItem[] {
  if (!Array.isArray(value)) {
    return defaultContent.lessons;
  }

  return value
    .map((item, index) => ({
      id: ensureText(item?.id, `lesson-${index + 1}`),
      title: ensureText(item?.title),
      ageGroup: ensureText(item?.ageGroup),
      schedule: ensureText(item?.schedule),
      description: ensureText(item?.description),
      accentColor: ensureText(item?.accentColor, '#ff8a5b'),
    }))
    .filter((item) => item.title || item.description);
}

export function normalizeSiteContent(value: unknown): SiteContent {
  const content = (value as Partial<SiteContent> | undefined) || {};

  return {
    schoolName: ensureText(content.schoolName, defaultContent.schoolName),
    tagline: ensureText(content.tagline, defaultContent.tagline),
    contactPhone: ensureText(content.contactPhone, defaultContent.contactPhone),
    contactEmail: ensureText(content.contactEmail, defaultContent.contactEmail),
    heroSlides: normalizeSlides(content.heroSlides),
    about: normalizeAbout(content.about),
    values: normalizeValues(content.values),
    gallery: normalizeGallery(content.gallery),
    lessons: normalizeLessons(content.lessons),
  };
}

export function serializeSiteContent(content: SiteContent) {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}