import React from 'react';
import { type Audience } from './copy.js';
/**
 * The "Short a player this weekend?" card.
 *
 * Opt-in per organization, decided by ProSlot rather than by a site deploy:
 * the card reads `GET /api/organizations/{orgId}` and renders only when the
 * org's document carries `playerNetwork.enabled: true`. Every site can mount
 * it; nothing shows until that flag is set for that client. A failed read
 * shows nothing, never a card the client did not ask for.
 *
 * Styling is the host's: every class name is a prop and defaults to a plain,
 * neutral look that reads on light or dark.
 */
export interface PlayerNetworkCardProps {
    audience: Audience;
    /** The site's organization id, e.g. "boysofsummerleague". */
    orgId: string;
    apiBaseUrl?: string;
    className?: string;
    headingClassName?: string;
    bodyClassName?: string;
    offerClassName?: string;
    ctaClassName?: string;
    /** Skip the org-flag read and render regardless. For previews and tests only. */
    forceEnabled?: boolean;
}
export declare function PlayerNetworkCard({ audience, orgId, apiBaseUrl, forceEnabled, className, headingClassName, bodyClassName, offerClassName, ctaClassName, }: PlayerNetworkCardProps): React.JSX.Element | null;
