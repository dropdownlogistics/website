'use client';
import { useState } from "react";

// ═══════════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════════
const C = {
  navy: "#0D1B2A",
  card: "#10202f",
  cardHover: "#162538",
  crimson: "#B23531",
  crimsonDim: "rgba(178,53,49,0.2)",
  crimsonFaint: "rgba(178,53,49,0.08)",
  cream: "#F5F1EB",
  creamHigh: "rgba(245,241,235,0.85)",
  creamMid: "rgba(245,241,235,0.55)",
  creamDim: "rgba(245,241,235,0.3)",
  creamGhost: "rgba(245,241,235,0.08)",
  border: "rgba(245,241,235,0.06)",
  borderMed: "rgba(245,241,235,0.1)",
  green: "#4A9E6B",
  greenDim: "rgba(74,158,107,0.15)",
  amber: "#C49A3C",
  amberDim: "rgba(196,154,60,0.15)",
  blue: "#6B9DC2",
  blueDim: "rgba(107,157,194,0.15)",
  violet: "#8a6cc9",
  violetDim: "rgba(138,108,201,0.15)",
  rose: "#c94a6e",
  roseDim: "rgba(201,74,110,0.15)",
  ember: "#c98a4a",
  emberDim: "rgba(201,138,74,0.15)",
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════

const artists = [
  { rank: 1, name: "ILLENIUM", minutes: 9400, star: true },
  { rank: 2, name: "Polyphia", minutes: 2534, star: true },
  { rank: 3, name: "Said The Sky", minutes: 1937 },
  { rank: 4, name: "Seven Lions", minutes: 868 },
  { rank: 5, name: "Excision", minutes: 680 },
  { rank: 6, name: "The Chainsmokers", minutes: 624 },
  { rank: 7, name: "Gryffin", minutes: 599 },
  { rank: 8, name: "Dabin", minutes: 562 },
  { rank: 9, name: "SLANDER", minutes: 560 },
  { rank: 10, name: "Good Charlotte", minutes: 556 },
  { rank: 11, name: "New Found Glory", minutes: 555 },
  { rank: 12, name: "Yellowcard", minutes: 553 },
  { rank: 13, name: "The All-American Rejects", minutes: 542 },
  { rank: 14, name: "T.I.", minutes: 468 },
  { rank: 15, name: "Simple Plan", minutes: 468 },
  { rank: 16, name: "Wooli", minutes: 442 },
  { rank: 17, name: "Trivecta", minutes: 437 },
  { rank: 18, name: "Angels & Airwaves", minutes: 411 },
  { rank: 19, name: "William Black", minutes: 391 },
  { rank: 20, name: "NURKO", minutes: 377 },
];

const songs = [
  { rank: 1, title: "Blame Myself", artist: "ILLENIUM", feat: "Chandler Leighton" },
  { rank: 2, title: "All That Really Matters", artist: "ILLENIUM" },
  { rank: 3, title: "Nightlight", artist: "ILLENIUM" },
  { rank: 4, title: "Ego Death", artist: "Polyphia", feat: "Steve Vai" },
  { rank: 5, title: "Shivering", artist: "ILLENIUM", feat: "Spiritbox" },
  { rank: 6, title: "Wouldn't Change a Thing", artist: "ILLENIUM" },
  { rank: 7, title: "Nothing Ever After", artist: "Polyphia" },
  { rank: 8, title: "Every Rose", artist: "Said The Sky", feat: "Shallows" },
  { rank: 9, title: "Luv Me a Little", artist: "ILLENIUM", feat: "Nina Nesbitt" },
  { rank: 10, title: "Shout", artist: "Polyphia" },
  { rank: 11, title: "Other Side", artist: "ILLENIUM" },
  { rank: 12, title: "Diver Side B", artist: "Polyphia" },
  { rank: 13, title: "Last Like a Lifetime", artist: "ILLENIUM" },
  { rank: 14, title: "Crashing", artist: "ILLENIUM", feat: "Bahari" },
  { rank: 15, title: "Paper Thin", artist: "ILLENIUM" },
  { rank: 16, title: "Good Things Fall Apart", artist: "ILLENIUM", feat: "Jon Bellion" },
  { rank: 17, title: "It's All on U", artist: "ILLENIUM", feat: "Liam O'Donnell" },
  { rank: 18, title: "And You", artist: "Said The Sky" },
  { rank: 19, title: "These Are Not My Pants (The Rock Classic)", artist: "Polyphia" },
  { rank: 20, title: "Lie Down", artist: "Said The Sky" },
  { rank: 21, title: "Sideways", artist: "ILLENIUM", feat: "Nevve" },
  { rank: 22, title: "Silhouette", artist: "ILLENIUM" },
  { rank: 23, title: "Beautiful Creatures", artist: "ILLENIUM", feat: "MAX" },
  { rank: 24, title: "My Way Right", artist: "Said The Sky" },
  { rank: 25, title: "Playing God", artist: "Polyphia" },
  { rank: 26, title: "Stupid", artist: "Said The Sky" },
  { rank: 27, title: "Sound of Walking Away", artist: "ILLENIUM" },
  { rank: 28, title: "Rest of My Life", artist: "ILLENIUM", feat: "Usher & David Guetta" },
  { rank: 29, title: "Phone Down", artist: "Said The Sky", feat: "Emily Warren" },
  { rank: 30, title: "Free Fall", artist: "ILLENIUM", feat: "RUNN" },
  { rank: 31, title: "Meant to Be", artist: "Said The Sky" },
  { rank: 32, title: "Wherever U Go", artist: "ILLENIUM" },
  { rank: 33, title: "Only God Knows", artist: "ILLENIUM", feat: "Young Thug" },
  { rank: 34, title: "Ghost in the Machine", artist: "Said The Sky" },
  { rank: 35, title: "Don't Let Me Down", artist: "ILLENIUM", feat: "Shallows" },
  { rank: 36, title: "Gold (Short Loved)", artist: "ILLENIUM", feat: "Shallows" },
  { rank: 37, title: "The Sound of Silence", artist: "Said The Sky" },
  { rank: 38, title: "Great Outta Love", artist: "Said The Sky", feat: "Annika Wells" },
  { rank: 39, title: "Tattoo", artist: "Said The Sky", feat: "Lannon Canton" },
  { rank: 40, title: "On a Beat", artist: "Said The Sky", feat: "T-Pain" },
  { rank: 41, title: "Angel (Lovely Prelude)", artist: "Said The Sky" },
  { rank: 42, title: "All Night", artist: "Said The Sky" },
  { rank: 43, title: "Marry Me", artist: "Said The Sky" },
  { rank: 44, title: "Hurts Like This", artist: "Said The Sky" },
  { rank: 45, title: "Hurts", artist: "Said The Sky" },
  { rank: 46, title: "I Have You / I Had", artist: "Said The Sky" },
  { rank: 47, title: "Shout", artist: "Said The Sky" },
  { rank: 48, title: "Blame Myself (Virtual Riot Remix)", artist: "ILLENIUM" },
  { rank: 49, title: "Honestly", artist: "Said The Sky" },
  { rank: 50, title: "It's So Hard to Say Goodbye to Yesterday", artist: "ILLENIUM" },
  { rank: 51, title: "Holy Grail", artist: "ILLENIUM", feat: "Justin Timberlake" },
  { rank: 52, title: "Let You Let Me Fall", artist: "Said The Sky" },
  { rank: 53, title: "Fix You (Boyce Remix)", artist: "Said The Sky" },
  { rank: 54, title: "Break the Chain", artist: "ILLENIUM", feat: "Eric Turner" },
  { rank: 55, title: "Endless", artist: "ILLENIUM" },
  { rank: 56, title: "Fractures", artist: "ILLENIUM", feat: "Nevve" },
  { rank: 57, title: "Paralyzed", artist: "ILLENIUM" },
  { rank: 58, title: "No Name", artist: "Said The Sky" },
  { rank: 59, title: "Pray", artist: "ILLENIUM", feat: "Kameron Alexander" },
  { rank: 60, title: "Pray", artist: "Said The Sky", feat: "Kameron Vocals" },
  { rank: 61, title: "He Talks!", artist: "ILLENIUM", feat: "Adam Birdman" },
  { rank: 62, title: "Chakra", artist: "ILLENIUM", feat: "Lil Mosey" },
  { rank: 63, title: "Some", artist: "Said The Sky" },
  { rank: 64, title: "ABC", artist: "Polyphia", feat: "Sophia Black" },
  { rank: 65, title: "Good Things Fall Apart (Sad Songs Remix)", artist: "ILLENIUM" },
  { rank: 66, title: "Weekend! Cherry Woody", artist: "Polyphia" },
  { rank: 67, title: "Moving Mountains", artist: "ILLENIUM" },
  { rank: 68, title: "Zombie", artist: "Said The Sky", feat: "Valerie Broussard" },
  { rank: 69, title: "Nerdy", artist: "Polyphia", feat: "Jason Richardson" },
  { rank: 70, title: "Culture Shock", artist: "Polyphia" },
  { rank: 71, title: "The Young & the Hopeless", artist: "Good Charlotte" },
  { rank: 72, title: "G.O.A.T.", artist: "Polyphia" },
  { rank: 73, title: "First Flight Home", artist: "Said The Sky" },
  { rank: 74, title: "Brave Soul", artist: "ILLENIUM" },
  { rank: 75, title: "Memories Be That Song", artist: "Said The Sky" },
  { rank: 76, title: "My Fits Legit", artist: "Polyphia" },
  { rank: 77, title: "Urban Friday", artist: "Said The Sky" },
  { rank: 78, title: "You Can Get High", artist: "ILLENIUM" },
  { rank: 79, title: "Superhero", artist: "ILLENIUM" },
  { rank: 80, title: "Guerrilla Dude", artist: "Polyphia" },
  { rank: 81, title: "Death Note", artist: "Said The Sky" },
  { rank: 82, title: "Santa's Beat", artist: "Said The Sky", feat: "Sound Remedy & Sara Skinner" },
  { rank: 83, title: "Salt Tired (Two Kids / Panic)", artist: "ILLENIUM" },
  { rank: 84, title: "It's Weird", artist: "Said The Sky" },
];

const albums = [
  { rank: 1, title: "ILLENIUM: Trilogy in Los Angeles", artist: "ILLENIUM", minutes: 1673 },
  { rank: 2, title: "ILLENIUM", artist: "ILLENIUM", minutes: 738 },
  { rank: 3, title: "Sentiment (The Remixes)", artist: "Said The Sky", minutes: 656 },
  { rank: 4, title: "Fallen Embers (Deluxe)", artist: "ILLENIUM", minutes: 597 },
  { rank: 5, title: "Ascend", artist: "ILLENIUM", minutes: 241 },
  { rank: 6, title: "Find My Way (Deluxe)", artist: "Trivecta", minutes: 200 },
  { rank: 7, title: "Ashes", artist: "ILLENIUM", minutes: 146 },
  { rank: 8, title: "Sentiment", artist: "Said The Sky", minutes: 131 },
  { rank: 9, title: "NYE 2022 (DJ Mix)", artist: "ILLENIUM", minutes: 120 },
  { rank: 10, title: "Covers (Vol. 2)", artist: "Tommee Profitt", minutes: 109 },
  { rank: 11, title: "Ashes to Ashes 004 (DJ Mix)", artist: "ILLENIUM", minutes: 101 },
  { rank: 12, title: "Cinematic Songs (Vol. 7)", artist: "Tommee Profitt", minutes: 98 },
  { rank: 13, title: "The Life of a Showgirl", artist: "Taylor Swift", minutes: 97 },
  { rank: 14, title: "PULSE", artist: "Gryffin", minutes: 90 },
  { rank: 15, title: "ILLENIUM at EDC Las Vegas", artist: "ILLENIUM", minutes: 75 },
];

const playlists = [
  { rank: 1, name: "The Daily Grind", creator: "David Kitchens", minutes: 6719, star: true },
  { rank: 2, name: "Sk8r Core", creator: "David Kitchens", minutes: 3568, star: true },
  { rank: 3, name: "Illenium", creator: "David Kitchens", minutes: 2838 },
  { rank: 4, name: "Replay All Time", creator: "Apple Music for David", minutes: 1230 },
  { rank: 5, name: "Wired Serenity", creator: "David Kitchens", minutes: 689 },
  { rank: 6, name: "Polyphia", creator: "David Kitchens", minutes: 536 },
];

const stations = [
  { rank: 1, name: "David Kitchens' Station", minutes: 15750 },
  { rank: 2, name: "ILLENIUM & Similar Artists", minutes: 2070 },
  { rank: 3, name: "Polyphia", minutes: 1181 },
  { rank: 4, name: "3 Are Legend & Similar Artists", minutes: 415 },
  { rank: 5, name: "Feel Good", minutes: 266 },
  { rank: 6, name: "TELYKAST", minutes: 114 },
  { rank: 7, name: "Skrillex & Similar Artists", minutes: 58 },
  { rank: 8, name: "Dr Phunk & Similar Artists", minutes: 37 },
  { rank: 9, name: "Ego Death (feat. Steve Vai)", minutes: 17 },
  { rank: 10, name: "Luv Me A Little (LINEAGE Remix)", minutes: 15 },
  { rank: 11, name: "Coming 2 America Station", minutes: 11 },
];

// ═══════════════════════════════════════════════════════════
// Computed Metrics
// ═══════════════════════════════════════════════════════════
const totalArtistMinutes = artists.reduce((s, a) => s + a.minutes, 0);
const totalAlbumMinutes = albums.reduce((s, a) => s + a.minutes, 0);
const totalPlaylistMinutes = playlists.reduce((s, p) => s + p.minutes, 0);
const totalStationMinutes = stations.reduce((s, s2) => s + s2.minutes, 0);
const illeniumPct = ((artists[0].minutes / totalArtistMinutes) * 100).toFixed(1);

// Genre tagging
const genreMap = {
  "Melodic Bass / EDM": ["ILLENIUM", "Said The Sky", "Seven Lions", "Excision", "Gryffin", "Dabin", "SLANDER", "Wooli", "Trivecta", "William Black", "NURKO", "The Chainsmokers"],
  "Pop-Punk / Emo Revival": ["Good Charlotte", "New Found Glory", "Yellowcard", "The All-American Rejects", "Simple Plan", "Angels & Airwaves"],
  "Progressive / Math Rock": ["Polyphia"],
  "Hip-Hop": ["T.I."],
};

const genreBreakdown = Object.entries(genreMap).map(([genre, artistNames]) => {
  const mins = artists.filter(a => artistNames.includes(a.name)).reduce((s, a) => s + a.minutes, 0);
  return { genre, artists: artistNames.length, minutes: mins, pct: ((mins / totalArtistMinutes) * 100).toFixed(1) };
}).sort((a, b) => b.minutes - a.minutes);

// Song artist distribution
const songArtistCounts = {};
songs.forEach(s => {
  songArtistCounts[s.artist] = (songArtistCounts[s.artist] || 0) + 1;
});
const songArtistBreakdown = Object.entries(songArtistCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

// Album artist distribution
const albumArtistCounts = {};
albums.forEach(a => {
  albumArtistCounts[a.artist] = (albumArtistCounts[a.artist] || 0) + 1;
});

// ═══════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════

function KPICard({ label, value, sub, color = C.amber, wide = false }) {
  return (
    <div style={{
      flex: wide ? "1 1 200px" : "1 1 150px",
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 7,
      padding: "18px 16px 14px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: color, opacity: 0.6,
      }} />
      <div style={{
        fontFamily: font.mono, fontSize: 9, color: C.creamDim,
        letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: font.mono, fontSize: 28, fontWeight: 700, color: C.cream,
        lineHeight: 1, marginBottom: 4,
      }}>{value}</div>
      {sub && (
        <div style={{
          fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic",
        }}>{sub}</div>
      )}
    </div>
  );
}

function SectionHeader({ label, icon, color = C.crimson }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: 40 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 5,
        background: color + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14,
      }}>{icon}</div>
      <span style={{
        fontFamily: font.mono, fontSize: 11, letterSpacing: "0.15em",
        color: C.creamMid, textTransform: "uppercase",
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function ArtistBar({ artist, maxMinutes }) {
  const pct = (artist.minutes / maxMinutes) * 100;
  const isEdm = genreMap["Melodic Bass / EDM"]?.includes(artist.name);
  const isPunk = genreMap["Pop-Punk / Emo Revival"]?.includes(artist.name);
  const isMath = genreMap["Progressive / Math Rock"]?.includes(artist.name);
  const isHH = genreMap["Hip-Hop"]?.includes(artist.name);
  const barColor = isPunk ? C.rose : isMath ? C.violet : isHH ? C.ember : C.crimson;
  const tagColor = isPunk ? C.rose : isMath ? C.violet : isHH ? C.ember : C.crimson;
  const tagLabel = isPunk ? "POP-PUNK" : isMath ? "MATH ROCK" : isHH ? "HIP-HOP" : "MELODIC BASS";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
    }}>
      <div style={{
        fontFamily: font.mono, fontSize: 10, color: C.creamDim,
        width: 22, textAlign: "right", flexShrink: 0,
      }}>{artist.rank}</div>
      <div style={{
        fontFamily: font.display, fontSize: 13, fontWeight: 600,
        color: artist.rank <= 3 ? C.cream : C.creamHigh,
        width: 180, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>
        {artist.name}
        {artist.star && <span style={{ color: C.crimson, marginLeft: 4, fontSize: 10 }}>★</span>}
      </div>
      <div style={{ flex: 1, position: "relative", height: 20, background: C.creamGhost, borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${pct}%`, background: barColor,
          opacity: artist.rank <= 3 ? 0.7 : 0.4,
          borderRadius: 3,
          transition: "width 0.6s ease",
        }} />
        <div style={{
          position: "absolute", left: 8, top: 0, bottom: 0,
          display: "flex", alignItems: "center",
          fontFamily: font.mono, fontSize: 9, color: C.cream, fontWeight: 600,
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}>
          {artist.minutes.toLocaleString()} min
        </div>
      </div>
      <span style={{
        fontFamily: font.mono, fontSize: 7, padding: "2px 5px",
        borderRadius: 2, background: tagColor + "18", color: tagColor,
        letterSpacing: "0.06em", flexShrink: 0, whiteSpace: "nowrap",
      }}>{tagLabel}</span>
    </div>
  );
}

function SongRow({ song, expanded }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "5px 10px",
      background: song.rank % 2 === 0 ? "transparent" : C.creamGhost,
      borderRadius: 3,
    }}>
      <span style={{
        fontFamily: font.mono, fontSize: 9, color: C.creamDim,
        width: 22, textAlign: "right", flexShrink: 0,
      }}>{song.rank}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: font.display, fontSize: 12, fontWeight: 500, color: C.creamHigh,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {song.title}
          {song.feat && <span style={{ color: C.creamDim, fontWeight: 400 }}> ft. {song.feat}</span>}
        </div>
      </div>
      <span style={{
        fontFamily: font.mono, fontSize: 9,
        padding: "1px 5px", borderRadius: 2,
        background: song.artist === "ILLENIUM" ? C.crimsonFaint : song.artist === "Polyphia" ? C.violetDim : song.artist === "Said The Sky" ? C.blueDim : C.creamGhost,
        color: song.artist === "ILLENIUM" ? C.crimson : song.artist === "Polyphia" ? C.violet : song.artist === "Said The Sky" ? C.blue : C.creamDim,
        flexShrink: 0, whiteSpace: "nowrap",
      }}>{song.artist}</span>
    </div>
  );
}

function AlbumCard({ album }) {
  const isIllenium = album.artist === "ILLENIUM";
  const accentColor = isIllenium ? C.crimson : album.artist === "Said The Sky" ? C.blue : album.artist === "Trivecta" ? C.green : album.artist === "Tommee Profitt" ? C.ember : album.artist === "Gryffin" ? C.amber : album.artist === "Taylor Swift" ? C.rose : C.creamDim;

  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
      padding: "14px 14px 12px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, width: 3, bottom: 0,
        background: accentColor, opacity: 0.5,
      }} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
        <span style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: accentColor, opacity: 0.4 }}>
          {String(album.rank).padStart(2, "0")}
        </span>
      </div>
      <div style={{
        fontFamily: font.display, fontSize: 12, fontWeight: 600, color: C.cream,
        lineHeight: 1.3, marginBottom: 4,
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{album.title}</div>
      <div style={{
        fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic", marginBottom: 6,
      }}>{album.artist}</div>
      <div style={{
        fontFamily: font.mono, fontSize: 11, color: accentColor, fontWeight: 600,
      }}>{album.minutes.toLocaleString()} <span style={{ color: C.creamDim, fontWeight: 400, fontSize: 9 }}>min</span></div>
    </div>
  );
}

function GenreBlock({ genre, color }) {
  const barPct = (genre.minutes / totalArtistMinutes) * 100;
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
      padding: "16px 18px", flex: "1 1 200px",
    }}>
      <div style={{
        fontFamily: font.mono, fontSize: 9, letterSpacing: "0.12em",
        textTransform: "uppercase", color, marginBottom: 8,
      }}>{genre.genre}</div>
      <div style={{
        fontFamily: font.mono, fontSize: 22, fontWeight: 700, color: C.cream, lineHeight: 1,
      }}>{genre.pct}%</div>
      <div style={{
        height: 4, background: C.creamGhost, borderRadius: 2, marginTop: 8, overflow: "hidden",
      }}>
        <div style={{ height: "100%", width: `${barPct}%`, background: color, borderRadius: 2 }} />
      </div>
      <div style={{
        fontFamily: font.body, fontSize: 11, color: C.creamDim, marginTop: 6,
      }}>{genre.artists} artists · {genre.minutes.toLocaleString()} min</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Nav Tabs
// ═══════════════════════════════════════════════════════════
const sections = [
  { id: "overview", label: "Overview" },
  { id: "artists", label: "Artists" },
  { id: "songs", label: "Songs" },
  { id: "albums", label: "Albums" },
  { id: "playlists", label: "Playlists & Stations" },
];

// ═══════════════════════════════════════════════════════════
// Main App
// ═══════════════════════════════════════════════════════════
export default function AppleMusicReplay() {
  const [activeSection, setActiveSection] = useState("overview");
  const [songsExpanded, setSongsExpanded] = useState(false);
  const [albumsExpanded, setAlbumsExpanded] = useState(false);
  const songsToShow = songsExpanded ? songs : songs.slice(0, 25);
  const albumsToShow = albumsExpanded ? albums : albums.slice(0, 8);

  return (
    <div style={{
      minHeight: "100vh",
      background: C.navy,
      color: C.cream,
      padding: "0 0 48px",
    }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');`}</style>

      {/* Hero Header */}
      <div style={{
        padding: "40px 24px 32px",
        background: `linear-gradient(180deg, ${C.crimson}12 0%, transparent 100%)`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, color: C.crimson,
            letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10,
          }}>DDL · CONSOLE · REPLAY 2025</div>

          <h1 style={{
            fontFamily: font.display, fontSize: 32, fontWeight: 700,
            color: C.cream, lineHeight: 1.15, marginBottom: 6,
          }}>Apple Music Replay</h1>

          <p style={{
            fontFamily: font.body, fontSize: 15, color: C.creamMid,
            lineHeight: 1.6, maxWidth: 560, fontStyle: "italic",
          }}>
            One year of signal. 20 ranked artists. 84 tracked songs. 15 albums. 
            The data beneath the listening.
          </p>

          <div style={{
            display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap",
          }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
              Platform <span style={{ color: C.cream }}>Apple Music</span>
            </span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
              Period <span style={{ color: C.cream }}>2025</span>
            </span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
              Source <span style={{ color: C.cream }}>Replay Year-End Wrap</span>
            </span>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>
              Account <span style={{ color: C.cream }}>David Kitchens</span>
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>

        {/* Section Nav */}
        <div style={{
          display: "flex", gap: 2, marginTop: 24, marginBottom: 28,
          borderBottom: `1px solid ${C.border}`, paddingBottom: 0,
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: "10px 16px",
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${activeSection === s.id ? C.crimson : "transparent"}`,
                cursor: "pointer",
                fontFamily: font.mono,
                fontSize: 11,
                letterSpacing: "0.06em",
                color: activeSection === s.id ? C.cream : C.creamDim,
                transition: "all 0.15s",
              }}
            >{s.label}</button>
          ))}
        </div>

        {/* ─── OVERVIEW TAB ─── */}
        {activeSection === "overview" && (
          <div>
            {/* KPI Row */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <KPICard label="Top Artist Minutes" value="9,400" sub="ILLENIUM — 156.7 hrs" color={C.crimson} />
              <KPICard label="Top 20 Total" value={totalArtistMinutes.toLocaleString()} sub={`${(totalArtistMinutes / 60).toFixed(0)} hours tracked`} color={C.amber} />
              <KPICard label="Songs Tracked" value="84" sub="3 artists hold 90%+" color={C.blue} />
              <KPICard label="Personal Station" value="15,750" sub="262.5 hrs — David Kitchens'" color={C.violet} />
            </div>

            {/* Genre Signal */}
            <SectionHeader label="Genre Signal Distribution" icon="🎛️" color={C.amber} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {genreBreakdown.map((g, i) => {
                const colors = [C.crimson, C.rose, C.violet, C.ember];
                return <GenreBlock key={g.genre} genre={g} color={colors[i] || C.creamDim} />;
              })}
            </div>

            {/* Dominance Insight */}
            <div style={{
              marginTop: 24, padding: "16px 20px",
              background: C.crimsonFaint, border: `1px solid ${C.crimson}30`,
              borderRadius: 7, borderLeft: `3px solid ${C.crimson}`,
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 9, color: C.crimson,
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6,
              }}>Signal Insight</div>
              <p style={{
                fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.7,
              }}>
                ILLENIUM commands <strong style={{ color: C.cream }}>{illeniumPct}%</strong> of all ranked artist minutes — a 
                <strong style={{ color: C.cream }}> 3.7× lead</strong> over #2 Polyphia. Eight of the top 15 albums are ILLENIUM projects. 
                The pop-punk nostalgia cluster (Good Charlotte through Simple Plan) sits in a remarkably tight 
                <strong style={{ color: C.cream }}> 542–556 minute band</strong>, suggesting playlist-driven rotation rather than deep catalog dives. 
                Said The Sky dominates the mid-song rankings with 26 of 84 tracked songs.
              </p>
            </div>

            {/* Quick Hits */}
            <SectionHeader label="Quick Hits" icon="⚡" color={C.green} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
              {[
                { label: "#1 Song", value: "Blame Myself", sub: "ILLENIUM ft. Chandler Leighton", color: C.crimson },
                { label: "#1 Album", value: "Trilogy in LA", sub: "ILLENIUM · 1,673 min", color: C.crimson },
                { label: "#1 Playlist", value: "The Daily Grind", sub: "David Kitchens · 6,719 min", color: C.amber },
                { label: "Pop-Punk Block", value: "5 artists", sub: "542–556 min band", color: C.rose },
                { label: "Playlist Hours", value: (totalPlaylistMinutes / 60).toFixed(0), sub: "across 6 playlists", color: C.green },
                { label: "Station Hours", value: (totalStationMinutes / 60).toFixed(0), sub: "across 11 stations", color: C.violet },
              ].map((h, i) => (
                <div key={i} style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
                  padding: "14px 16px",
                }}>
                  <div style={{
                    fontFamily: font.mono, fontSize: 8, color: h.color,
                    letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6,
                  }}>{h.label}</div>
                  <div style={{
                    fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream, lineHeight: 1.2,
                  }}>{h.value}</div>
                  <div style={{
                    fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic", marginTop: 3,
                  }}>{h.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── ARTISTS TAB ─── */}
        {activeSection === "artists" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              <KPICard label="Artists Ranked" value="20" sub="Top 20 by minutes" color={C.crimson} />
              <KPICard label="#1 ILLENIUM" value="9,400" sub="156.7 hours" color={C.crimson} />
              <KPICard label="#2 Polyphia" value="2,534" sub="42.2 hours" color={C.violet} />
              <KPICard label="Total Minutes" value={totalArtistMinutes.toLocaleString()} sub={`${(totalArtistMinutes / 60).toFixed(0)} hours`} color={C.amber} />
            </div>

            <SectionHeader label="Artist Rankings — Full 20" icon="🏆" color={C.crimson} />
            <div style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
              padding: "16px 14px",
            }}>
              {/* Legend */}
              <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                {[
                  { label: "Melodic Bass", color: C.crimson },
                  { label: "Pop-Punk", color: C.rose },
                  { label: "Math Rock", color: C.violet },
                  { label: "Hip-Hop", color: C.ember },
                ].map(l => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color, opacity: 0.6 }} />
                    <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>{l.label}</span>
                  </div>
                ))}
              </div>
              {artists.map(a => (
                <ArtistBar key={a.rank} artist={a} maxMinutes={artists[0].minutes} />
              ))}
            </div>

            {/* Pop-Punk Cluster Callout */}
            <div style={{
              marginTop: 20, padding: "14px 18px",
              background: C.roseDim, border: `1px solid ${C.rose}30`,
              borderRadius: 7, borderLeft: `3px solid ${C.rose}`,
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 9, color: C.rose,
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6,
              }}>Pop-Punk Nostalgia Cluster</div>
              <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.6 }}>
                Five artists — Good Charlotte, New Found Glory, Yellowcard, The All-American Rejects, and Simple Plan — all 
                land between 542 and 556 minutes. A 14-minute spread across five artists suggests playlist-driven rotation 
                (likely the "Sk8r Core" playlist at 3,568 min) rather than individual deep dives. 
                Angels & Airwaves sits just below at 411 minutes as the sixth member of this cohort.
              </p>
            </div>
          </div>
        )}

        {/* ─── SONGS TAB ─── */}
        {activeSection === "songs" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              <KPICard label="Songs Tracked" value="84" sub="From Replay top songs" color={C.blue} />
              <KPICard label="ILLENIUM Songs" value={songArtistCounts["ILLENIUM"] || 0} sub={`${(((songArtistCounts["ILLENIUM"] || 0) / songs.length) * 100).toFixed(0)}% of all tracks`} color={C.crimson} />
              <KPICard label="Said The Sky" value={songArtistCounts["Said The Sky"] || 0} sub="Second most represented" color={C.blue} />
              <KPICard label="Polyphia" value={songArtistCounts["Polyphia"] || 0} sub="Third most represented" color={C.violet} />
            </div>

            {/* Artist distribution */}
            <SectionHeader label="Song Ownership — Artist Distribution" icon="📊" color={C.blue} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {songArtistBreakdown.map(([artist, count]) => {
                const color = artist === "ILLENIUM" ? C.crimson : artist === "Polyphia" ? C.violet : artist === "Said The Sky" ? C.blue : artist === "Good Charlotte" ? C.rose : C.creamDim;
                const pct = ((count / songs.length) * 100).toFixed(0);
                return (
                  <div key={artist} style={{
                    flex: "1 1 120px", background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 7, padding: "14px 14px 10px", textAlign: "center",
                  }}>
                    <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color }}>{count}</div>
                    <div style={{ fontFamily: font.display, fontSize: 11, fontWeight: 600, color: C.cream, marginTop: 2 }}>{artist}</div>
                    <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, marginTop: 2 }}>{pct}% of tracks</div>
                  </div>
                );
              })}
            </div>

            <SectionHeader label={`Full Song Rankings — ${songsToShow.length} of ${songs.length}`} icon="🎵" color={C.crimson} />
            <div style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
              padding: "10px 6px", maxHeight: songsExpanded ? "none" : 700, overflow: songsExpanded ? "visible" : "hidden",
              position: "relative",
            }}>
              {/* Column headers */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "4px 10px 8px",
                borderBottom: `1px solid ${C.border}`, marginBottom: 4,
              }}>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, width: 22, textAlign: "right", letterSpacing: "0.1em" }}>#</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, flex: 1, letterSpacing: "0.1em" }}>TITLE</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: "0.1em" }}>ARTIST</span>
              </div>
              {songsToShow.map(s => (
                <SongRow key={s.rank} song={s} />
              ))}
              {!songsExpanded && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                  background: `linear-gradient(transparent, ${C.card})`,
                  display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 12,
                }}>
                </div>
              )}
            </div>
            <button
              onClick={() => setSongsExpanded(!songsExpanded)}
              style={{
                display: "block", margin: "12px auto 0", padding: "8px 24px",
                background: C.crimsonDim, border: `1px solid ${C.crimson}40`,
                borderRadius: 5, cursor: "pointer",
                fontFamily: font.mono, fontSize: 11, color: C.crimson,
                letterSpacing: "0.06em",
              }}
            >
              {songsExpanded ? "Collapse" : `Show all ${songs.length} songs`}
            </button>

            {/* Extraction note */}
            <div style={{
              marginTop: 16, padding: "10px 14px",
              background: C.creamGhost, border: `1px solid ${C.border}`,
              borderRadius: 5,
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 9, color: C.creamDim,
                lineHeight: 1.6,
              }}>
                ⓘ Extracted from Apple Music Replay scrolled screenshot. Songs 1–50 are high-confidence reads. 
                Songs 51–84 were extracted from compressed image data — some titles may contain minor transcription artifacts. 
                Play counts were not consistently visible at extraction resolution.
              </div>
            </div>
          </div>
        )}

        {/* ─── ALBUMS TAB ─── */}
        {activeSection === "albums" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              <KPICard label="Albums Ranked" value="15" sub="By total minutes played" color={C.amber} />
              <KPICard label="ILLENIUM Albums" value={albumArtistCounts["ILLENIUM"] || 0} sub={`of 15 · ${(((albumArtistCounts["ILLENIUM"] || 0) / albums.length) * 100).toFixed(0)}%`} color={C.crimson} />
              <KPICard label="Total Album Minutes" value={totalAlbumMinutes.toLocaleString()} sub={`${(totalAlbumMinutes / 60).toFixed(0)} hours`} color={C.amber} />
              <KPICard label="#1 Album" value="1,673" sub="Trilogy in Los Angeles" color={C.crimson} />
            </div>

            <SectionHeader label="Top Albums Grid" icon="💿" color={C.amber} />
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 10,
            }}>
              {albumsToShow.map(a => <AlbumCard key={a.rank} album={a} />)}
            </div>
            {!albumsExpanded && albums.length > 8 && (
              <button
                onClick={() => setAlbumsExpanded(true)}
                style={{
                  display: "block", margin: "16px auto 0", padding: "8px 24px",
                  background: C.amberDim, border: `1px solid ${C.amber}40`,
                  borderRadius: 5, cursor: "pointer",
                  fontFamily: font.mono, fontSize: 11, color: C.amber,
                  letterSpacing: "0.06em",
                }}
              >Show all {albums.length} albums</button>
            )}

            {/* Album artist breakdown */}
            <div style={{
              marginTop: 24, padding: "14px 18px",
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 9, color: C.creamDim,
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10,
              }}>Albums by Artist</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {Object.entries(albumArtistCounts).sort((a, b) => b[1] - a[1]).map(([artist, count]) => {
                  const color = artist === "ILLENIUM" ? C.crimson : artist === "Said The Sky" ? C.blue : artist === "Tommee Profitt" ? C.ember : C.creamDim;
                  return (
                    <div key={artist} style={{
                      padding: "8px 14px", background: color + "12", border: `1px solid ${color}30`,
                      borderRadius: 5, display: "flex", alignItems: "center", gap: 8,
                    }}>
                      <span style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color }}>{count}</span>
                      <span style={{ fontFamily: font.display, fontSize: 12, color: C.creamMid }}>{artist}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── PLAYLISTS & STATIONS TAB ─── */}
        {activeSection === "playlists" && (
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              <KPICard label="Total Playlist Min" value={totalPlaylistMinutes.toLocaleString()} sub={`${(totalPlaylistMinutes / 60).toFixed(0)} hours · 6 playlists`} color={C.amber} />
              <KPICard label="Total Station Min" value={totalStationMinutes.toLocaleString()} sub={`${(totalStationMinutes / 60).toFixed(0)} hours · 11 stations`} color={C.violet} />
              <KPICard label="#1 Playlist" value="6,719" sub="The Daily Grind" color={C.amber} />
              <KPICard label="#1 Station" value="15,750" sub="David Kitchens' Station" color={C.violet} />
            </div>

            {/* Playlists */}
            <SectionHeader label="Top Playlists" icon="📋" color={C.amber} />
            <div style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
              padding: "14px",
            }}>
              {playlists.map(p => {
                const pct = (p.minutes / playlists[0].minutes) * 100;
                return (
                  <div key={p.rank} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "8px 4px",
                    borderBottom: p.rank < playlists.length ? `1px solid ${C.border}` : "none",
                  }}>
                    <span style={{
                      fontFamily: font.mono, fontSize: 12, color: C.creamDim, width: 20, textAlign: "right",
                    }}>{p.rank}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{
                          fontFamily: font.display, fontSize: 14, fontWeight: 600, color: C.cream,
                        }}>{p.name}</span>
                        {p.star && <span style={{ color: C.crimson, fontSize: 10 }}>★</span>}
                      </div>
                      <div style={{
                        fontFamily: font.body, fontSize: 11, color: C.creamDim, fontStyle: "italic",
                      }}>{p.creator}</div>
                    </div>
                    <div style={{ width: 140, position: "relative" }}>
                      <div style={{
                        height: 6, background: C.creamGhost, borderRadius: 3, overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%", width: `${pct}%`, background: C.amber, borderRadius: 3, opacity: 0.6,
                        }} />
                      </div>
                    </div>
                    <span style={{
                      fontFamily: font.mono, fontSize: 11, color: C.amber, fontWeight: 600, width: 60, textAlign: "right",
                    }}>{p.minutes.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Stations */}
            <SectionHeader label="Top Stations" icon="📡" color={C.violet} />
            <div style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 7,
              padding: "14px",
            }}>
              {stations.map(s => {
                const pct = (s.minutes / stations[0].minutes) * 100;
                return (
                  <div key={s.rank} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "7px 4px",
                    borderBottom: s.rank < stations.length ? `1px solid ${C.border}` : "none",
                  }}>
                    <span style={{
                      fontFamily: font.mono, fontSize: 10, color: C.creamDim, width: 20, textAlign: "right",
                    }}>{s.rank}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        fontFamily: font.display, fontSize: 13, fontWeight: 500, color: C.creamHigh,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block",
                      }}>{s.name}</span>
                    </div>
                    <div style={{ width: 100, position: "relative" }}>
                      <div style={{
                        height: 5, background: C.creamGhost, borderRadius: 3, overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%", width: `${pct}%`, background: C.violet, borderRadius: 3, opacity: 0.5,
                        }} />
                      </div>
                    </div>
                    <span style={{
                      fontFamily: font.mono, fontSize: 10, color: C.violet, fontWeight: 600, width: 55, textAlign: "right",
                    }}>{s.minutes.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Listening Mode Insight */}
            <div style={{
              marginTop: 24, padding: "16px 20px",
              background: C.amberDim, border: `1px solid ${C.amber}30`,
              borderRadius: 7, borderLeft: `3px solid ${C.amber}`,
            }}>
              <div style={{
                fontFamily: font.mono, fontSize: 9, color: C.amber,
                letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6,
              }}>Listening Mode Analysis</div>
              <p style={{
                fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.7,
              }}>
                Personal station dominates at <strong style={{ color: C.cream }}>15,750 minutes</strong> (262.5 hours) — more than 
                all other stations combined. Custom playlists account for <strong style={{ color: C.cream }}>{totalPlaylistMinutes.toLocaleString()} minutes</strong> across 
                6 playlists, with "The Daily Grind" alone pulling 6,719 minutes. The listening is heavily 
                curated — Dave builds the playlists, the algorithm fills the gaps via personal station.
              </p>
            </div>
          </div>
        )}

        {/* ═══ Footer ═══ */}
        <div style={{ marginTop: 48 }}>
          <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${C.crimson}, ${C.amber}, ${C.blue}, ${C.violet}, ${C.rose})`,
            borderRadius: 1, marginBottom: 14,
          }} />
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
          }}>
            <div style={{
              fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: "0.08em",
            }}>
              Dropdown Logistics · Cottage — Humble surface. Cathedral underneath.
            </div>
            <div style={{
              fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: "0.06em",
            }}>
              dropdownlogistics.com · 2025
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

