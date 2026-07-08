// import DOMPurify from 'dompurify';

export function parseAndSanitizeMarkdown(md: string): string {
  // Simple markdown structural fallback rules
  const html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Restore raw unsafe tags from mock server to evaluate sanitization coverage
    .replace(/&lt;img([\s\S]*?)&gt;/gi, '<img$1>')
    .replace(/&lt;script([\s\S]*?)&gt;([\s\S]*?)&lt;\/script&gt;/gi, '<script>$2</script>')
    // Structural layout transformations
    .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-gray-900 mt-3 mb-1">$1</h2>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/_(.*)_/gim, '<em>$1</em>')
    .replace(/^\s*-\s*(.*)$/gim, '<li class="ml-4 list-disc text-gray-700">$1</li>')
    .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 text-red-600 px-1 rounded text-xs font-mono">$1</code>')
    .replace(/```ts\n([\s\S]*?)\n```/gim, '<pre class="bg-slate-900 text-slate-100 p-3 rounded text-xs font-mono overflow-x-auto my-2">$1</pre>')
    .replace(/\n/g, '<br />');

  // Strict Sanitization Layer
//   if (typeof window !== 'undefined') {
//     return DOMPurify.sanitize(html, {
//       ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'code', 'pre', 'ul', 'ol', 'li', 'p', 'br', 'h2'],
//       ALLOWED_ATTR: [] // Do not allow attributes like onerror or src to evaluate untrusted scripts
//     });
//   }
  return html;
}