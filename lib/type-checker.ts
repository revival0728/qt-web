import { Op } from "quill";
import type { CustomPlan, Plan } from "./type";

class CustomPlanImpl implements CustomPlan {
  duration!: number;
  langId!: string;
  beginDate!: string;
  loop?: boolean | undefined;
  bibleProgress!: string[][];
  requireBookList!: string[][];
  requireData!: Plan.RequireData[];
  dailyContent!: { titleId?: number; captionId?: number; youtubeVideoId?: number; externalLinkIds?: number[]; bibleProgressId?: number; }[];
  localizeData?: { [langId: string]: Plan.RequireData[]; } | undefined;
}
export function isCustomPlan(variable: unknown): variable is CustomPlan {
  return variable instanceof CustomPlanImpl;
}

class QuillOpImpl implements Op {}
export function isQuillOp(variable: unknown): variable is Op {
  return variable instanceof QuillOpImpl;
}
export function isQuillOpArray(variable: unknown): variable is Op[] {
  return (variable instanceof Array) && (variable.every(e => isQuillOp(e)));
}