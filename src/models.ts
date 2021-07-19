export interface Entry {
  id: string;
  date: string;
  title: string;
  pictureUrl: string;
  description: string;
}

export function toEntry(doc): Entry {
  return { id: doc.id, ...doc.data() };
}
