export interface Image {
  type: 'profile' | 'banner' | string;
  url: string;
}

export interface UserProfile {
  name: string | null;
  genderPronoun: string | null;
  gamerTag: string | null;
  prefix: string | null;
  images: Image[];
}
