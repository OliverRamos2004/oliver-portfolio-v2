import Link from "next/link";

/**
 * The 404, in the site's language (critique 2026-11-15): paper, a giant tonal
 * "404" in the display face, one line and the way home.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col justify-between bg-paper px-[clamp(16px,2.8vw,40px)] py-[clamp(16px,2.8vw,40px)] text-ink">
      <p className="display text-[clamp(10rem,42vw,40rem)] leading-[0.8] text-[#e2dccf]" aria-hidden="true">
        404
      </p>
      <div className="flex flex-wrap items-end justify-between gap-4 text-[17px]">
        <h1 className="m-0 text-[17px] font-normal">Nothing here.</h1>
        <Link href="/" className="text-signal hover:underline">
          Back to Oliver Ramos
        </Link>
      </div>
    </main>
  );
}
