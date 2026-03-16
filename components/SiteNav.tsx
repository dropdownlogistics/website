'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink { href: string; label: string; }
interface NavGroup { label: string; items: NavLink[]; }
interface Wing { id: string; name: string; color: string; home: string; groups: NavGroup[]; }

// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
// Wing Definitions
// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

const wingsData: Wing[] = [
  {
    id: 'ddl',
    name: 'DDL',
    color: '#B23531',
    home: '/ddl',
    groups: [
      {
        label: 'Governance',
        items: [
          { href: '/council', label: 'Council' },
          { href: '/standards', label: 'Standards' },
          { href: '/systems', label: 'Systems' },
          { href: '/registry', label: 'Registry' },
          { href: '/excelligence', label: 'Graph' },
        ],
      },
      {
        label: 'Framework',
        items: [
          { href: '/methodology', label: 'Methodology' },
          { href: '/mindframe', label: 'MindFrame' },
          { href: '/dexos', label: 'DexOS' },
          { href: '/guides/llm', label: 'LLM Guide' },
        ],
      },
      {
        label: 'Story',
        items: [
          { href: '/memoir', label: 'Memoir' },
          { href: '/forewords', label: 'Forewords' },
          { href: '/about', label: 'About' },
        ],
      },
      {
        label: 'Work',
        items: [
          { href: '/projects', label: 'Projects' },
          { href: '/prioritease', label: 'PrioritEase' },
        ],
      },
    ],
  },
  {
    id: 'da',
    name: 'D&A',
    color: '#C49A3C',
    home: '/blindspot',
    groups: [
      {
        label: 'Modules',
        items: [
          { href: '/blindspot/trading', label: 'Trading' },
          { href: '/blindspot/steam', label: 'Steam' },
          { href: '/blindspot/campaign', label: 'Campaign' },
          { href: '/blindspot/backtest', label: 'Backtest' },
          { href: '/blindspot/llm', label: 'LLM Setup' },
        ],
      },
      {
        label: 'Recaps',
        items: [
          { href: '/recaps', label: 'All Recaps' },
          { href: '/recaps/apple-music', label: 'Apple Music' },
          { href: '/recaps/annual-signal', label: 'Annual Signal' },
          { href: '/recaps/predictions', label: 'Predictions' },
        ],
      },
    ],
  },
  {
    id: 'dexverse',
    name: 'DexVerse',
    color: '#8a6cc9',
    home: '/dexlore',
    groups: [
      {
        label: 'Lore',
        items: [
          { href: '/dexlore', label: 'Hub' },
          { href: '/dexlore/continuum', label: 'Continuum' },
          { href: '/dexlore/council', label: 'Companions' },
          { href: '/other-works', label: 'Other Works' },
        ],
      },
      {
        label: 'Reference',
        items: [
          { href: '/knowledge/glossary', label: 'Glossary' },
          { href: '/methodology/palette', label: 'Template Palette' },
          { href: '/methodology/palette/narrative', label: 'Palette Narrative' },
        ],
      },
    ],
  },
  {
    id: 'dossiers',
    name: 'Dossiers',
    color: '#4A9E6B',
    home: '/dossiers',
    groups: [
      {
        label: 'D&D 5e',
        items: [
          { href: '/dossiers/feliciano', label: 'Feliciano' },
          { href: '/dossiers/hillie', label: 'Hillie' },
          { href: '/dossiers/ash-snow-steel', label: 'Party' },
        ],
      },
      {
        label: 'Divinity: OS2',
        items: [
          { href: '/dossiers/merrick', label: 'Merrick' },
          { href: '/dossiers/riflen', label: 'Riflen' },
          { href: '/dossiers/doc-rickets', label: 'Doc Rickets' },
          { href: '/dossiers/fort-joy', label: 'Party' },
        ],
      },
      {
        label: 'Skyrim',
        items: [
          { href: '/dossiers/xuth-jr', label: 'Xuth Jr.' },
          { href: '/dossiers/xuth-iii', label: 'Xuth III' },
          { href: '/dossiers/xuth-sr', label: 'Xuth Sr.' },
          { href: '/dossiers/leafshadow-lineage', label: 'Chronicle' },
        ],
      },
    ],
  },
  {
    id: 'bench',
    name: 'The Bench',
    color: '#4A7C9B',
    home: '/bench',
    groups: [
      {
        label: 'Tools',
        items: [
          { href: '/bench/onenote', label: 'OneNote' },
          { href: '/bench/excel', label: 'Excel' },
          { href: '/bench/word', label: 'Word' },
          { href: '/bench/visio', label: 'Visio' },
          { href: '/bench/cmd', label: 'CMD' },
          { href: '/bench/powershell', label: 'PowerShell' },
          { href: '/bench/adobe', label: 'Adobe' },
        ],
      },
    ],
  },
  {
    id: 'canonpress',
    name: 'CanonPress',
    color: '#B23531',
    home: '/canonpress',
    groups: [
      {
        label: 'Series',
        items: [
          { href: '/canonpress/converge', label: 'Converge' },
          { href: '/canonpress/redline', label: 'RedLine' },
          { href: '/canonpress/deepcut', label: 'DeepCut' },
          { href: '/canonpress/groundtruth', label: 'GroundTruth' },
          { href: '/canonpress/insideinsights', label: 'InsideInsights' },
        ],
      },
      {
        label: 'Meta',
        items: [
          { href: '/canonpress/schedule', label: 'Schedule' },
          { href: '/canonpress/tuning-log', label: 'CanonTuning' },
        ],
      },
    ],
  },
  {
    id: 'auditforge',
    name: 'AuditForge',
    color: '#2C7A7B',
    home: '/auditforge',
    groups: [
      {
        label: 'Product',
        items: [
          { href: '/auditforge/current', label: 'Current Build' },
          { href: '/auditforge/branding', label: 'Brand Kit' },
        ],
      },
    ],
  },
];

// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
// Wing Detection
// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

const routeWingMap: Record<string, string> = {
  // D&A wing
  '/blindspot': 'da',
  '/recaps': 'da',
  '/analytics': 'da',
  // DexVerse wing
  '/dexlore': 'dexverse',
  '/other-works': 'dexverse',
  '/knowledge/glossary': 'dexverse',
  '/methodology/palette': 'dexverse',
  '/dexverse': 'dexverse',
  // Dossiers wing
  '/dossiers': 'dossiers',
  // The Bench wing
  '/bench': 'bench',
  // CanonPress wing
  '/canonpress': 'canonpress',
  // AuditForge wing
  '/auditforge': 'auditforge',
  // Everything else -> DDL
};

function detectWing(pathname: string | null): Wing {
  if (!pathname) return wingsData[0];

  const sortedPrefixes = Object.keys(routeWingMap).sort((a, b) => b.length - a.length);
  for (const prefix of sortedPrefixes) {
    if (pathname.startsWith(prefix)) {
      const wingId = routeWingMap[prefix];
      return wingsData.find(w => w.id === wingId) || wingsData[0];
    }
  }

  return wingsData[0];
}

// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
// Dropdown Component
// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

function Dropdown({ group, isActive, pathname, wingColor }: {
  group: NavGroup;
  isActive: (h: string) => boolean;
  pathname: string | null;
  wingColor: string;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const groupActive = group.items.some(i => isActive(i.href));

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div
      onMouseEnter={() => { if (timer.current) clearTimeout(timer.current); setOpen(true); }}
      onMouseLeave={() => { timer.current = setTimeout(() => setOpen(false), 120); }}
      style={{ position: 'relative' }}
    >
      <button onClick={() => setOpen(!open)} style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
        color: groupActive ? 'rgba(245,241,235,0.8)' : 'rgba(245,241,235,0.4)',
        background: open ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: 'none', padding: '5px 10px', borderRadius: 5, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s',
        letterSpacing: '0.05em',
      }}>
        {group.label}
        <span style={{ fontSize: 8, opacity: 0.5, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'inline-block' }}>Ã¢â€“Â¼</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 100,
          background: '#0e1a27', border: '1px solid rgba(245,241,235,0.06)',
          borderRadius: 8, padding: '6px 0', minWidth: 160,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {group.items.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'block', padding: '7px 16px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: isActive(item.href) ? wingColor : 'rgba(245,241,235,0.55)',
              textDecoration: 'none', transition: 'color 0.12s',
              borderLeft: isActive(item.href) ? `2px solid ${wingColor}` : '2px solid transparent',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = wingColor)}
              onMouseLeave={e => (e.currentTarget.style.color = isActive(item.href) ? wingColor : 'rgba(245,241,235,0.55)')}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
// Wing Switcher
// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

function WingSwitcher({ wings, activeWing, setActiveWing }: {
  wings: Wing[];
  activeWing: Wing;
  setActiveWing: (w: Wing) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {wings.map(wing => (
        <Link
          key={wing.id}
          href={wing.home}
          onClick={() => setActiveWing(wing)}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: activeWing.id === wing.id ? 700 : 500,
            fontSize: 13,
            color: activeWing.id === wing.id ? wing.color : 'rgba(245,241,235,0.4)',
            textDecoration: 'none',
            padding: '4px 10px',
            borderRadius: 5,
            transition: 'all 0.15s',
            background: activeWing.id === wing.id ? `${wing.color}15` : 'transparent',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => {
            if (activeWing.id !== wing.id) {
              (e.currentTarget as HTMLElement).style.color = wing.color;
              (e.currentTarget as HTMLElement).style.background = `${wing.color}10`;
            }
          }}
          onMouseLeave={e => {
            if (activeWing.id !== wing.id) {
              (e.currentTarget as HTMLElement).style.color = 'rgba(245,241,235,0.4)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }
          }}
        >
          {wing.name}
        </Link>
      ))}
    </div>
  );
}

// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
// Main SiteNav
// Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

export default function SiteNav() {
  const pathname = usePathname();
  const [activeWing, setActiveWing] = useState<Wing>(() => detectWing(pathname));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setActiveWing(detectWing(pathname));
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  if (pathname === '/') return null;

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <>
      <style>{`
        .ddl-nav { position: sticky; top: 0; z-index: 50; background: rgba(13,27,42,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245,241,235,0.06); }
        .ddl-nav-inner { max-width: 1400px; margin: 0 auto; padding: 0 20px; height: 56px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .ddl-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .ddl-logo-mark { width: 28px; height: 28px; border-radius: 6px; background: #B23531; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 12px; color: #F5F1EB; }
        .ddl-logo-text { display: flex; flex-direction: column; gap: 1px; }
        .ddl-logo-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 14px; color: #F5F1EB; letter-spacing: -0.02em; line-height: 1; }
        .ddl-logo-sub { font-family: 'JetBrains Mono', monospace; font-size: 8px; color: rgba(245,241,235,0.3); letter-spacing: 0.05em; line-height: 1; }
        .ddl-desktop { display: flex; align-items: center; gap: 12px; flex: 1; overflow: visible; }
        .ddl-sep { width: 1px; height: 20px; background: rgba(245,241,235,0.08); flex-shrink: 0; }
        .ddl-groups { display: flex; align-items: center; gap: 2px; flex-wrap: nowrap; }
        .ddl-mob-btn { display: none; background: transparent; border: none; cursor: pointer; padding: 8px; color: rgba(245,241,235,0.6); font-size: 20px; line-height: 1; }
        .ddl-mobile-menu { position: fixed; inset: 56px 0 0 0; background: #0D1B2A; z-index: 49; overflow-y: auto; padding: 24px 20px; display: flex; flex-direction: column; gap: 24px; }
        .ddl-mob-wing { display: flex; flex-direction: column; gap: 8px; }
        .ddl-mob-wing-label { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 13px; padding: 4px 0; border-bottom: 1px solid rgba(245,241,235,0.06); padding-bottom: 8px; }
        .ddl-mob-group-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(245,241,235,0.3); letter-spacing: 0.15em; padding: 8px 0 4px; }
        .ddl-mob-link { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: rgba(245,241,235,0.6); text-decoration: none; padding: 6px 0; display: block; }
        @media (max-width: 960px) { .ddl-desktop { display: none; } .ddl-mob-btn { display: flex; align-items: center; } }
        @media (min-width: 961px) { .ddl-mobile-menu { display: none !important; } }
      `}</style>

      <nav className="ddl-nav">
        <div className="ddl-nav-inner">
          {/* Logo */}
          <Link href="/" className="ddl-logo">
            <div className="ddl-logo-mark">DD</div>
            <div className="ddl-logo-text">
              <span className="ddl-logo-name">Dropdown Logistics</span>
              <span className="ddl-logo-sub">Chaos → Structured → Automated</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="ddl-desktop">
            <WingSwitcher wings={wingsData} activeWing={activeWing} setActiveWing={setActiveWing} />
            <div className="ddl-sep" />
            <div className="ddl-groups">
              {activeWing.groups.map(group => (
                <Dropdown
                  key={group.label}
                  group={group}
                  isActive={isActive}
                  pathname={pathname}
                  wingColor={activeWing.color}
                />
              ))}
            </div>
          </div>

          {/* Mobile button */}
          <button className="ddl-mob-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="ddl-mobile-menu">
          {wingsData.map(wing => (
            <div key={wing.id} className="ddl-mob-wing">
              <Link href={wing.home} className="ddl-mob-wing-label" style={{ color: wing.color, textDecoration: 'none' }}>
                {wing.name}
              </Link>
              {wing.groups.map(group => (
                <div key={group.label}>
                  <div className="ddl-mob-group-label">{group.label}</div>
                  {group.items.map(item => (
                    <Link key={item.href} href={item.href} className="ddl-mob-link"
                      style={{ color: isActive(item.href) ? wing.color : 'rgba(245,241,235,0.6)' }}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}


