import React from 'react';

export interface TranscriptLine {
  text: string;
  offset: number;
  duration: number;
}

interface TranscriptBoxProps {
  text: string | TranscriptLine[];
}

const isLikelyMilliseconds = (n: number) => n > 10000;

const formatDisplayTime = (value: number) => {
  const seconds = isLikelyMilliseconds(value) ? value / 1000 : value;
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

const TranscriptBox: React.FC<TranscriptBoxProps> = ({ text }) => {
  if (Array.isArray(text)) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-neutral-900 rounded-2xl shadow-inner overflow-y-auto max-h-[500px]">
        {text.map((line, i) => (
          <div
            key={i}
            className="flex gap-3 py-1 border-b border-gray-100 dark:border-neutral-800 last:border-none"
          >
            <span className="text-xs font-mono text-gray-400 min-w-[60px] text-right select-none">
              {formatDisplayTime(line.offset)}
            </span>
            <p className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">
              {line.text}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-neutral-900 rounded-2xl shadow-inner">
      <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{text}</p>
    </div>
  );
};

export default TranscriptBox;
