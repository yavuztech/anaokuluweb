# OZEL DUDULLU BEYAZ ZAMBAK ANAOKULU WEB SITESI

Vite + React + TypeScript ile gelistirilmis, Firebase tabanli yonetim panelli anaokulu web sitesi.

## Ozellikler

- Public site icerikleri (anasayfa bolumleri)
- Admin girisi ve icerik yonetimi
- Firebase Authentication ile admin oturumu
- Firestore uzerinden icerik saklama ve canli yansitma
- Cloudinary uzerinden gorsel yukleme
- Styled-components tabanli arayuz

## Teknoloji Yigini

- React 18
- TypeScript
- Vite 5
- React Router
- Firebase (Auth + Firestore)
- Styled Components

## Kurulum

1. Bagimliliklari yukleyin:

```bash
npm install
```

2. Ortam degiskenlerini hazirlayin:

```bash
cp .env.example .env
```

3. Gelistirme modunda calistirin:

```bash
npm run dev
```

## NPM Komutlari

- Gelistirme: `npm run dev`
- Build: `npm run build`
- Build onizleme: `npm run preview`

## Ortam Degiskenleri

Uygulama Firebase ayarlari olmadan admin paneli ve kalici icerik kaydi yapamaz.

Gerekli degiskenler:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_CONTENT_COLLECTION` (opsiyonel, varsayilan: `sites`)
- `VITE_FIREBASE_CONTENT_DOCUMENT` (opsiyonel, varsayilan: `main`)

Not: Ornek degerler icin `.env.example` dosyasini kullanin.

## Route Bilgisi

- Public site: `/`
- Admin panel: `/admin`

Admin girisi public arayuzde gorunmez. Sadece dogrudan URL ile erisilmelidir.

## Cloudinary Gorsel Yukleme

Cloudinary ayarlari su dosyada tanimlidir:

- `src/lib/cloudinary.ts`

Gerekirse `CLOUDINARY_CLOUD_NAME` ve `CLOUDINARY_PRESET` degerlerini kendi hesabiniza gore guncelleyin.

## Uretim Ortami Notu

Router olarak BrowserRouter kullanildigi icin, production sunucuda SPA fallback ayari gereklidir.
Tum route'lar (`/admin` dahil) `index.html` dosyasina yonlendirilmelidir.

## Lisans

Bu proje ozel kullanim amaciyla hazirlanmistir.
