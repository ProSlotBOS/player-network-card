# @proslotbosllc/player-network-card

The "Short a player this weekend?" card a ProSlot league or facility site shows
its coaches and families, pointing them to [ProSlot Player Network](https://www.proslotplayernetwork.com).

Opt-in per client, from the organization's document rather than a site
deploy: the card renders only when `organizations/{orgId}.playerNetwork.enabled`
is `true`, read through `GET /api/organizations/:id`. Mount it everywhere;
nothing appears until ProSlot switches it on for that client.

```tsx
import { PlayerNetworkCard } from '@proslotbosllc/player-network-card';
<PlayerNetworkCard audience="coach" orgId={ORG_ID} apiBaseUrl={API_BASE} />
```

`audience` is `coach` (league coach dashboards) or `parent` (facility family
accounts). Class names are props; the launch-offer line reads the live count
from `/api/player-network/promos` and disappears when the offer is gone.
