# 15 — Future Backend Integration

## Intent

The current site is static. This document defines seams so a backend can be added later without redesigning or rewriting UI components.

## Seams already planned

1. **Repository layer** — `src/lib/repository.ts`.
2. **Typed models** — `src/types/product.ts`, `category.ts`, `content.ts`.
3. **Config separation** — contact/site data out of components.
4. **Async function signatures** — repository returns `Promise` even for local data.

## Potential backend capabilities

| Capability | Future implementation | UI impact |
| --- | --- | --- |
| Product CMS | Headless CMS or database | None if repository contract holds |
| Real inventory | Stock API | Add availability labels |
| Contact form | Server action / API route | Replace mailto handler |
| Enquiries | CRM webhook | Add success/error states |
| Analytics | Event API | Add data attributes already planned |
| Search | Search endpoint | Add search UI |
| Localization | i18n framework | Strings move to dictionaries |
| Authentication | Auth provider | Add account UI only if approved |

## Migration path

### Phase A — local data (now)

```ts
export async function getProducts() {
  return products;
}
```

### Phase B — fetch from CMS

```ts
export async function getProducts() {
  const res = await fetch(`${CMS_URL}/products`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch products');
  return parseProducts(await res.json());
}
```

### Phase C — cached hybrid

- ISR/revalidation.
- Fallback to local snapshot on fetch failure.
- Preview mode for editorial review.

## Validation at the boundary

- Parse external data into typed models.
- Never trust CMS HTML directly.
- Sanitize URLs and image paths.
- Validate hex colors and slugs.
- Fail gracefully with local fallback or empty state.

## Contact form evolution

Current: `mailto:` only, with public contact values injected through `NEXT_PUBLIC_*` env vars and placeholders hidden from live links.

Future:

1. Add server action with validation.
2. Keep `mailto:` as fallback.
3. Add success/error UI using shadcn components.
4. Add rate limiting and spam protection.
5. Never store private data in `NEXT_PUBLIC_*`.

## Data ownership

| Data | Current owner | Future owner |
| --- | --- | --- |
| Products | `src/data/products.ts` | CMS |
| Categories | `src/data/categories.ts` | CMS |
| Manufacturing copy | `src/data/manufacturing.ts` | CMS |
| Contact details | `src/config/contact.ts` | Ops config / CMS |
| Brand tokens | Code | Design system package |

## Non-goals for now

- No database schema implementation.
- No admin UI.
- No order/payment logic.
- No user accounts.

## Acceptance criteria for future integration

- Existing page components require no prop changes.
- Existing routes remain URL-compatible.
- Product slugs remain stable or redirects are added.
- Performance budgets still pass after data integration.
