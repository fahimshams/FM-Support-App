// src/services/cacheService.ts
import { cache } from "../store";
import { CachedAnswer, IssueType } from "../types";

export function buildCacheKey(issueType: IssueType, description: string): string {
  // super simple key for now: only issueType.
  // later you can make it smarter (normalize text, machine model, etc.)
  return `issue:${issueType}`;
}

export function getCachedAnswer(key: string): CachedAnswer | undefined {
  return cache.find((item) => item.key === key);
}

export function setCachedAnswer(
  key: string,
  issueType: IssueType,
  text: string
): CachedAnswer {
  const existingIndex = cache.findIndex((c) => c.key === key);
  const item: CachedAnswer = {
    key,
    issueType,
    text,
    createdAt: new Date(),
  };

  if (existingIndex >= 0) {
    cache[existingIndex] = item;
  } else {
    cache.push(item);
  }

  return item;
}
