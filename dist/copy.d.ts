/**
 * The words and the link, kept apart from React so they can be tested and so
 * a pre-rendered page could use them too.
 *
 * Two audiences. A coach on a league site is the one who is short a player;
 * a parent on a facility site is the one whose athlete wants more games.
 * Each gets one line of ask, one of what it costs, and one button.
 */
export type Audience = 'coach' | 'parent';
export declare const PLAYER_NETWORK_ORIGIN = "https://www.proslotplayernetwork.com";
/** The ProSlot API, in the current Cloud Run URL format. */
export declare const DEFAULT_API_BASE_URL = "https://proslot-api-473053764604.us-central1.run.app";
export interface Promos {
    parents: {
        open: boolean;
        remaining: number;
        limit: number;
        trialMonths: number;
    };
    coaches: {
        open: boolean;
        remaining: number;
        limit: number;
        credits: number;
        creditMonths: number;
    };
}
export interface CardCopy {
    heading: string;
    body: string;
    /** The launch offer line, or null once the offer is gone. */
    offer: string | null;
    cta: string;
}
export declare function copyFor(audience: Audience, promos: Promos | null): CardCopy;
/**
 * Where the button goes. The site's org id rides along as the campaign source
 * so the network's analytics can say which site sent each sign-up.
 */
export declare function signupHref(audience: Audience, orgId: string): string;
