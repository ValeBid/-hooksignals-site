"use client";

import { useState } from "react";

function analyzeHook(text: string) {
  let score = 42;
  const clean = text.toLowerCase();
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  if (text.length >= 35) score += 8;
  if (text.length >= 70) score += 6;
  if (text.includes("?")) score += 7;
  if (wordCount <= 18) score += 6;

  const powerWords = [
    "mistake",
    "stop",
    "secret",
    "grow",
    "viral",
    "views",
    "fast",
    "why",
    "never",
    "hidden",
    "simple",
    "truth",
    "before",
  ];

  powerWords.forEach((word) => {
    if (clean.includes(word)) score += 4;
  });

  score = Math.min(100, score);

  const clarity = Math.min(100, Math.max(35, score - 3));
  const curiosity = Math.min(100, Math.max(35, score + 5));
  const retention = Math.min(100, Math.max(35, score - 1));

  const grade =
    score >= 85 ? "Excellent" : score >= 72 ? "Strong" : score >= 58 ? "Decent" : "Weak";

  const color =
    score >= 85
      ? "text-emerald-300"
      : score >= 72
      ? "text-l