/* ─── Dimensions ─── */
export interface Dimensions {
  w: number;
  h: number;
  d: number;
}

/* ─── Furniture state grades ─── */
export type FurnitureStateKey = 'A' | 'B' | 'C';

export interface FurnitureState {
  key: FurnitureStateKey;
  label: string;
  stars: number;
}

/* ─── Furniture item ─── */
export interface Furniture {
  id: string;
  name: string;
  category: string;
  brand: string;
  dimensions: Dimensions;
  state: FurnitureStateKey;
  company: string;
  material: string;
  quantity: number;
  assetId: string;
  price: number;
  priceMin: number;
  priceMax: number;
  priceRef: number;
  salesCount: number;
  polygons: number;
  color: string;
}

/* ─── User ─── */
export interface User {
  email: string;
  name: string;
  company: string;
}

/* ─── Scanner metadata form ─── */
export interface ScannerMeta {
  category: string;
  brand: string;
  w: string;
  h: string;
  d: string;
  qty: string;
  material: string;
  state: FurnitureStateKey;
  notes: string;
}

/* ─── Processing progress ─── */
export interface ProcessingProgress {
  keys: number;
  align: number;
  mesh: number;
  tex: number;
}
