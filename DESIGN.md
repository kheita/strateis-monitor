# DESIGN.md — Strateis Monitor Design System

Inspired by worldmonitor.app — adapted for the Strateis ecosystem.

## 1. Philosophy

Dashboard d'intelligence en temps reel. Chaque pixel doit communiquer de la donnee.
Aucun espace vide. Densite maximale. Tout est cliquable ou informatif.
Dark-first. L'interface doit etre confortable pour une utilisation prolongee.

## 2. Colors

### Backgrounds (depth layers)

| Token             | Value      | Usage                         |
|--------------------|-----------|-------------------------------|
| `--bg-deep`        | `#060B14` | Global background             |
| `--bg-panel`       | `#0B1121` | Panel backgrounds             |
| `--bg-card`        | `#0F172A` | Headers, internal cards       |
| `--bg-hover`       | `#1A2332` | Hover state on items          |
| `--bg-active`      | `#1E293B` | Active/selected state         |

### Borders

| Token              | Value         | Usage               |
|---------------------|--------------|----------------------|
| `--border-primary`  | `#1E293B`    | Panel borders        |
| `--border-subtle`   | `#1E293B40`  | Item separators      |
| `--border-active`   | `#D4A85340`  | Active element       |

### Text

| Token              | Value      | Usage               |
|---------------------|-----------|----------------------|
| `--text-primary`    | `#E2E8F0` | Primary text         |
| `--text-secondary`  | `#94A3B8` | Labels, metadata     |
| `--text-muted`      | `#64748B` | Very discreet text   |

### Brand

| Token        | Value                       |
|--------------|------------------------------|
| `--gold`     | `#D4A853`                    |
| `--gold-dim` | `#C5952A`                    |
| `--gold-glow`| `rgba(212,168,83,0.3)`       |

### Semantic

| Color   | Main      | Background (7%) |
|---------|-----------|------------------|
| Red     | `#EF4444` | `#EF444412`      |
| Green   | `#22C55E` | `#22C55E12`      |
| Orange  | `#F59E0B` | `#F59E0B12`      |
| Blue    | `#3B82F6` | `#3B82F612`      |
| Cyan    | `#06B6D4` | `#06B6D412`      |
| Purple  | `#A78BFA` | `#A78BFA12`      |
| Pink    | `#EC4899` | `#EC489912`      |

## 3. Typography

### Families

- **Mono**: `'JetBrains Mono', monospace` — data, labels, tags, KPIs
- **Sans**: `'DM Sans', sans-serif` — titles, body text, descriptions

### Scale

| Size | Usage                                                | Font   | Weight | Style                    |
|------|------------------------------------------------------|--------|--------|--------------------------|
| 8px  | Micro labels, timestamps, legends                    | mono   | 500    | uppercase, ls 0.08em     |
| 9px  | Tags, badges                                         | mono   | 700    | uppercase, ls 0.06em     |
| 10px | Panel headers, metadata                              | mono   | 600    | uppercase, ls 0.1em      |
| 11px | Feed body text, descriptions                         | sans   | 400    | normal case              |
| 13px | KPI values, country names                            | mono   | 700    | —                        |
| 16px | Large KPI values                                     | mono   | 700    | —                        |
| 22px | Hero KPI values                                      | mono   | 800    | —                        |
| 9px  | Nav tabs                                             | mono   | 700    | uppercase, ls 0.08em     |

### Rules

- ALL data/label text = font-mono, uppercase, letter-spacing
- ALL content/description text = font-sans, normal case
- Numbers are ALWAYS font-mono

## 4. Panels

### Structure

```
+----------------------------------+
| HEADER (bg-card, h:32px)         |
|  icon  TITLE  [LIVE]    count    |
+----------------------------------+
| CONTENT (bg-panel, flex:1)       |
|                                  |
+----------------------------------+
```

### Rules

- `border: 1px solid var(--border-primary)`
- `border-radius: 5px`
- `height: 100%; display: flex; flex-direction: column`
- Header: `bg-card, backdrop-filter: blur(8px), box-shadow: 0 1px 3px rgba(0,0,0,0.3)`
- Content: `flex: 1; overflow: hidden; min-height: 0`

## 5. Tags / Badges

```
background: {color}12;
color: {color};
border: 1px solid {color}30;
font: 700 8px var(--font-mono);
letter-spacing: 0.06em;
text-transform: uppercase;
padding: 1px 5px;
border-radius: 2px;
```

## 6. Feed Items

- Default: `padding: 7px 12px; border-bottom: 1px solid var(--border-subtle); transition: all 0.15s ease`
- Hover: `background: var(--bg-hover); border-left: 2px solid var(--gold); padding-left: 10px`
- Line 1: SOURCE (mono 8px) + TAG + TIME (right-aligned)
- Line 2: TITLE (sans 11px, line-height 1.35)

## 7. Sparklines

- Width: 50-80px, Height: 16-24px
- Line: `stroke {color}, strokeWidth 1.5, strokeLinejoin round`
- Fill: gradient `{color} opacity 0.15 -> transparent`
- Last point: `circle r=2, fill {color}, glow shadow`
- No axes, no labels

## 8. Grid

- Container: `padding: 6px 8px`
- Gap: `6px` (both rows and columns)
- Every panel: `height: 100%; min-height: 0`
- No visible empty space

## 9. TopBar

- Height: 40px
- Logo "S": 24x24, rounded 5px, gold gradient, glow shadow
- Nav tabs: `font: 700 9px mono; uppercase; ls 0.08em`
- Active tab: gold text, gold/12 bg, gold/25 border
- Inactive: text-secondary

## 10. Ticker

- Height: 24px
- Background: `rgba(212,168,83,0.04)`
- Borders: `rgba(212,168,83,0.08)`
- Font: `400 9px mono`, color gold
- Animation: `tickerScroll 50s linear infinite`
- Dots between items colored by category

## 11. Responsive

- `>1400px`: 3 columns full layout
- `1000-1400px`: 2 columns, panels stacked
- `<1000px`: single column, everything stacked
- Mobile: compact topbar, ticker hidden, full-width panels
