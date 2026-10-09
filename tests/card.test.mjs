/**
 * The card goes on other businesses' sites, so two things must hold: it says
 * nothing a client did not opt into, and what it says is true of the offer.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { copyFor, signupHref } from '../dist/copy.js';
import { PlayerNetworkCard } from '../dist/PlayerNetworkCard.js';

const promos = {
  parents: { open: true, remaining: 99, limit: 100, trialMonths: 6 },
  coaches: { open: true, remaining: 1, limit: 100, credits: 10, creditMonths: 12 },
};

describe('copy', () => {
  test('coach: states the offer with the live count, singular when one is left', () => {
    const c = copyFor('coach', promos);
    assert.equal(c.heading, 'Short a player this weekend?');
    assert.equal(c.offer, 'The first 100 coaches get 10 free postings — 1 place left.');
  });
  test('parent: states the offer with the live count', () => {
    assert.equal(copyFor('parent', promos).offer, 'The first 100 athletes get 6 months free — 99 places left.');
  });
  test('no offer line once places are gone, closed, or unknown', () => {
    assert.equal(copyFor('coach', { ...promos, coaches: { ...promos.coaches, remaining: 0 } }).offer, null);
    assert.equal(copyFor('parent', { ...promos, parents: { ...promos.parents, open: false } }).offer, null);
    assert.equal(copyFor('parent', null).offer, null);
  });
});

describe('link', () => {
  test('starts the right flow and names the sending site', () => {
    assert.equal(signupHref('coach', 'boysofsummerleague'),
      'https://www.proslotplayernetwork.com/app?start=coach&utm_source=boysofsummerleague&utm_medium=referral&utm_campaign=site_card');
    assert.match(signupHref('parent', 'TC Blackhawks'), /start=parent&utm_source=tc%20blackhawks/);
  });
});

describe('component', () => {
  test('renders nothing until the org flag is read, so a server render never shows an unrequested card', () => {
    assert.equal(renderToStaticMarkup(React.createElement(PlayerNetworkCard, { audience: 'coach', orgId: 'x' })), '');
  });
  test('forceEnabled renders the card with its link', () => {
    const html = renderToStaticMarkup(React.createElement(PlayerNetworkCard, { audience: 'parent', orgId: 'tcblackhawks', forceEnabled: true }));
    assert.match(html, /Want more games\?/);
    assert.match(html, /utm_source=tcblackhawks/);
    assert.match(html, /rel="noopener"/);
  });
});
