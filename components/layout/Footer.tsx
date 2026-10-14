import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="wordmark">
        Anuj.
      </Link>
      <span>Made with a little attention.</span>
      <a href="https://github.com/AnujR17">GitHub ↗</a>
      <a href="#main">Back to top ↑</a>
    </footer>
  );
}
