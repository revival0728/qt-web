import type { BibleRange, Book } from "@/lib/type";
import { parseBibleRange } from "@/lib/utilites";
import { NextRequest, NextResponse } from "next/server";
import { PEO_BOOK } from "@/lib/utilites";

function createResponse(str: string) {
  const res = new NextResponse(str);
  res.headers.append('Content-Type', 'text/html; charset=utf8');
  return res;
}

function genHTML(book: Book, range: BibleRange, title: number, version: number) {
  const genVersion = () => {
    if(version !== 1 || range.version == undefined) return "";
    return `<span class="version">${range.version}</span>`
  }
  const genTitle = () => {
    if(title !== 1) return "";
    const verseId: string[] = [];
    if(range.verseRange !== undefined) {
      verseId.push(":");
      verseId.push(range.verseRange[0].toString());
      verseId.push("-");
      verseId.push(range.verseRange[1].toString());
    }
    return `${book.name} ${range.chapterId}${verseId.join("")}${genVersion()}`;
  }
  const genId = (id: number) => {
    return `<span class="bible-verse-id">${id}</span>`
  }
  const genBody = () => {
    const ret: string[] = [];
    const ch = book.chapters[range.chapterId].verses;
    const peo = PEO_BOOK.includes(book.id);
    if(range.verseRange === undefined)
      range.verseRange = [0, ch.length - 1];
    for(let i = range.verseRange[0]; i <= range.verseRange[1]; ++i)  {
      const v = ch[i];
      const c = `${genId(v.id)}${v.verse}`;
      ret.push(peo ? `<p>${c}</p>` : `<span>${c}</span>`);
    }
    return peo ? ret.join("") : `<p>${ret.join("")}</p>`;
  }
  const ret = `<article class="bible-verse">${genTitle()}${genBody()}</article>`
  return ret;
}

export async function GET(reqest: NextRequest, { params }: { params: Promise<{ range: string}>}) {
  const searchParam = reqest.nextUrl.searchParams;
  const _title = searchParam.get('title');
  const _version = searchParam.get('version');
  const title = _title === null ? 0 : parseInt(_title);
  const version = _version === null ? 0 : parseInt(_version);
  const raw = (await params).range;
  const range = parseBibleRange(raw);
  if(range === undefined) {
    return createResponse(`<p>${raw}</p>`);
  }
  if(range.version === undefined)
    range.version = "CUV";
  try {
    const book = await import(`@/bible/${range.version}/${range.bookId}`) as Book;
    return createResponse(genHTML(book, range, title, version));
  } catch {
    return createResponse(`<p>${raw}</p>`);
  }
}