export function formatCategoryLabel(slug: string): string {
  const labels: Record<string, string> = {
    shirts: 'Shirts',
    't-shirts': 'T-Shirts',
    jeans: 'Jeans',
    trousers: 'Trousers',
    jackets: 'Jackets',
    'polo-shirts': 'Polo Shirts',
    other: 'Other Apparel'
  };

  return labels[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}
