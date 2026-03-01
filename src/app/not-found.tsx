import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" aria-label="Not found">
      <section className="section">
        <h1 className="h1">Page not found</h1>
        <p className="lede">
          The route you requested doesn’t exist. Use the navigation or return home.
        </p>
        <div className="ctaRow btnGroupTight">
          <Link className="btn btnPrimary" href="/">
            Home
          </Link>
          <Link className="btn" href="/projects">
            Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
