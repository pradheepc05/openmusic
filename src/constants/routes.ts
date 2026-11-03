export const routes = {
  home: '/',
  search: '/search',
  explore: '/explore',
  library: '/library',
  favorites: '/favorites',
  playlist: (id: string) => `/playlist/${id}`,
} as const;