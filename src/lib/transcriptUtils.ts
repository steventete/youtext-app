import { TranscriptLine } from '../components/TranscriptBox';

const isMs = (n: number) => n > 10000;

function formatTime(msOrSec: number) {
  const total = isMs(msOrSec) ? msOrSec / 1000 : msOrSec;
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(total % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

export function toTimestampedTxt(lines: TranscriptLine[]) {
  return lines
    .map((l) => `[${formatTime(l.offset)}] ${l.text.replace(/\\n/g, ' ')}`)
    .join('\n');
}


export function toSrt(lines: TranscriptLine[]) {
  const msOrSec = (n: number) => (n > 10000 ? n : n * 1000);

  const format = (time: number) => {
    const total = time / 1000;
    const h = Math.floor(total / 3600).toString().padStart(2, "0");
    const m = Math.floor((total % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(total % 60).toString().padStart(2, "0");
    const ms = Math.floor((time % 1000)).toString().padStart(3, "0");
    return `${h}:${m}:${s},${ms}`;
  };

  return lines
    .map((l, i) => {
      const start = msOrSec(l.offset);
      const end = start + msOrSec(l.duration || 500);
      return `${i + 1}
${format(start)} --> ${format(end)}
${l.text.replace(/\\n/g, " ")}

`;
    })
    .join("");
}
