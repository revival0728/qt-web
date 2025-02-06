import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import QTBigImage from "@/lib/qt-big-image";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const hs = url.searchParams.get("height");
  const ws = url.searchParams.get("width");
  if(hs === null)
    return new Response("Need height and width", { status: 400 });
  if(ws === null)
    return new Response("Need height and width", { status: 400 });
  const height = parseInt(hs);
  const width  = parseInt(ws);
  const montez = await readFile(
    join(process.cwd(), 'assets/fonts/Montez/Montez-Regular.ttf')
  );
  const fontSize = Math.floor(Math.min(height, width) * 0.77);
  return new ImageResponse(QTBigImage(fontSize),{
    height,
    width,
    fonts: [{
      name: 'Montez',
      data: montez,
      style: 'normal',
      weight: 400,
    }]
  }
  );
}