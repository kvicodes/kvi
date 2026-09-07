// ---------------------------------------------------------------------------
// Insights / articles.
//
// `articles` is empty until real pieces are written. The UI handles the empty
// state (an "in preparation" notice) so nothing fabricated is published.
// To add an article, push an object of the shape shown in `articleShape`.
// ---------------------------------------------------------------------------

export const insightCategories = [
  'Technology',
  'Agriculture',
  'Infrastructure',
  'Business',
  'Innovation',
  'KVI Updates',
]

// Reference shape for a future article (not rendered):
export const articleShape = {
  slug: 'example-slug',
  title: '',
  category: 'Business',
  date: '2026-01-01',
  excerpt: '',
  readingTime: '4 min',
}

/** @type {Array<typeof articleShape>} */
export const articles = []
