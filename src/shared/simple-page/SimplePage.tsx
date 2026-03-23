type SimplePageProps = {
  title: string;
  description: string;
};

export default function SimplePage({
  title,
  description,
}: SimplePageProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "var(--color-page-background)",
      }}
    >
      <section
        style={{
          width: "min(680px, 100%)",
          borderRadius: "20px",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          boxShadow: "var(--shadow-card)",
          padding: "40px",
        }}
      >
        <h1 style={{ margin: "0 0 12px", fontSize: "2rem" }}>{title}</h1>
        <p
          style={{
            margin: 0,
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </section>
    </main>
  );
}
