// Line-art identity glyph for each division. Same stroke language across all
// three (1.5px, round joins, currentColor) so they read as one family — only
// the motif differs:
//   greens — furrows in perspective with a ripening grain stalk
//   infra  — a braced structural portal on a foundation line
//   tech   — a window with a plotted signal and nodes
// Decorative: inherits colour from a `text-*` class on the parent, aria-hidden.

const MOTIFS = {
  'kvi-greens': (
    <>
      <path d="M4 38c10-5 30-5 40 0" />
      <path d="M7 31c9-4 25-4 34 0" />
      <path d="M24 38V12" />
      <path d="M24 16c-3-1-5-3-5-6 3 1 5 3 5 6Z" />
      <path d="M24 22c-3-1-5-3-5-6 3 1 5 3 5 6Z" />
      <path d="M24 19c3-1 5-3 5-6-3 1-5 3-5 6Z" />
      <path d="M24 25c3-1 5-3 5-6-3 1-5 3-5 6Z" />
    </>
  ),
  'kv-infra': (
    <>
      <path d="M6 40h36" />
      <path d="M11 40V15l13-7 13 7v25" />
      <path d="M11 15h26" />
      <path d="M24 8v32" />
      <path d="M11 40 24 24l13 16" />
    </>
  ),
  'kvi-tech': (
    <>
      <rect x="6" y="9" width="36" height="30" rx="2" />
      <path d="M6 17h36" />
      <path d="M10 13h.01M14 13h.01M18 13h.01" />
      <path d="M12 31l7-8 6 5 10-12" />
      <circle cx="12" cy="31" r="1.6" />
      <circle cx="19" cy="23" r="1.6" />
      <circle cx="25" cy="28" r="1.6" />
      <circle cx="35" cy="16" r="1.6" />
    </>
  ),
}

export default function BusinessGlyph({ id, size = 48, className = '' }) {
  const motif = MOTIFS[id]
  if (!motif) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {motif}
    </svg>
  )
}
