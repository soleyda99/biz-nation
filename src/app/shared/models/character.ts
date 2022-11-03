export interface Welcome {
  data: Data;
}

export interface Data {
  results: Result[];
}

export interface Result {
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  id?: number;
  urls: Url[];
  src: string;
}
export interface Url {
  type: string;
  url: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}
