export function ScribbleAccent({
  kind = "underline",
}: {
  kind?: "underline" | "circle" | "loop";
}) {
  const paths = {
    underline:
      "M4 23C55 17 103 26 156 18S237 21 293 15M12 29C92 23 170 28 278 22",
    circle:
      "M281 22C209-2 89 0 28 17C-22 35 5 70 118 77C255 88 318 53 282 21C259 1 193 5 162 9",
    loop: "M5 60C51 13 100 69 67 90C36 112 17 37 86 26C155 12 179 78 223 48C257 27 222 9 198 31C162 65 257 82 296 53",
  };
  return (
    <svg
      className={`scribble-accent scribble-${kind}`}
      viewBox={kind === "underline" ? "0 0 300 40" : "0 0 300 100"}
      fill="none"
      aria-hidden="true"
    >
      <path d={paths[kind]} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
