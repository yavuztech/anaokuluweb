import { SiteContent } from '../types/content';

export const defaultContent: SiteContent = {
  schoolName: 'ÖZEL DUDULLU BEYAZ ZAMBAK ANAOKULU',
  tagline: 'Merak eden, oynayan ve guvenle buyuyen cocuklar icin renkli bir kampus.',
  contactPhone: '+90 216 555 10 20',
  contactEmail: 'merhaba@gunesbahcesi.com',
  heroSlides: [
    {
      id: 'slide-1',
      title: 'Sevgiyle baslayan bir ogrenme yolculugu',
      subtitle:
        'Dogayla ic ice atolyeler, drama saati ve oyun temelli egitim modeli ile her gun yeni bir kesif.',
      imageUrl:
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
      ctaLabel: 'Randevu Al',
      ctaHref: '#iletisim',
    },
    {
      id: 'slide-2',
      title: 'Mutlu cocuklar icin guvenli ve sicak ortam',
      subtitle:
        'Uzman egitmen kadrosu, guvenli kampus ve zengin etkinlik programi ile ebeveynlerin ici rahat.',
      imageUrl:
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
      ctaLabel: 'Programlari Incele',
      ctaHref: '#dersler',
    },
    {
      id: 'slide-3',
      title: 'Sanat, bilim ve hareket ayni cati altinda',
      subtitle:
        'Her cocugun bireysel ritmini destekleyen; sanat, spor, kodlama ve dil etkinlikleriyle dolu gunler.',
      imageUrl:
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
      ctaLabel: 'Galeriye Git',
      ctaHref: '#galeri',
    },
  ],
  about: {
    title: 'Hakkimizda',
    lead:
      'Gunes Bahcesi, cocuklarin kendilerini guvende hissederek ogrenebilecekleri yasayan bir okul deneyimi sunar.',
    description:
      'Programimiz; oyun tabanli egitim, duyusal kesif, yabanci dil maruziyeti ve aile ile surekli iletisime dayali bir sistem uzerine kuruludur. Her sinif, cocugun bireysel gelisim hizina uygun farkli deneyimler tasarlar.',
    stats: [
      { id: 'stat-1', label: 'Yillik deneyim', value: '12+' },
      { id: 'stat-2', label: 'Uzman egitmen', value: '18' },
      { id: 'stat-3', label: 'Atolye sayisi', value: '24' },
    ],
  },
  values: [
    {
      id: 'value-1',
      title: 'Merak',
      description: 'Soru soran, deneyen ve gozlem yapan cocuklari destekliyoruz.',
      icon: 'Bulut',
    },
    {
      id: 'value-2',
      title: 'Guven',
      description: 'Rutin, sevgi ve acik iletisimle cocuklara saglam bir guven alani kuruyoruz.',
      icon: 'Kalkan',
    },
    {
      id: 'value-3',
      title: 'Nezaket',
      description: 'Paylasim, empati ve birlikte uretme kulturu gunluk hayatin parcasi.',
      icon: 'Kalp',
    },
  ],
  gallery: [
    {
      id: 'gallery-1',
      title: 'Bahce etkinligi',
      imageUrl:
        'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'gallery-2',
      title: 'Sanat atolyemiz',
      imageUrl:
        'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'gallery-3',
      title: 'Mutfak etkinligi',
      imageUrl:
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'gallery-4',
      title: 'Drama saati',
      imageUrl:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    },
  ],
  lessons: [
    {
      id: 'lesson-1',
      title: 'Oyun Grubu',
      ageGroup: '2-3 Yas',
      schedule: 'Hafta ici 09:00 - 12:30',
      description: 'Duyusal materyaller, ritim oyunlari ve sosyal uyum odakli ilk okul deneyimi.',
      accentColor: '#ff8a5b',
    },
    {
      id: 'lesson-2',
      title: 'Kesif Sinifi',
      ageGroup: '4-5 Yas',
      schedule: 'Hafta ici 09:00 - 15:00',
      description: 'Sanat, bilim ve hareket istasyonlari ile gune yayilan tematik etkinlikler.',
      accentColor: '#2f9e8f',
    },
    {
      id: 'lesson-3',
      title: 'Hazirlik Programi',
      ageGroup: '5-6 Yas',
      schedule: 'Hafta ici 09:00 - 16:00',
      description: 'Okula hazirlik, dikkat gelistirme ve proje tabanli ogrenme modulleri.',
      accentColor: '#5b6cff',
    },
  ],
};