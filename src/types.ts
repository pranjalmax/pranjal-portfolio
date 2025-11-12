// src/types.ts

export type AiProjectKey =
  | "hallucination-guard"
  | "private-doc-chat"
  | "vanessa"
  | "max";

export type BuildProjectKey = "dog-portal" | "helpdesk";

export type FoundationKey =
  | "heart-failure"
  | "ddos"
  | "fake-news"
  | "weather"
  | "db-opt";

export type SectionId =
  | "hero"
  | "ai-lab"
  | "build-stack"
  | "foundations"
  | "experience"
  | "about"
  | "playground"
  | "contact";

export type MaxAuthor = "user" | "max";

export type MaxMessage = {
  from: MaxAuthor;
  text: string;
};
