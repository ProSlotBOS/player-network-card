"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerNetworkCard = PlayerNetworkCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const copy_js_1 = require("./copy.js");
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
function PlayerNetworkCard({ audience, orgId, apiBaseUrl = copy_js_1.DEFAULT_API_BASE_URL, forceEnabled = false, className = DEFAULTS.className, headingClassName = DEFAULTS.headingClassName, bodyClassName = DEFAULTS.bodyClassName, offerClassName = DEFAULTS.offerClassName, ctaClassName = DEFAULTS.ctaClassName, }) {
    const [enabled, setEnabled] = (0, react_1.useState)(forceEnabled);
    const [promos, setPromos] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
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
    const text = (0, copy_js_1.copyFor)(audience, promos);
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, "data-player-network-card": audience, children: [(0, jsx_runtime_1.jsx)("p", { className: headingClassName, children: text.heading }), (0, jsx_runtime_1.jsx)("p", { className: bodyClassName, children: text.body }), text.offer ? (0, jsx_runtime_1.jsx)("p", { className: offerClassName, children: text.offer }) : null, (0, jsx_runtime_1.jsx)("a", { href: (0, copy_js_1.signupHref)(audience, orgId), target: "_blank", rel: "noopener", className: ctaClassName, children: text.cta })] }));
}
