// Omtrentlig lesetid i minutter (ca. 200 ord i minuttet), regnet ut fra Markdown-teksten
export function lesetid(tekst: string = ""): number {
  const ren = tekst
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\]\([^)]*\)/g, "]");
  const ord = ren.split(/\s+/).filter((o) => /\w/.test(o)).length;
  return Math.max(1, Math.round(ord / 200));
}
