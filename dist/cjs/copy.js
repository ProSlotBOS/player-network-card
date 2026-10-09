"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_API_BASE_URL = exports.PLAYER_NETWORK_LOGO_URL = exports.PLAYER_NETWORK_ORIGIN = void 0;
exports.copyFor = copyFor;
exports.signupHref = signupHref;
exports.PLAYER_NETWORK_ORIGIN = 'https://www.proslotplayernetwork.com';
/** The network's own mark, served by its site so every card shows the same asset. */
exports.PLAYER_NETWORK_LOGO_URL = `${exports.PLAYER_NETWORK_ORIGIN}/logo.png`;
/** The ProSlot API, in the current Cloud Run URL format. */
exports.DEFAULT_API_BASE_URL = 'https://proslot-api-473053764604.us-central1.run.app';
function copyFor(audience, promos) {
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
function signupHref(audience, orgId) {
    const start = audience === 'coach' ? 'coach' : 'parent';
    const src = encodeURIComponent(String(orgId || 'proslot-site').toLowerCase());
    return `${exports.PLAYER_NETWORK_ORIGIN}/app?start=${start}&utm_source=${src}&utm_medium=referral&utm_campaign=site_card`;
}
