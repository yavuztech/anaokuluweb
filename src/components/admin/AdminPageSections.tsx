import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { AdminSectionShell } from './AdminSectionShell';
import { ImageUploadField } from './ImageUploadField';
import { useSiteContent } from '../../hooks/useSiteContent';
import { GalleryItem, LessonItem, SiteContent, Slide, StatItem, ValueItem } from '../../types/content';

type AdminView = 'slider' | 'about' | 'values' | 'gallery' | 'lessons';

const menuItems: Array<{ key: AdminView; label: string }> = [
  { key: 'slider', label: 'Slider Gorselleri' },
  { key: 'about', label: 'Hakkimizda' },
  { key: 'values', label: 'Degerlerimiz' },
  { key: 'gallery', label: 'Galeri' },
  { key: 'lessons', label: 'Dersler' },
];

const emptySlide: Slide = {
  id: '',
  title: '',
  subtitle: '',
  imageUrl: '',
  ctaLabel: '',
  ctaHref: '',
};

const emptyValue: ValueItem = {
  id: '',
  title: '',
  description: '',
  icon: '',
};

const emptyGallery: GalleryItem = {
  id: '',
  title: '',
  imageUrl: '',
};

const emptyLesson: LessonItem = {
  id: '',
  title: '',
  ageGroup: '',
  schedule: '',
  description: '',
  accentColor: '#ff8a5b',
};

const emptyStat: StatItem = {
  id: '',
  label: '',
  value: '',
};

const CardGrid = styled.div.attrs({ className: 'admin-card-grid' })``;
const StatusInfo = styled.div.attrs({ className: 'status-banner status-banner--info' })``;
const StatusWarning = styled.div.attrs({ className: 'status-banner status-banner--warning' })``;
const Layout = styled.div.attrs({ className: 'admin-layout' })``;
const Sidebar = styled.aside.attrs({ className: 'admin-sidebar' })``;
const SidebarIntro = styled.div``;
const Tag = styled.span.attrs({ className: 'section-tag' })``;
const SidebarTitle = styled.h1``;
const SidebarText = styled.p``;
const SidebarMenu = styled.div.attrs({ className: 'admin-sidebar__menu' })``;
const MenuButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: $active ? 'admin-menu-button admin-menu-button--active' : 'admin-menu-button',
}))``;
const ResetButton = styled.button.attrs({ className: 'secondary-button secondary-button--dark' })``;
const Content = styled.div.attrs({ className: 'admin-content' })``;
const EditorGrid = styled.div.attrs({ className: 'admin-editor-grid' })``;
const FormCard = styled.div.attrs({ className: 'admin-form-card' })``;
const FieldLabel = styled.label``;
const FieldInput = styled.input``;
const FieldTextarea = styled.textarea``;
const PrimaryButton = styled.button.attrs({ className: 'primary-button' })``;
const SecondaryButton = styled.button.attrs({ className: 'secondary-button' })``;
const SectionTitle = styled.h3``;
const InlineRow = styled.div.attrs({ className: 'inline-form-row' })``;
const ItemCard = styled.article.attrs({ className: 'admin-item-card' })``;
const AccentedItemCard = styled.article.attrs({ className: 'admin-item-card admin-item-card--accented' })``;
const Thumb = styled.img.attrs({ className: 'admin-item-card__thumb' })``;
const ItemTitle = styled.strong``;
const ItemText = styled.p``;
const ItemActions = styled.div.attrs({ className: 'admin-item-card__actions' })``;
const ActionButton = styled.button``;
const ItemIcon = styled.span.attrs({ className: 'admin-item-card__icon' })``;
const LessonPill = styled.span.attrs({ className: 'admin-item-card__pill' })<{ $accent: string }>`
  background-color: ${({ $accent }) => $accent};
`;

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

type ItemEditorProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
};

function ItemGrid<T>({ items, renderItem }: ItemEditorProps<T>) {
  return <CardGrid>{items.map(renderItem)}</CardGrid>;
}

export function AdminPageSections() {
  const { content, error, isLoading, isSaving, saveContent, resetContent } = useSiteContent();
  const [activeView, setActiveView] = useState<AdminView>('slider');
  const [editingSlide, setEditingSlide] = useState<Slide>(emptySlide);
  const [editingValue, setEditingValue] = useState<ValueItem>(emptyValue);
  const [editingGallery, setEditingGallery] = useState<GalleryItem>(emptyGallery);
  const [editingLesson, setEditingLesson] = useState<LessonItem>(emptyLesson);
  const [editingAbout, setEditingAbout] = useState(content.about);
  const [editingStats, setEditingStats] = useState<StatItem[]>(content.about.stats);

  const statsSummary = useMemo(() => editingStats.filter((stat) => stat.label && stat.value), [editingStats]);

  useEffect(() => {
    setEditingAbout(content.about);
    setEditingStats(content.about.stats);
  }, [content.about]);

  const updateContent = (updater: (current: SiteContent) => SiteContent) => {
    return saveContent((current) => updater(current));
  };

  const saveSlide = async () => {
    if (!editingSlide.title || !editingSlide.imageUrl) {
      return;
    }

    await updateContent((current) => {
      const slide = editingSlide.id ? editingSlide : { ...editingSlide, id: createId('slide') };
      const exists = current.heroSlides.some((item) => item.id === slide.id);

      return {
        ...current,
        heroSlides: exists
          ? current.heroSlides.map((item) => (item.id === slide.id ? slide : item))
          : [...current.heroSlides, slide],
      };
    });
    setEditingSlide(emptySlide);
  };

  const saveValue = async () => {
    if (!editingValue.title || !editingValue.description) {
      return;
    }

    await updateContent((current) => {
      const value = editingValue.id ? editingValue : { ...editingValue, id: createId('value') };
      const exists = current.values.some((item) => item.id === value.id);

      return {
        ...current,
        values: exists ? current.values.map((item) => (item.id === value.id ? value : item)) : [...current.values, value],
      };
    });
    setEditingValue(emptyValue);
  };

  const saveGallery = async () => {
    if (!editingGallery.title || !editingGallery.imageUrl) {
      return;
    }

    await updateContent((current) => {
      const gallery = editingGallery.id ? editingGallery : { ...editingGallery, id: createId('gallery') };
      const exists = current.gallery.some((item) => item.id === gallery.id);

      return {
        ...current,
        gallery: exists
          ? current.gallery.map((item) => (item.id === gallery.id ? gallery : item))
          : [...current.gallery, gallery],
      };
    });
    setEditingGallery(emptyGallery);
  };

  const saveLesson = async () => {
    if (!editingLesson.title || !editingLesson.description) {
      return;
    }

    await updateContent((current) => {
      const lesson = editingLesson.id ? editingLesson : { ...editingLesson, id: createId('lesson') };
      const exists = current.lessons.some((item) => item.id === lesson.id);

      return {
        ...current,
        lessons: exists
          ? current.lessons.map((item) => (item.id === lesson.id ? lesson : item))
          : [...current.lessons, lesson],
      };
    });
    setEditingLesson(emptyLesson);
  };

  const saveAbout = async () => {
    await updateContent((current) => ({
      ...current,
      about: {
        ...editingAbout,
        stats: statsSummary.map((stat) => (stat.id ? stat : { ...stat, id: createId('stat') })),
      },
    }));
  };

  if (isLoading) {
    return <StatusInfo>Icerikler Firestore uzerinden yukleniyor...</StatusInfo>;
  }

  return (
    <Layout>
      <Sidebar>
        <SidebarIntro>
          <Tag>Yonetim</Tag>
          <SidebarTitle>Icerik Paneli</SidebarTitle>
          <SidebarText>Anasayfadaki tum icerikleri ekleyin, guncelleyin veya kaldirin.</SidebarText>
        </SidebarIntro>

        <SidebarMenu>
          {menuItems.map((item) => (
            <MenuButton
              key={item.key}
              type="button"
              $active={activeView === item.key}
              onClick={() => setActiveView(item.key)}
            >
              {item.label}
            </MenuButton>
          ))}
        </SidebarMenu>

        <ResetButton type="button" onClick={() => void resetContent()}>
          Varsayilan Icerigi Yukle
        </ResetButton>
      </Sidebar>

      <Content>
        {error && <StatusWarning>{error}</StatusWarning>}
        {isSaving && <StatusInfo>Degisiklikler Firestore uzerine kaydediliyor...</StatusInfo>}

        {activeView === 'slider' && (
          <AdminSectionShell title="Slider Gorselleri" description="Anasayfa hero alanindaki gorsel ve metinleri yonetin.">
            <EditorGrid>
              <FormCard>
                <FieldLabel>
                  Baslik
                  <FieldInput
                    value={editingSlide.title}
                    onChange={(event) => setEditingSlide((current) => ({ ...current, title: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Aciklama
                  <FieldTextarea
                    value={editingSlide.subtitle}
                    onChange={(event) => setEditingSlide((current) => ({ ...current, subtitle: event.target.value }))}
                  />
                </FieldLabel>
                <ImageUploadField
                  label="Gorsel URL"
                  value={editingSlide.imageUrl}
                  onChange={(nextValue) => setEditingSlide((current) => ({ ...current, imageUrl: nextValue }))}
                />
                <FieldLabel>
                  Buton Metni
                  <FieldInput
                    value={editingSlide.ctaLabel}
                    onChange={(event) => setEditingSlide((current) => ({ ...current, ctaLabel: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Buton Linki
                  <FieldInput
                    value={editingSlide.ctaHref}
                    onChange={(event) => setEditingSlide((current) => ({ ...current, ctaHref: event.target.value }))}
                  />
                </FieldLabel>
                <PrimaryButton type="button" onClick={() => void saveSlide()}>
                  {editingSlide.id ? 'Guncelle' : 'Yeni Gorsel Ekle'}
                </PrimaryButton>
              </FormCard>

              <ItemGrid
                items={content.heroSlides}
                renderItem={(slide) => (
                  <ItemCard key={slide.id}>
                    <Thumb src={slide.imageUrl} alt={slide.title} />
                    <ItemTitle>{slide.title}</ItemTitle>
                    <ItemText>{slide.subtitle}</ItemText>
                    <ItemActions>
                      <ActionButton type="button" onClick={() => setEditingSlide(slide)}>
                        Duzenle
                      </ActionButton>
                      <ActionButton
                        type="button"
                        onClick={() =>
                          void updateContent((current) => ({
                            ...current,
                            heroSlides: current.heroSlides.filter((item) => item.id !== slide.id),
                          }))
                        }
                      >
                        Sil
                      </ActionButton>
                    </ItemActions>
                  </ItemCard>
                )}
              />
            </EditorGrid>
          </AdminSectionShell>
        )}

        {activeView === 'about' && (
          <AdminSectionShell title="Hakkimizda" description="Baslik, aciklama ve istatistik bloklarini duzenleyin.">
            <EditorGrid>
              <FormCard>
                <FieldLabel>
                  Baslik
                  <FieldInput
                    value={editingAbout.title}
                    onChange={(event) => setEditingAbout((current) => ({ ...current, title: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Ozet Metin
                  <FieldTextarea
                    value={editingAbout.lead}
                    onChange={(event) => setEditingAbout((current) => ({ ...current, lead: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Detay Aciklama
                  <FieldTextarea
                    value={editingAbout.description}
                    onChange={(event) => setEditingAbout((current) => ({ ...current, description: event.target.value }))}
                  />
                </FieldLabel>
              </FormCard>

              <FormCard>
                <SectionTitle>Istatistikler</SectionTitle>
                {editingStats.map((stat, index) => (
                  <InlineRow key={stat.id || index}>
                    <FieldInput
                      placeholder="Deger"
                      value={stat.value}
                      onChange={(event) =>
                        setEditingStats((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, value: event.target.value } : item,
                          ),
                        )
                      }
                    />
                    <FieldInput
                      placeholder="Etiket"
                      value={stat.label}
                      onChange={(event) =>
                        setEditingStats((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, label: event.target.value } : item,
                          ),
                        )
                      }
                    />
                    <ActionButton
                      type="button"
                      onClick={() => setEditingStats((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                    >
                      Sil
                    </ActionButton>
                  </InlineRow>
                ))}
                <SecondaryButton
                  type="button"
                  onClick={() => setEditingStats((current) => [...current, { ...emptyStat, id: createId('stat') }])}
                >
                  Yeni Istatistik Ekle
                </SecondaryButton>
                <PrimaryButton type="button" onClick={() => void saveAbout()}>
                  Istatistikleri Kaydet
                </PrimaryButton>
              </FormCard>
            </EditorGrid>
          </AdminSectionShell>
        )}

        {activeView === 'values' && (
          <AdminSectionShell title="Degerlerimiz" description="Kartlari ekleyin, duzenleyin veya silin.">
            <EditorGrid>
              <FormCard>
                <FieldLabel>
                  Baslik
                  <FieldInput
                    value={editingValue.title}
                    onChange={(event) => setEditingValue((current) => ({ ...current, title: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Ikon Metni
                  <FieldInput
                    value={editingValue.icon}
                    onChange={(event) => setEditingValue((current) => ({ ...current, icon: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Aciklama
                  <FieldTextarea
                    value={editingValue.description}
                    onChange={(event) => setEditingValue((current) => ({ ...current, description: event.target.value }))}
                  />
                </FieldLabel>
                <PrimaryButton type="button" onClick={() => void saveValue()}>
                  {editingValue.id ? 'Guncelle' : 'Yeni Deger Ekle'}
                </PrimaryButton>
              </FormCard>

              <ItemGrid
                items={content.values}
                renderItem={(value) => (
                  <ItemCard key={value.id}>
                    <ItemIcon>{value.icon}</ItemIcon>
                    <ItemTitle>{value.title}</ItemTitle>
                    <ItemText>{value.description}</ItemText>
                    <ItemActions>
                      <ActionButton type="button" onClick={() => setEditingValue(value)}>
                        Duzenle
                      </ActionButton>
                      <ActionButton
                        type="button"
                        onClick={() =>
                          void updateContent((current) => ({
                            ...current,
                            values: current.values.filter((item) => item.id !== value.id),
                          }))
                        }
                      >
                        Sil
                      </ActionButton>
                    </ItemActions>
                  </ItemCard>
                )}
              />
            </EditorGrid>
          </AdminSectionShell>
        )}

        {activeView === 'gallery' && (
          <AdminSectionShell title="Galeri" description="Galeri gorsellerini yonetin.">
            <EditorGrid>
              <FormCard>
                <FieldLabel>
                  Baslik
                  <FieldInput
                    value={editingGallery.title}
                    onChange={(event) => setEditingGallery((current) => ({ ...current, title: event.target.value }))}
                  />
                </FieldLabel>
                <ImageUploadField
                  label="Gorsel URL"
                  value={editingGallery.imageUrl}
                  onChange={(nextValue) => setEditingGallery((current) => ({ ...current, imageUrl: nextValue }))}
                />
                <PrimaryButton type="button" onClick={() => void saveGallery()}>
                  {editingGallery.id ? 'Guncelle' : 'Yeni Gorsel Ekle'}
                </PrimaryButton>
              </FormCard>

              <ItemGrid
                items={content.gallery}
                renderItem={(item) => (
                  <ItemCard key={item.id}>
                    <Thumb src={item.imageUrl} alt={item.title} />
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemActions>
                      <ActionButton type="button" onClick={() => setEditingGallery(item)}>
                        Duzenle
                      </ActionButton>
                      <ActionButton
                        type="button"
                        onClick={() =>
                          void updateContent((current) => ({
                            ...current,
                            gallery: current.gallery.filter((galleryItem) => galleryItem.id !== item.id),
                          }))
                        }
                      >
                        Sil
                      </ActionButton>
                    </ItemActions>
                  </ItemCard>
                )}
              />
            </EditorGrid>
          </AdminSectionShell>
        )}

        {activeView === 'lessons' && (
          <AdminSectionShell title="Dersler" description="Program kartlarini ekleyin ve duzenleyin.">
            <EditorGrid>
              <FormCard>
                <FieldLabel>
                  Baslik
                  <FieldInput
                    value={editingLesson.title}
                    onChange={(event) => setEditingLesson((current) => ({ ...current, title: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Yas Araligi
                  <FieldInput
                    value={editingLesson.ageGroup}
                    onChange={(event) => setEditingLesson((current) => ({ ...current, ageGroup: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Saat Bilgisi
                  <FieldInput
                    value={editingLesson.schedule}
                    onChange={(event) => setEditingLesson((current) => ({ ...current, schedule: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Aciklama
                  <FieldTextarea
                    value={editingLesson.description}
                    onChange={(event) => setEditingLesson((current) => ({ ...current, description: event.target.value }))}
                  />
                </FieldLabel>
                <FieldLabel>
                  Vurgu Rengi
                  <FieldInput
                    type="color"
                    value={editingLesson.accentColor}
                    onChange={(event) => setEditingLesson((current) => ({ ...current, accentColor: event.target.value }))}
                  />
                </FieldLabel>
                <PrimaryButton type="button" onClick={() => void saveLesson()}>
                  {editingLesson.id ? 'Guncelle' : 'Yeni Ders Ekle'}
                </PrimaryButton>
              </FormCard>

              <ItemGrid
                items={content.lessons}
                renderItem={(lesson) => (
                  <AccentedItemCard key={lesson.id}>
                    <LessonPill $accent={lesson.accentColor}>{lesson.ageGroup}</LessonPill>
                    <ItemTitle>{lesson.title}</ItemTitle>
                    <ItemText>{lesson.schedule}</ItemText>
                    <ItemText>{lesson.description}</ItemText>
                    <ItemActions>
                      <ActionButton type="button" onClick={() => setEditingLesson(lesson)}>
                        Duzenle
                      </ActionButton>
                      <ActionButton
                        type="button"
                        onClick={() =>
                          void updateContent((current) => ({
                            ...current,
                            lessons: current.lessons.filter((item) => item.id !== lesson.id),
                          }))
                        }
                      >
                        Sil
                      </ActionButton>
                    </ItemActions>
                  </AccentedItemCard>
                )}
              />
            </EditorGrid>
          </AdminSectionShell>
        )}
      </Content>
    </Layout>
  );
}