import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** The link preview (iMessage, LinkedIn, X): the name, as on the home page. */
export const alt = "OLIVER RAMOS, in giant condensed type on paper";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const anton = await readFile(join(process.cwd(), "assets/Anton-Regular.ttf"));

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 48px",
          background: "#f2eee6",
          color: "#151412",
          fontFamily: "Anton",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 205,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            // Stretched tall, like the home page's fill. The renderer scales
            // from the center, so the margin makes room above.
            transform: "scaleY(2)",
            marginTop: 100,
          }}
        >
          OLIVER RAMOS
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#6b1d2a" }}>
          <span>I BUILD SYSTEMS FOR SMALL BUSINESSES</span>
          <span>AUSTIN, TX</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: anton, style: "normal", weight: 400 }] },
  );
}
