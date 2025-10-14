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
