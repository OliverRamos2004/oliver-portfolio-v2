export interface InterestEntry {
  id: string;
  title: string;
  body: string;
  photo?: { src: string; alt: string; width: number; height: number };
}
