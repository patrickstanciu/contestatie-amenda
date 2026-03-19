/**
 * Strips common markdown and HTML formatting from AI-generated text,
 * producing clean plain text suitable for legal documents.
 */
export function stripMarkdown(text: string): string {
  return (
    text
      // Remove HTML tags (e.g. <div align="center">, </div>)
      .replace(/<[^>]+>/g, "")
      // Remove heading markers (# ## ### etc.)
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold/italic markers (** __ * _)
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // Remove blockquote markers
      .replace(/^>\s+/gm, "")
      // Remove bullet list markers (- * +)
      .replace(/^[\-\*\+]\s+/gm, "")
      // Remove numbered list markers (1. 2. etc.)
      .replace(/^\d+\.\s+/gm, "")
      // Remove inline code backticks
      .replace(/`([^`]+)`/g, "$1")
      // Collapse more than 2 consecutive newlines to 2
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}
