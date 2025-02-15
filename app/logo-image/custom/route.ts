import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import QTBigImage from "@/lib/qt-big-image";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const hs = url.searchParams.get("height");
  const ws = url.searchParams.get("width");
  const text = url.searchParams.get("text");
  const CustomFontSize = url.searchParams.get("fontSize");
  if(hs === null)
    return new Response("Need height, width and text", { status: 400 });
  if(ws === null)
    return new Response("Need height, width and text", { status: 400 });
  if(text === null)
    return new Response("Need height, width and text", { status: 400 });
  const height = parseInt(hs);
  const width  = parseInt(ws);
  const kleeOne = await readFile(
    join(process.cwd(), 'assets/fonts/Klee_One/KleeOne-SemiBold.ttf')
  );
  const fontSize = CustomFontSize === null ? Math.floor(Math.min(height, width) * 0.77) : parseInt(CustomFontSize) * 0.77;
  return new ImageResponse(QTBigImage(fontSize, text),{
    height,
    width,
    fonts: [{
      name: 'Klee One',
      data: kleeOne,
      style: 'normal',
      weight: 700,
    }]
  }
  );
}