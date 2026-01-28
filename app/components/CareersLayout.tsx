export function PageWrapper({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    // CHANGED: Added "relative z-10", removed "bg-black"
    <div className="relative z-10 text-white min-h-screen px-6 py-32 max-w-5xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-6">
        {title}
      </h1>

      <p className="text-white/70 text-lg mb-10">
        {intro}
      </p>

      {children}
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <ul className="list-disc list-inside space-y-2 text-white/80 mb-10">
        {children}
      </ul>
    </>
  );
}