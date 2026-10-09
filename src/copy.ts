/**
 * The words and the link, kept apart from React so they can be tested and so
 * a pre-rendered page could use them too.
 *
 * Two audiences. A coach on a league site is the one who is short a player;
 * a parent on a facility site is the one whose athlete wants more games.
 * Each gets one line of ask, one of what it costs, and one button.
 */
export type Audience = 'coach' | 'parent';

export const PLAYER_NETWORK_ORIGIN = 'https://www.proslotplayernetwork.com';

/** The ProSlot API, in the current Cloud Run URL format. */
export const DEFAULT_API_BASE_URL = 'https://proslot-api-473053764604.us-central1.run.app';

export interface Promos {
  parents: { open: boolean; remaining: number; limit: number; trialMonths: number };
  coaches: { open: boolean; remaining: number; limit: number; credits: number; creditMonths: number };
}

export interface CardCopy {
  heading: string;
  body: string;
  /** The launch offer line, or null once the offer is gone. */
  offer: string | null;
  cta: string;
}

export function copyFor(audience: Audience, promos: Promos | null): CardCopy {
  if (audience === 'coach') {
    const p = promos?.coaches;
    return {
      heading: 'Short a player this weekend?',
      body: 'Post the open spot on ProSlot Player Network. Available players near you offer to play, and a parent approves every invite.',
      offer: p && p.open && p.remaining > 0
        ? `The first ${p.limit} coaches get ${p.credits} free postings — ${p.remaining} place${p.remaining === 1 ? '' : 's'} left.`
        : null,
      cta: 'Post a spot',
    };
  }
  const p = promos?.parents;
  return {
    heading: 'Want more games?',
    body: 'List your athlete on ProSlot Player Network and teams that are one short can invite them. You approve every invite.',
    offer: p && p.open && p.remaining > 0
      ? `The first ${p.limit} athletes get ${p.trialMonths} months free — ${p.remaining} place${p.remaining === 1 ? '' : 's'} left.`
      : null,
    cta: 'List my athlete',
  };
}

/**
 * Where the button goes. The site's org id rides along as the campaign source
 * so the network's analytics can say which site sent each sign-up.
 */
export function signupHref(audience: Audience, orgId: string): string {
  const start = audience === 'coach' ? 'coach' : 'parent';
  const src = encodeURIComponent(String(orgId || 'proslot-site').toLowerCase());
  return `${PLAYER_NETWORK_ORIGIN}/app?start=${start}&utm_source=${src}&utm_medium=referral&utm_campaign=site_card`;
}
