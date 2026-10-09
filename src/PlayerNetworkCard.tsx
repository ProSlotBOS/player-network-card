import React, { useEffect, useState } from 'react';
import { copyFor, signupHref, DEFAULT_API_BASE_URL, type Audience, type Promos } from './copy.js';

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

const DEFAULTS = {
  className: 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm',
  headingClassName: 'text-lg font-bold text-slate-900',
  bodyClassName: 'mt-1 text-sm text-slate-600',
  offerClassName: 'mt-2 text-sm font-semibold text-emerald-700',
  ctaClassName: 'mt-4 inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white',
};

async function readJson<T>(url: string, headers?: Record<string, string>): Promise<T | null> {
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function PlayerNetworkCard({
  audience,
  orgId,
  apiBaseUrl = DEFAULT_API_BASE_URL,
  forceEnabled = false,
  className = DEFAULTS.className,
  headingClassName = DEFAULTS.headingClassName,
  bodyClassName = DEFAULTS.bodyClassName,
  offerClassName = DEFAULTS.offerClassName,
  ctaClassName = DEFAULTS.ctaClassName,
}: PlayerNetworkCardProps) {
  const [enabled, setEnabled] = useState(forceEnabled);
  const [promos, setPromos] = useState<Promos | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!forceEnabled) {
      readJson<{ playerNetwork?: { enabled?: boolean } }>(`${apiBaseUrl}/api/organizations/${encodeURIComponent(orgId)}`, {
        'X-Organization-ID': orgId,
      }).then((org) => {
        if (!cancelled) setEnabled(org?.playerNetwork?.enabled === true);
      });
    }
    readJson<Promos>(`${apiBaseUrl}/api/player-network/promos`).then((p) => {
      if (!cancelled) setPromos(p);
    });
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, orgId, forceEnabled]);

  if (!enabled) return null;
  const text = copyFor(audience, promos);
  return (
    <div className={className} data-player-network-card={audience}>
      <p className={headingClassName}>{text.heading}</p>
      <p className={bodyClassName}>{text.body}</p>
      {text.offer ? <p className={offerClassName}>{text.offer}</p> : null}
      <a href={signupHref(audience, orgId)} target="_blank" rel="noopener" className={ctaClassName}>
        {text.cta}
      </a>
    </div>
  );
}
