
export interface Artist{
  _id: string;
  name: string;
  information?: string;
  photo: string | null;
}

export interface Album{
  _id: string;
  artist: string;
  title: string;
  date: number;
  image: string | null;
}