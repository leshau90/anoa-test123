// @ts-check
import { test, expect } from '@playwright/test';

/** Navigate to a section using the SPA nav() function */
async function goTo(page, sectionId) {
  await page.evaluate((id) => window.nav(id), sectionId);
  await page.waitForTimeout(300);
}

/** Read a CSS custom property from :root */
async function cssVar(page, name) {
  return page.evaluate(
    (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(),
    name,
  );
}

// ─── Setup ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
});

// ─── 1. COLOR PALETTE ─────────────────────────────────────────────────────────

test.describe('1. Color Palette', () => {
  test('Merah (red) token is #A0272A', async ({ page }) => {
    expect(await cssVar(page, '--color-red')).toBe('#A0272A');
  });

  test('Coklat (brown) token is #8B6331', async ({ page }) => {
    expect(await cssVar(page, '--color-brown')).toBe('#8B6331');
  });

  test('Hijau (green) token is #4A7C3F', async ({ page }) => {
    expect(await cssVar(page, '--color-green')).toBe('#4A7C3F');
  });

  test('Hijau Tua (dark green) token is #1F4E2C', async ({ page }) => {
    expect(await cssVar(page, '--color-green-dark')).toBe('#1F4E2C');
  });

  test('Krem (cream) token is #F5F0E8', async ({ page }) => {
    expect(await cssVar(page, '--color-cream')).toBe('#F5F0E8');
  });

  test('Hitam (black) token is #1A1A1A', async ({ page }) => {
    expect(await cssVar(page, '--color-black')).toBe('#1A1A1A');
  });
});

// ─── 2. TYPOGRAPHY ────────────────────────────────────────────────────────────

test.describe('2. Typography', () => {
  test('Montserrat is the primary font family token', async ({ page }) => {
    const val = await cssVar(page, '--font-family');
    expect(val).toContain('Montserrat');
  });

  test('heading weight token is 700 (Bold)', async ({ page }) => {
    expect(await cssVar(page, '--font-weight-bold')).toBe('700');
  });

  test('sub-heading weight token is 600 (SemiBold)', async ({ page }) => {
    expect(await cssVar(page, '--font-weight-semibold')).toBe('600');
  });

  test('body weight token is 400 (Regular)', async ({ page }) => {
    expect(await cssVar(page, '--font-weight-regular')).toBe('400');
  });

  test('hero H1 uses Montserrat font', async ({ page }) => {
    const fontFamily = await page.locator('#hero-title-display').evaluate(
      (el) => getComputedStyle(el).fontFamily,
    );
    expect(fontFamily).toContain('Montserrat');
  });

  test('hero H1 uses bold weight (≥700)', async ({ page }) => {
    const weight = await page.locator('#hero-title-display').evaluate(
      (el) => parseInt(getComputedStyle(el).fontWeight, 10),
    );
    expect(weight).toBeGreaterThanOrEqual(700);
  });
});

// ─── 3. NAVIGATION STRUCTURE ─────────────────────────────────────────────────

test.describe('3. Navigation Structure', () => {
  test('navbar is visible', async ({ page }) => {
    await expect(page.locator('#navbar')).toBeVisible();
  });

  test('nav has "Home" item', async ({ page }) => {
    await expect(page.locator('#nl-beranda')).toBeVisible();
  });

  test('nav has "Tentang Kami" item', async ({ page }) => {
    await expect(page.locator('#nl-tentang')).toBeVisible();
  });

  test('nav has "Program" item', async ({ page }) => {
    await expect(page.locator('#nl-program')).toBeVisible();
  });

  test('nav has "Publikasi & Penelitian" item', async ({ page }) => {
    await expect(page.locator('#nl-publikasi')).toBeVisible();
  });

  test('nav has "Mitra & Donor" item', async ({ page }) => {
    await expect(page.locator('#nl-berita')).toBeVisible();
  });

  test('nav has "Kontak" item', async ({ page }) => {
    await expect(page.locator('#nl-kontak')).toBeVisible();
  });
});

// ─── 4. HERO SECTION ─────────────────────────────────────────────────────────

test.describe('4. Hero Section', () => {
  test('hero H1 contains "Alam Lestari"', async ({ page }) => {
    await expect(page.locator('#hero-title-display')).toContainText('Alam Lestari');
  });

  test('hero H1 contains "Nusantara"', async ({ page }) => {
    await expect(page.locator('#hero-title-display')).toContainText('Nusantara');
  });

  test('hero H1 contains "Kearifan"', async ({ page }) => {
    await expect(page.locator('#hero-title-display')).toContainText('Kearifan');
  });

  test('"Lihat Program" CTA button is visible', async ({ page }) => {
    await expect(page.locator('#hero .btn-p')).toBeVisible();
    await expect(page.locator('#hero .btn-p')).toContainText('Lihat Program');
  });

  test('"Donasi" CTA button is visible', async ({ page }) => {
    await expect(page.locator('#hero .btn-s')).toBeVisible();
    await expect(page.locator('#hero .btn-s')).toContainText('Donasi');
  });

  test('"Donasi" button navigates to donasi section', async ({ page }) => {
    await page.locator('#hero .btn-s').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#pp-donasi')).toHaveClass(/active/);
  });

  test('hero shows "Pohon Ditanam" stat', async ({ page }) => {
    await expect(page.locator('#stat-pohon')).toBeVisible();
  });

  test('hero shows "Program Utama" stat', async ({ page }) => {
    await expect(page.locator('#stat-prog')).toBeVisible();
  });

  test('hero shows "Dukungan Mitra" stat', async ({ page }) => {
    await expect(page.locator('#stat-mitra')).toBeVisible();
  });
});

// ─── 5. FIVE VALUE PILLARS ───────────────────────────────────────────────────

test.describe('5. Five Value Pillars', () => {
  const pillars = ['Konservasi', 'Pemberdayaan', 'Kolaboratif', 'Keberlanjutan', 'Edukasi'];

  for (const pillar of pillars) {
    test(`"${pillar}" pillar is visible somewhere on the page`, async ({ page }) => {
      const locator = page.getByText(pillar, { exact: false }).first();
      await expect(locator).toBeVisible();
    });
  }
});

// ─── 6. VISI & MISI ──────────────────────────────────────────────────────────

test.describe('6. Visi & Misi', () => {
  test('Visi contains "Alam Lestari"', async ({ page }) => {
    await expect(page.locator('#visi-display')).toContainText('Alam Lestari');
  });

  test('Visi contains "Kearifan Masyarakat Nusantara"', async ({ page }) => {
    await expect(page.locator('#visi-display')).toContainText('Kearifan Masyarakat Nusantara');
  });

  test('Misi has exactly 5 items', async ({ page }) => {
    const count = await page.locator('#misi-display li').count();
    expect(count).toBe(5);
  });

  test('Misi item 1 mentions konservasi dan kearifan lokal', async ({ page }) => {
    await expect(page.locator('#misi-display li').nth(0)).toContainText('konservasi');
  });

  test('Misi item 4 mentions kolaborasi', async ({ page }) => {
    await expect(page.locator('#misi-display li').nth(3)).toContainText('kolaborasi');
  });

  test('Misi item 5 mentions mitigasi', async ({ page }) => {
    await expect(page.locator('#misi-display li').nth(4)).toContainText('mitigasi');
  });
});

// ─── 7. FOUR MAIN PROGRAMS ───────────────────────────────────────────────────

test.describe('7. Program Utama', () => {
  test.beforeEach(async ({ page }) => {
    await goTo(page, 'program');
  });

  test('Program A: "Pelestarian Lingkungan Hidup" is displayed', async ({ page }) => {
    await expect(page.locator('#pp-program')).toContainText('Pelestarian Lingkungan Hidup');
  });

  test('Program B: "Pemberdayaan Sosial" is displayed', async ({ page }) => {
    await expect(page.locator('#pp-program')).toContainText('Pemberdayaan Sosial');
  });

  test('Program C: "Pendidikan" and "Penelitian" are displayed', async ({ page }) => {
    await expect(page.locator('#pp-program')).toContainText('Pendidikan');
    await expect(page.locator('#pp-program')).toContainText('Penelitian');
  });

  test('Program D: "Kegiatan Kemanusiaan" is displayed', async ({ page }) => {
    await expect(page.locator('#pp-program')).toContainText('Kegiatan Kemanusiaan');
  });

  test('Program A contains environmental items (Penghijauan, Rehabilitasi, Konservasi hayati)', async ({ page }) => {
    await goTo(page, 'beranda');
    const progGrid = page.locator('#prog-display-beranda');
    await expect(progGrid).toContainText('Penghijauan');
    await expect(progGrid).toContainText('Rehabilitasi');
    await expect(progGrid).toContainText('keanekaragaman hayati');
  });

  test('Program C contains research items (Penelitian ilmu pengetahuan)', async ({ page }) => {
    await goTo(page, 'beranda');
    const progGrid = page.locator('#prog-display-beranda');
    await expect(progGrid).toContainText('ilmu pengetahuan');
  });
});

// ─── 8. HOME PAGE SECTIONS ───────────────────────────────────────────────────

test.describe('8. Home Page Sections', () => {
  test('Tentang Singkat section is present on home', async ({ page }) => {
    await expect(page.locator('#about-short-display')).toBeVisible();
  });

  test('Tentang Singkat mentions konservasi lingkungan', async ({ page }) => {
    await expect(page.locator('#about-short-display')).toContainText('konservasi lingkungan');
  });

  test('Program grid on home shows 4 programs', async ({ page }) => {
    const count = await page.locator('#prog-display-beranda .prog-card, #prog-display-beranda > div').count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('Mitra/Kolaborasi section is present on home', async ({ page }) => {
    await expect(page.locator('#mitra-display')).toBeVisible();
  });
});

// ─── 9. TENTANG KAMI PAGE ────────────────────────────────────────────────────

test.describe('9. Tentang Kami Page', () => {
  test.beforeEach(async ({ page }) => {
    await goTo(page, 'tentang');
  });

  test('Tentang page shows Sejarah/description', async ({ page }) => {
    await expect(page.locator('#about-long-display')).toBeVisible();
  });

  test('Visi & Misi block is visible on Tentang page', async ({ page }) => {
    await expect(page.locator('#visi-display-2')).toBeVisible();
  });

  test('Legalitas section is visible', async ({ page }) => {
    await expect(page.locator('#pp-tentang')).toContainText('Legalitas');
  });

  test('Struktur Organisasi section is visible', async ({ page }) => {
    await expect(page.locator('#pp-tentang')).toContainText('Pengurus');
  });
});

// ─── 10. KONTAK PAGE ─────────────────────────────────────────────────────────

test.describe('10. Kontak Page', () => {
  test.beforeEach(async ({ page }) => {
    await goTo(page, 'kontak');
  });

  test('Office address is shown', async ({ page }) => {
    await expect(page.locator('#kontak-alamat-display')).toBeVisible();
    await expect(page.locator('#kontak-alamat-display')).toContainText('Bogor');
  });

  test('Phone/WhatsApp number is shown', async ({ page }) => {
    await expect(page.locator('#kontak-telp-display')).toBeVisible();
    await expect(page.locator('#kontak-telp-display')).toContainText('+62');
  });

  test('Email address is shown', async ({ page }) => {
    await expect(page.locator('#kontak-email-display')).toBeVisible();
    await expect(page.locator('#kontak-email-display')).toContainText('jejakanoa.id');
  });

  test('WhatsApp link is present in contact section', async ({ page }) => {
    const waLink = page.locator('#pp-kontak a[href*="wa.me"], #pp-kontak a[href*="whatsapp"]');
    await expect(waLink.first()).toBeVisible();
  });

  test('Social media links are present', async ({ page }) => {
    const socialLinks = page.locator('#pp-kontak a[href*="instagram"], #pp-kontak a[href*="facebook"], #pp-kontak a[href*="twitter"], #pp-kontak a[href*="tiktok"], .social-links a, #kontak-sosmed a');
    await expect(socialLinks.first()).toBeVisible();
  });

  test('Contact form is visible', async ({ page }) => {
    await expect(page.locator('#pp-kontak .kf')).toBeVisible();
  });
});

// ─── 11. PAGE NAVIGATION ─────────────────────────────────────────────────────

test.describe('11. SPA Navigation', () => {
  test('clicking Tentang shows pp-tentang', async ({ page }) => {
    await goTo(page, 'tentang');
    await expect(page.locator('#pp-tentang')).toHaveClass(/active/);
    await expect(page.locator('#pp-beranda')).not.toHaveClass(/active/);
  });

  test('clicking Program shows pp-program', async ({ page }) => {
    await goTo(page, 'program');
    await expect(page.locator('#pp-program')).toHaveClass(/active/);
  });

  test('clicking Publikasi shows pp-publikasi', async ({ page }) => {
    await goTo(page, 'publikasi');
    await expect(page.locator('#pp-publikasi')).toHaveClass(/active/);
  });

  test('clicking Kontak shows pp-kontak', async ({ page }) => {
    await goTo(page, 'kontak');
    await expect(page.locator('#pp-kontak')).toHaveClass(/active/);
  });

  test('clicking Home (beranda) restores home page', async ({ page }) => {
    await goTo(page, 'tentang');
    await goTo(page, 'beranda');
    await expect(page.locator('#pp-beranda')).toHaveClass(/active/);
  });
});

// ─── 12. VISUAL STYLE COMPLIANCE ─────────────────────────────────────────────

test.describe('12. Visual Style', () => {
  test('page title contains "Jejak Anoa"', async ({ page }) => {
    await expect(page).toHaveTitle(/Jejak Anoa/i);
  });

  test('hero background is dark (not white)', async ({ page }) => {
    const bg = await page.locator('#hero').evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    // Dark background — not rgb(255,255,255)
    expect(bg).not.toBe('rgb(255, 255, 255)');
  });

  test('primary CTA button uses red/accent color', async ({ page }) => {
    const bg = await page.locator('#hero .btn-p').evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    // Should contain red-ish values (r > 100, g < 100)
    const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      expect(parseInt(match[1])).toBeGreaterThan(100); // Red channel
      expect(parseInt(match[2])).toBeLessThan(100);    // Green channel low
    }
  });
});
