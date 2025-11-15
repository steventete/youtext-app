export interface SupadataLine {
  lang: string;
  text: string;
  offset: number;
  duration: number;
}

export interface SupadataResponse {
  lang: string;
  availableLangs: string[];
  content: SupadataLine[];
}