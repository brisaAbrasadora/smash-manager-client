import { UrlMatchResult, UrlSegment } from '@angular/router';

export function tournamentIdMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length !== 1) {
    return null;
  }

  const [segment] = segments;

  if (!/^\d+$/.test(segment.path)) {
    return null;
  }

  return {
    consumed: segments,
    posParams: {
      id: segment,
    },
  };
}
