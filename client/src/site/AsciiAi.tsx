const glyphs = [
  "      .##.       .#####",
  "     .####.      >#####",
  "     ##..##        ##",
  "    .##  ##.       ##",
  "    ##.  .##       ##",
  "   .##    ##.      ##",
  "   ##########      ##",
  "  .###....###.     ##",
  "  ##.      .##     ##",
  " .##        ##.  <#####",
  " ##.        .##  .#####",
];

const sweep = glyphs.map((row, index) =>
  [...row].map((glyph, column) =>
    glyph === "#" && (index + column) % 3 === 0 ? ">" : glyph
  ).join("")
).join("\n");

export default function AsciiAi() {
  return (
    <span className="s-ascii-ai">
      <span className="s-ascii-label">AI</span>
      <span
        className="s-ascii-art"
        aria-hidden="true"
        data-glyphs={glyphs.join("\n")}
        data-sweep={sweep}
      />
    </span>
  );
}
