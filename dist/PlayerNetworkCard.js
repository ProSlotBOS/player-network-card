import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { copyFor, signupHref, DEFAULT_API_BASE_URL } from './copy.js';
const DEFAULTS = {
    className: 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm',
    headingClassName: 'text-lg font-bold text-slate-900',
    bodyClassName: 'mt-1 text-sm text-slate-600',
    offerClassName: 'mt-2 text-sm font-semibold text-emerald-700',
    ctaClassName: 'mt-4 inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white',
};
async function readJson(url, headers) {
    try {
        const res = await fetch(url, { headers });
        if (!res.ok)
            return null;
        return (await res.json());
    }
    catch {
        return null;
    }
}
export function PlayerNetworkCard({ audience, orgId, apiBaseUrl = DEFAULT_API_BASE_URL, forceEnabled = false, className = DEFAULTS.className, headingClassName = DEFAULTS.headingClassName, bodyClassName = DEFAULTS.bodyClassName, offerClassName = DEFAULTS.offerClassName, ctaClassName = DEFAULTS.ctaClassName, }) {
    const [enabled, setEnabled] = useState(forceEnabled);
    const [promos, setPromos] = useState(null);
    useEffect(() => {
        let cancelled = false;
        if (!forceEnabled) {
            readJson(`${apiBaseUrl}/api/organizations/${encodeURIComponent(orgId)}`, {
                'X-Organization-ID': orgId,
            }).then((org) => {
                if (!cancelled)
                    setEnabled(org?.playerNetwork?.enabled === true);
            });
        }
        readJson(`${apiBaseUrl}/api/player-network/promos`).then((p) => {
            if (!cancelled)
                setPromos(p);
        });
        return () => {
            cancelled = true;
        };
    }, [apiBaseUrl, orgId, forceEnabled]);
    if (!enabled)
        return null;
    const text = copyFor(audience, promos);
    return (_jsxs("div", { className: className, "data-player-network-card": audience, children: [_jsx("p", { className: headingClassName, children: text.heading }), _jsx("p", { className: bodyClassName, children: text.body }), text.offer ? _jsx("p", { className: offerClassName, children: text.offer }) : null, _jsx("a", { href: signupHref(audience, orgId), target: "_blank", rel: "noopener", className: ctaClassName, children: text.cta })] }));
}
