import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { parse } from "yaml";

// ---------------------------------------------------------------------------
// PUBLICATIONS
// Add a paper by dropping a new .md file in src/content/publications/.
// Only the frontmatter matters; the body (below the ---) can hold an abstract.
// ---------------------------------------------------------------------------
const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(), // journal / conference / "In preparation"
    year: z.number(),
    // "published" | "accepted" | "under-review" | "in-progress"
    status: z
      .enum(["published", "accepted", "under-review", "in-progress"])
      .default("published"),
    // Optional links — omit any you don't have. Tolerates an empty `links:`.
    links: z
      .object({
        pdf: z.string().optional(),
        doi: z.string().optional(),
        arxiv: z.string().optional(),
        code: z.string().optional(),
        project: z.string().optional(),
      })
      .nullish()
      .transform((v) => v ?? {}),
    // Highlight your best work: featured items sort to the top.
    featured: z.boolean().default(false),
  }),
});

// ---------------------------------------------------------------------------
// READING LIST — papers I recommend.
// All entries live in ONE file: src/data/reading.yaml. Adding a paper is
// copy-pasting a block of ~8 lines there; no new files needed.
// ---------------------------------------------------------------------------
const reading = defineCollection({
  loader: file("./src/data/reading.yaml", { parser: (text) => parse(text) }),
  schema: z.object({
    title: z.string(),
    authors: z.string().optional(),
    venue: z.string().optional(),
    year: z.number().optional(),
    url: z.string().optional(),
    // Free-form tags, e.g. ["vision", "self-supervised"]
    tags: z.array(z.string()).default([]),
    // Your one-line takeaway — the reason this belongs on the list.
    note: z.string().optional(),
    dateRead: z.coerce.date().optional(),
  }),
});

export const collections = { publications, reading };
