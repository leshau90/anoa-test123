# DESIGN SYSTEM — Jejak Anoa Website
> "Alam Lestari dan Kearifan Masyarakat Nusantara"

---

## 1. Brand Identity

| Item | Value |
|------|-------|
| Organization Name | Yayasan Jejak Anoa |
| Tagline | "Alam Lestari dan Kearifan Masyarakat Nusantara" |
| Focus | Conservation, community empowerment, environmental education |
| Visual Style | Natural & Modern · Professional & Humanis · Clean & Trustworthy · Documentary & Inspirational |

---

## 2. Color Palette

All colors are defined as CSS variables in `tokens.css`. Always use the variable, never hardcode hex values.

| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| `--color-green` | `#4A7C3F` | Hijau | Primary brand color, buttons, icons |
| `--color-green-dark` | `#1F4E2C` | Hijau Tua | Dark backgrounds, navbar on scroll, hero overlay |
| `--color-red` | `#A0272A` | Merah | CTA buttons (Lihat Program, Donasi Sekarang) |
| `--color-brown` | `#8B6331` | Coklat | Warm accents, section dividers, decorative elements |
| `--color-cream` | `#F5F0E8` | Krem | Page background, section backgrounds |
| `--color-black` | `#1A1A1A` | Hitam | Body text, headings |

**Usage Rules:**
- Use `--color-green` / `--color-green-dark` for primary UI (nav, headings, icons)
- Use `--color-red` for all primary CTAs (Donasi, Lihat Program)
- Use `--color-cream` as the default page background
- Never use pure white as a page background — use `--color-cream` or `--color-surface`
- Dark sections (hero, footer) use `--color-green-dark` as background

---

## 3. Typography

**Font Family:** Montserrat (Google Fonts) — used exclusively across the entire site.

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
```

| Role | Weight | Token | Usage |
|------|--------|-------|-------|
| Heading / Judul Utama | Bold (700) | `--font-weight-bold` | Page titles, hero text, section headings |
| Sub Heading / Sub Judul | SemiBold (600) | `--font-weight-semibold` | Card titles, nav links, sub-sections |
| Body Text / Isi Konten | Regular (400) | `--font-weight-regular` | Paragraphs, descriptions, captions |

**Font Size Scale** (from `tokens.css`):

| Token | Size | Typical Use |
|-------|------|-------------|
| `--font-size-hero` | 60px | Hero headline |
| `--font-size-4xl` | 48px | Page H1 |
| `--font-size-3xl` | 36px | Section H2 |
| `--font-size-xl` | 24px | H3, card titles |
| `--font-size-lg` | 20px | Lead / intro paragraph |
| `--font-size-base` | 16px | Body text |
| `--font-size-sm` | 14px | Captions, labels, nav |
| `--font-size-xs` | 12px | Badges, tags |

---

## 4. Language Tone

The website copy must follow these tone principles:

| Tone | Meaning |
|------|---------|
| **Profesional** | Credible, authoritative language |
| **Humanis** | Warm, community-centered language |
| **Inspiratif** | Motivating and hopeful |
| **Ringkas dan Jelas** | Short, clear sentences — no jargon |

**Example sentence:**
> "Kami membangun kolaborasi konservasi bersama masyarakat untuk menjaga ekosistem Indonesia secara berkelanjutan."

---

## 5. Site Structure (Navigation)

```
HOME
TENTANG KAMI
PROGRAM
PUBLIKASI & PENELITIAN
MITRA & DONOR
KONTAK
```

### Page Breakdown

#### HOME
- Hero Banner (full-width, dark green overlay, CTA buttons)
- Tentang Singkat (short about section)
- Program Utama (4 program cards)
- Dampak (impact stats)
- Kolaborasi (partners preview)

#### TENTANG KAMI
- Sejarah Yayasan
- Visi & Misi
- Legalitas
- Struktur Organisasi
- Tim

#### PROGRAM
- Penanaman
- Konservasi Satwa
- Pemberdayaan Masyarakat
- Edukasi Lingkungan
- Penelitian

#### PUBLIKASI & PENELITIAN
- Jurnal
- Berita
- Artikel
- Laporan Kegiatan

#### MITRA & DONOR
- Mitra Kerja
- Bentuk Kerja Sama

#### KONTAK
- WhatsApp
- Email
- Media Sosial
- Lokasi (Map)

---

## 6. Vision & Mission

### Visi
"Alam Lestari dan Kearifan Masyarakat Nusantara"

### Misi
1. Mendorong pemahaman nilai-nilai konservasi dan kearifan lokal dalam upaya pelestarian lingkungan di masyarakat pesisir dan kawasan hutan.
2. Mengintegrasikan praktik dan inovasi konservasi yang berbasis kearifan lokal.
3. Mengembangkan pengetahuan masyarakat adat dan budaya lokal dalam upaya pengelolaan lingkungan yang berkelanjutan.
4. Menyediakan ruang kolaborasi bersama masyarakat dalam pengelolaan sumber daya alam yang berkelanjutan.
5. Melaksanakan tindakan mitigasi dan adaptasi sebagai respons terhadap perubahan sosial, budaya, dan lingkungan.

---

## 7. Core Programs

### 1. Pelestarian Lingkungan Hidup
- Pendidikan lingkungan
- Penghijauan dan penanaman pohon
- Rehabilitasi lahan
- Konservasi tanah dan air
- Konservasi keanekaragaman hayati

### 2. Pemberdayaan Sosial dan Penguatan Masyarakat
- Pendampingan dan pelatihan masyarakat
- Pengembangan mata pencaharian berkelanjutan
- Fasilitasi kemitraan sosial dan lingkungan

### 3. Pendidikan dan Penelitian
- Penelitian di bidang ilmu pengetahuan dan lingkungan hidup
- Pendidikan formal dan nonformal
- Studi banding dan pengembangan kapasitas masyarakat

### 4. Kegiatan Kemanusiaan
- Bantuan sosial bagi masyarakat terdampak bencana
- Kegiatan kemanusiaan lainnya sesuai maksud dan tujuan yayasan

---

## 8. Component Guidelines

### Buttons
- **Primary CTA** (Donasi Sekarang, Lihat Program): use `.btn .btn-primary` — red background, rounded-full
- **Secondary CTA** (on dark backgrounds): use `.btn .btn-secondary` — transparent, white border
- **Outline**: use `.btn .btn-outline-green` — green border, transparent background
- All buttons use `border-radius: var(--radius-full)` (pill shape)
- Font: Montserrat SemiBold

### Cards
- White background (`--color-surface`) on cream page sections
- Tinted background (`--color-surface-tinted`) for alternating sections
- Border radius: `--radius-lg` (12px)
- Hover: lift effect (`translateY(-4px)`) + deeper shadow
- Program cards show icon + title + bullet list of activities

### Navigation
- Sticky top navbar, height `--nav-height` (72px)
- Logo left, nav links center/right, Donasi button far right (red CTA)
- Active link: `--color-green`
- Font: Montserrat SemiBold

### Hero Section
- Full-width, min-height 100vh
- Background: nature photography with `--color-green-dark` overlay (opacity ~0.6)
- Headline: Montserrat Bold, white, large (`--font-size-hero` or `--font-size-4xl`)
- Two CTA buttons side by side: Primary (red) + Secondary (white outline)
- Bottom: impact stats bar (dark strip)

### Section Labels
- Small uppercase label above each section heading
- Color: `--color-green`, font Montserrat SemiBold
- Example: "PROGRAM KAMI", "TENTANG KAMI"

### Footer
- Dark background: `--color-green-dark`
- White text
- 4-column layout: Logo+tagline | Navigation | Program links | Contact
- Social media icons
- Bottom bar: copyright text

---

## 9. Spacing Principles

- Section vertical padding: `--space-20` (80px) minimum
- Card internal padding: `--space-6` (24px)
- Gap between grid items: `--space-6` to `--space-8`
- Container max-width: `--container-max` (1200px), centered
- Mobile padding: `--space-4` (16px) horizontal

---

## 10. Reference Websites

These sites were cited as design references. Study their layout and visual language:

| Site | URL |
|------|-----|
| BPDLH | https://bpdlh.kemenkeu.go.id/ |
| WWF | https://wwf.panda.org/ |
| KEHATI | https://kehati.or.id/ |
| YABI (Badak) | https://badak.or.id/en/ |

**Common patterns from these references to follow:**
- Full-width hero with nature photography
- Clean white/cream content sections
- Strong green color dominance
- Stats/impact numbers prominently displayed
- Partner logo strips
- Clear program/pillar card grid

---

## 11. Image & Photography Direction

- Use high-quality nature photography (forest, wildlife, coastal, community)
- Subjects: Sulawesi wildlife (anoa), reforestation, community activities, coastal ecosystems
- Color grade: slightly warm, natural — avoid oversaturated or cold blue tones
- Overlays on images: use `--color-green-dark` at 50–70% opacity for text readability
- Avoid: generic stock photos, overly posed corporate imagery

---

## 12. How to Use This Design System with Claude Code

When prompting Claude Code to build components or pages, include this instruction:

```
Follow the design system in DESIGN_SYSTEM.md.
Use CSS variables from tokens.css — never hardcode colors, font sizes, or spacing.
Font: Montserrat (Bold for headings, SemiBold for sub-headings, Regular for body).
Primary CTA color: --color-accent (red). Primary brand: --color-green / --color-green-dark.
Default page background: --color-cream.
Visual style: Natural, professional, humanis, inspirational. Similar to WWF or KEHATI websites.
```
