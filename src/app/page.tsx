"use client";

import React, { useState } from "react";
import { Youtube, Copy, Sparkles } from "lucide-react";
import Header from "../components/Header";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import TranscriptBox, { TranscriptLine } from "../components/TranscriptBox";
import Loader from "../components/Loader";
import { toTimestampedTxt, toSrt } from "../lib/transcriptUtils";
import Copyright from "@/components/Copyright";
import { SupadataLine } from "../types/types";

function App() {
  const [url, setUrl] = useState("");
  const [transcript, setTranscript] = useState<TranscriptLine[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExtract = async () => {
    if (!url) return;
    setLoading(true);
    setTranscript(null);

    try {
      const res = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data.content)) {
        setTranscript(
          data.content.map((item: SupadataLine) => ({
            text: item.text,
            offset: item.offset,
            duration: item.duration,
          }))
        );
      } else {
        setTranscript([
          {
            text: data.error || "Could not fetch transcript.",
            offset: 0,
            duration: 0,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setTranscript([
        {
          text: "An unexpected error occurred.",
          offset: 0,
          duration: 0,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!transcript || transcript.length === 0) return;
    const plain = toTimestampedTxt(transcript);
    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn("Clipboard copy failed", e);
    }
  };

  const handleDownloadSrt = () => {
    if (!transcript || transcript.length === 0) return;
    const srt = toSrt(transcript);
    const blob = new Blob([srt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcript.srt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    if (!transcript || transcript.length === 0) return;
    const txt = toTimestampedTxt(transcript);
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcript.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Container>
        <Copyright />
        <Header />

        {/* Input */}
        <Card className="animate-fade-in">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Youtube className="w-5 h-5 text-accent animate-pulse" />
              <h2 className="text-lg font-semibold">Video URL</h2>
            </div>

            <Input
              label="YouTube Video Link"
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Button
              onClick={handleExtract}
              disabled={!url || loading}
              className="group"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                {loading ? "Extracting..." : "Extract Transcript"}
              </span>
            </Button>
          </div>
        </Card>

        {/* Loading */}
        {loading && (
          <Card className="animate-fade-in">
            <Loader />
          </Card>
        )}

        {/* Transcript */}
        {transcript && !loading && (
          <Card className="animate-slide-up">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Transcript</h2>
                <div className="flex gap-2">
                  <Button
                    variant="inset"
                    onClick={handleCopy}
                    className="!px-3 !py-2"
                  >
                    <Copy
                      className={`w-4 h-4 ${copied ? "text-accent" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="inset"
                    onClick={handleDownload}
                    className="!px-3 !py-2"
                  >
                    TXT
                  </Button>

                  <Button
                    variant="inset"
                    onClick={handleDownloadSrt}
                    className="!px-3 !py-2"
                  >
                    SRT
                  </Button>
                </div>
              </div>

              <TranscriptBox text={transcript} />
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default App;
