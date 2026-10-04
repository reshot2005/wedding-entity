import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
        background: "#f9f7f4",
        color: "#343434",
      }}
    >
      <div>
        <p style={{ letterSpacing: ".18em", textTransform: "uppercase" }}>
          Page not found
        </p>
        <h1
          style={{
            margin: "1rem 0 2rem",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 9vw, 8rem)",
            fontWeight: 300,
          }}
        >
          Return to the story.
        </h1>
        <Link className="outlineButton" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
