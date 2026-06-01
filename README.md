# 🏋️‍♂️ GymRank — Vystup z řady, ovládni gym

GymRank není jen další nudný fitness deník na zapisování sérií a opakování. Je to **komunitní a analytická platforma** navržená pro lidi, kteří to se silovým tréninkem myslí vážně. 

Cílem projektu je vnést do lokálních posiloven zdravou kompetitivnost, gamifikaci a spravedlivé porovnávání silových výkonů bez ohledu na to, zda vážíš 70 kg nebo metrák.

---

## 🎯 Hlavní vize & Proč GymRank vznikl?

Většina fitness aplikací izoluje uživatele do jejich vlastních statistik. GymRank mění pravidla hry:
* **Spravedlivé srovnání (Pound-for-Pound):** Díky integraci pokročilého **Wilks koeficientu** aplikace dokáže objektivně porovnat sílu lehkých a těžkých atletů. Už žádné debaty o tom, kdo je v gymu reálně nejsilnější.
* **Komunitní žebříčky:** Motivace roste, když vidíš, jak si stojíš v porovnání s ostatními. GymRank staví žebříčky na reálných maximech (PRs).
* **Čistý a rychlý zážitek:** Žádný zbytečný balast. Rychlé zapsání výkonu na mobilu přímo mezi sériemi a okamžitá aktualizace tvého ranku.

---

## 🛠️ Použitý Tech Stack (Moderní & Efektivní)

Projekt je postaven na bleeding-edge technologiích s důrazem na rychlost, typovou bezpečnost a skvělé UX:

* **Frontend & SSR:** [Svelte 5](https://svelte.dev/) — Využívá nejnovější architekturu **Runes** (`$state`, `$derived`, `$props`) pro bleskurychlou reaktivitu a ultra lehký výsledný bundle.
* **Framework:** [SvelteKit](https://kit.svelte.dev/) — Zajišťuje robustní Server-Side Rendering (SSR) a optimalizované routování.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) — Pro plně responzivní, moderní UI s podporou Dark Mode, optimalizované pro rychlé použití na mobilu v gymu.
* **Backend & Auth:** [Supabase](https://supabase.com/) — Bezpečné ověřování uživatelů (včetně integrace Captchy a pokročilého ošetření resetů hesel/registrací) a realtime databázové capabilities.
* **ORM & Databáze:** [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL — Typově bezpečné dotazování do databáze. Váhy a statistiky jsou ukládány v gramech (pro absolutní přesnost výpočtů bez zaokrouhlovacích chyb floatiů).
* **Hosting:** [Vercel](https://vercel.com/) — Serverless nasazení s okamžitými builds.

---

## 🚀 Technické výzvy, které jsem v projektu vyřešil

GymRank není jen poslepovaný boilerplate. Během vývoje jsem musel vyřešit několik netriviálních inženýrských problémů:

### 1. Matematický engine pro Wilks Score
Implementace polynomické rovnice 5. stupně přímo v TypeScriptu, která bere v potaz pohlaví a převádí interní gramové hodnoty z PostgreSQL na kilogramové vstupy pro přesné vyhodnocení relativní síly.

### 2. Agregační SQL queries v Drizzle
Sestavení komplexních databázových dotazů pro generování unikátního žebříčku. Dotaz efektivně filtruje a izoluje pouze absolutní maxima každého uživatele (odstranění duplicit) a řadí celou databázi v reálném čase.

### 3. Neprůstřelné Auth Flow na mobilních zařízeních
Vyřešení problému s in-app prohlížeči mobilních e-mailových klientů (Gmail/Outlook), které standardně blokují cookies. Auth callback byl navržen tak, aby bezpečně přenášel tokeny přímo v URL a umožnil lidem resetovat heslo na jedno kliknutí přímo z telefonu.

---

## 📈 Plány do budoucna (Roadmap)

- [ ] **IPF GL Points:** Přidání modernějšího srovnávacího standardu vedle klasického Wilkse.
- [ ] **Historie progresu:** Interaktivní grafy ukazující vývoj maximálek v čase.
- [ ] **Verifikace výkonů:** Možnost nahrát video/odkaz na pokus, který následně schválí správce gymu (prevence "fake" výkonů).
- [ ] **Týmové výzvy:** Možnost zakládat uzavřené miniligy pro party kamarádů.

---

📄 **Autor:** Filip Šandera  
🌐 **Live projekt:** [www.gymrank.cz](https://www.gymrank.cz)