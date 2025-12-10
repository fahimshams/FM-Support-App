// src/services/aiService.ts
import { IssueType } from "../types";

// later you can replace this with a real OpenAI call
export async function generateAiSuggestion(
  issueType: IssueType,
  description: string
): Promise<string> {
  switch (issueType) {
    case "THREAD_BREAKING":
      return [
        "Possible causes:",
        "- Check needle damage or wrong needle size.",
        "- Make sure thread path is correct and not catching.",
        "- Reduce upper tension slightly and test again.",
      ].join("\n");

    case "STITCH_SKIPPING":
      return [
        "Possible causes:",
        "- Needle too small for fabric or bent.",
        "- Check hook timing and needle bar height.",
        "- Ensure presser foot pressure is appropriate.",
      ].join("\n");

    case "FABRIC_NOT_FEEDING":
      return [
        "Possible causes:",
        "- Feed dog height too low or dirty.",
        "- Increase presser foot pressure slightly.",
        "- Clean lint around feed dog and needle plate.",
      ].join("\n");

    default:
      return `Generic advice: re-thread top and bottom, check needle, clean machine. Description: ${description}`;
  }
}
