
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <nav
        style={{
          background: "white",
          padding: "20px 8%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 2px 10px #00000010",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            color: "#4f46e5",
          }}
        >
          📚 BookNook
        </Link>

        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/" style={{ color: "#334155" }}>
            Home
          </Link>
          <Link href="/books" style={{ color: "#334155" }}>
            All Books
          </Link>
          <Link href="/login" style={{ color: "#334155" }}>
            Login
          </Link>
        </div>
      </nav>

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "120px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: "bold",
            color: "#0f172a",
            lineHeight: 1.2,
          }}
        >
          Welcome to BookNook
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#64748b",
            maxWidth: "600px",
            margin: "24px auto 36px",
            lineHeight: 1.8,
          }}
        >
          Discover amazing books, explore new stories,
          and manage your personal reading journey.
        </p>

        <Link
          href="/books"
          style={{
            display: "inline-block",
            background: "#4f46e5",
            color: "white",
            padding: "15px 32px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Explore Books
        </Link>
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#64748b",
          background: "white",
        }}
      >
        © 2026 BookNook. All rights reserved.
      </footer>
    </main>
  );
}
