/* Abhishek S Valsan, portfolio behaviour.
   Motion follows the B7 rules: transform and opacity only, IntersectionObserver
   for reveals, requestAnimationFrame for the tagline, reduced motion respected. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- content ---------- */
  const VIDEOS = [
    { key: 'p4', group: 'reels', orient: 'v', title: 'Asking the chef for my favourite burger', client: 'Bang Bang Burger', format: 'Instagram Reel', desc: 'A behind the counter format that puts the kitchen team on camera.' },
    { key: 'p3', group: 'reels', orient: 'v', title: 'Perfect cross section challenge', client: 'Bang Bang Burger', format: 'Instagram Reel', desc: 'A challenge hook built to hold viewers past the first three seconds.' },
    { key: 'p2', group: 'reels', orient: 'v', title: 'Toasting the buns', client: 'Bang Bang Burger', format: 'Instagram Reel', desc: 'Process footage cut to a fast rhythm for Reels and Stories.' },
    { key: 'p5', group: 'reels', orient: 'v', title: 'Kitchen process edit', client: 'Bang Bang Burger', format: 'Instagram Reel', desc: 'A behind the scenes edit showing how each burger is built.' },
    { key: 'p6', group: 'reels', orient: 'v', title: 'Cheeseburger close up', client: 'Bang Bang Burger', format: 'Instagram Reel', desc: 'A hero product shot made to stop the scroll.' },
    { key: 'ai5', group: 'ai', orient: 'h', title: 'Patty flip', client: 'Concept work', format: 'AI ad film', desc: 'An AI generated food commercial concept, edited for paid social.' },
    { key: 'ai6', group: 'ai', orient: 'h', title: 'Flame grill', client: 'Concept work', format: 'AI ad film', desc: 'An AI generated food commercial concept, edited for paid social.' },
    { key: 'ai7', group: 'ai', orient: 'h', title: 'Fresh on the grill', client: 'Concept work', format: 'AI ad film', desc: 'An AI generated food commercial concept, edited for paid social.' },
    { key: 'ai8', group: 'ai', orient: 'h', title: 'Sizzle', client: 'Concept work', format: 'AI ad film', desc: 'An AI generated food commercial concept, edited for paid social.' }
  ];

  const CASES = {
    aibi: {
      title: 'AIBI Campus', meta: 'Education, India. Meta Ads, Apr to Oct 2026',
      outcome: '508 leads at ₹131.59 average cost per lead',
      shots: [
        ['img/aibi-campaigns.jpg', 'Meta Ads Manager campaign table for AIBI Campus, 1 Apr to 29 Oct 2026', 'Campaign results, 1 Apr to 29 Oct 2026: lead form and WhatsApp campaigns with cost per result, spend, impressions and reach.'],
        ['img/aibi-whatsapp.jpg', 'Performance overview of a WhatsApp campaign', 'WhatsApp campaign: 53 conversations started, ₹13,161.70 spent.'],
        ['img/aibi-leadform.jpg', 'Performance overview of a lead form campaign', 'Lead form campaign, 29 Sep to 28 Oct 2026: 49 leads at ₹207.10 each, ₹10,147.83 spent.']
      ],
      problem: 'Cost per lead on Meta Ads was high and targeting was too broad for an education brand recruiting students across Kerala.',
      strategy: 'Split spend between instant lead forms and click to WhatsApp campaigns, built on competitor analysis and precise interest targeting.',
      execution: 'End to end Meta Ads management: custom audience segments, separate Kerala and placement campaigns, and structured creative testing to find the best performing ads.',
      result: 'Across the four lead form campaigns shown, 508 leads at an average of ₹131.59, with the lowest cost per lead at ₹96.32. Five WhatsApp campaigns started 242 conversations at an average of ₹144.80.',
      tags: ['Meta Ads', 'Lead forms', 'WhatsApp campaigns', 'Audience segmentation', 'Creative testing']
    },
    himmath: {
      title: 'Himmath Gold', meta: 'Gold bullion dealer, Dubai Gold Souk. SEO, 2026',
      outcome: '150K Google impressions and 1.51K clicks in 3 months',
      shots: [
        ['img/himmath-search-console.jpg', 'Google Search Console performance for himmathgold.com', 'Google Search Console, 28 Jul to 27 Oct 2026: 1.51K clicks, 150K impressions, 1% click through rate and an average position of 10.9.'],
        ['img/himmath-site.jpg', 'Himmath Gold homepage', 'The himmathgold.com homepage.']
      ],
      link: ['https://himmathgold.com/', 'Visit himmathgold.com'],
      problem: 'A bullion dealer in Dubai Gold Souk competing online for high value searches like gold bars, PAMP bars and gold coins, against long established dealers.',
      strategy: 'Start with a full website audit and competitor analysis, then build a keyword plan around what buyers search for: bullion, coins and gold jewellery in Dubai.',
      execution: 'Keyword research and planning, on page SEO across the site, off page SEO and backlink building, and ongoing rank tracking.',
      result: 'Over three months (28 Jul to 27 Oct 2026) the site earned 1.51K clicks and 150K impressions from Google Search, with a 1% click through rate and an average position of 10.9.',
      tags: ['Website audit', 'Competitor analysis', 'Keyword research', 'On page SEO', 'Off page SEO', 'Backlinks', 'Rank tracking']
    },
    bbb: {
      title: 'Bang Bang Burger', meta: 'Restaurant, London. Nov 2022 to Feb 2025',
      outcome: 'Organic engagement up 40% in 12 months',
      posts: ['media/bbb-post-1.jpg', 'media/bbb-post-2.jpg', 'media/bbb-post-3.jpg'],
      problem: "The brand needed more organic engagement and a way to scale paid acquisition in London's crowded food and drink market.",
      strategy: 'Structured content calendars, audience A/B tests and GA4 tracking, with ROAS, CTR and CPM as the numbers to move.',
      execution: 'Five to seven posts a week made in Canva and CapCut, Meta Ads run end to end, and KPI reports every two weeks benchmarked against six or more competitor brands.',
      result: 'Organic engagement grew 40% in 12 months, ad CTR and CPC improved, and the brand pulled ahead of key competitors in its segment.',
      tags: ['Meta Ads', 'Content calendar', 'A/B testing', 'GA4', 'Canva', 'CapCut']
    },
    peely: {
      title: 'Peely Digital Media', meta: 'Print and gifting shop, Kerala. 2026',
      outcome: 'On the first page of Google for print shops in Thuruthipuram',
      shots: [
        ['img/peely-local-search.jpg', 'Google local results for print shop in Thuruthipuram Kerala', 'Google local results for "print shop in thuruthipuram kerala": Peely Digital Media shows on the first page, rated 5.0.'],
        ['img/peely-profile.jpg', 'Peely Digital Media Google Business Profile', 'The live Google Business Profile: rated 5.0 from 4 Google reviews.'],
        ['img/peely-posts.jpg', 'Google Posts from the Peely Digital Media profile', 'Keyword led Google Posts, each ending in a Call now button.']
      ],
      link: ['https://share.google/4axIgrkwm0UhnlmM0', 'See the live profile on Google'],
      problem: 'An established print and gifting shop needed to show up when people in Thuruthipuram and North Paravur search Google for printing, banners and wedding cards.',
      strategy: 'Build the profile around the service and place searches locals actually make: flex banners, visiting cards, wedding cards, custom trophies and corporate gifts, paired with Thuruthipuram and North Paravur.',
      execution: 'Rewrote the business description around those keywords and set up a steady rhythm of Google Posts. Category, phone, hours and map location are complete, so the profile qualifies for map results.',
      result: 'The shop now appears on the first page of Google\'s local results for "print shop in thuruthipuram kerala", rated 5.0 from 4 Google reviews. Six keyword led posts in under two weeks keep the profile active.',
      tags: ['Local SEO', 'Google Business Profile', 'Google Posts', 'Keyword research', 'Copywriting']
    },
    aqiq: {
      title: 'Aqiq Architecture', meta: 'Architecture firm, Calicut. Oct 2026 to now, in progress',
      outcome: 'Instagram strategy, 24 week roadmap and content calendar',
      shots: [
        ['img/aqiq-instagram.jpg', 'The aqiq_architecture Instagram profile', 'The Instagram profile at the start of the project.'],
        ['img/aqiq-cover.jpg', 'Cover of the Aqiq Architecture Instagram strategy', 'The strategy document: Build the proof. Own the feed.'],
        ['img/aqiq-roadmap.jpg', 'Six month roadmap from the strategy', 'The roadmap, November 2026 to April 2027.']
      ],
      link: ['https://www.instagram.com/aqiq_architecture/', 'See the Instagram page'],
      problem: 'A firm with more than 5,000 followers and 200 posts, but a profile that said where they work, not why to choose them: a generic bio, highlights by district only, and pinned posts that were all renders.',
      strategy: 'Position Aqiq on proof with the idea Drawn. Built. Proven. Five content pillars and six signature series, including Render vs Reality, Site Report Sunday for owners in the Gulf, and Kerala Climate Code.',
      execution: 'Profile audit, bio and highlight rebuild, a WhatsApp enquiry funnel, a 24 week roadmap from November 2026 to April 2027, a day by day calendar for month one and a weekly plan for months two to six.',
      result: 'In progress. Success is measured on qualified enquiries rather than followers, with a baseline in month one and a six month review in April 2027.',
      tags: ['Instagram audit', 'Brand positioning', 'Content pillars', 'Content calendar', 'Roadmap', 'Google Business Profile']
    },
    kasavu: {
      title: 'KasavuMaalika.com', meta: 'Handloom ecommerce, Kerala. 2025 to now',
      outcome: 'Full CRO and SEO audit with a 90 day plan',
      problem: 'A Kerala handloom store converting under 0.5% of visitors, with a mobile PageSpeed score of 20 to 40.',
      strategy: 'A prioritised 16 point brief for the agency: hosting migration, CDN setup, CRO fixes (WhatsApp integration, abandoned cart recovery, trust badges) and schema markup.',
      execution: 'Working with the team on server setup, page speed, caching and rich product schema.',
      result: 'Targets for the first 90 days: conversion rate up to 1.5 to 2.5% and mobile PageSpeed above 70.',
      tags: ['CRO', 'Technical SEO', 'Page speed', 'Schema markup']
    },
    anad: {
      title: 'Anad.ae', meta: 'SEO, UAE. 2025 to 2026',
      outcome: 'Competitor gap analysis and technical SEO roadmap',
      problem: 'Losing market share to competitors with stronger visibility in search.',
      strategy: 'A detailed competitor gap analysis, combined with a technical SEO overhaul and domain authority building.',
      execution: 'Technical audit, content gap analysis, backlink building and directory submissions.',
      result: 'Stronger domain authority and higher rankings than major competitors on niche search terms.',
      tags: ['Technical SEO', 'Gap analysis', 'Off page SEO', 'Backlinks']
    }
  };

  /* ---------- images: skeleton until loaded ---------- */
  const markLoaded = img => {
    const done = () => img.classList.add('loaded');
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
  };
  $$('.media img').forEach(markLoaded);

  /* ---------- navigation ---------- */
  const toggle = $('.menu-toggle'), menu = $('#menu');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) setTimeout(() => $('a', menu).focus({ preventScroll: true }), 100);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); toggle.focus(); } });

  // current section in the nav
  const navLinks = new Map($$('.nav-links a').map(a => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        navLinks.forEach(a => a.removeAttribute('aria-current'));
        const a = navLinks.get(en.target.id); if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'benefits', 'how', 'work', 'showreel', 'experience', 'skills', 'faq', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- scroll reveals, once per element ---------- */
  const reveal = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('in'));

  /* ---------- tagline: words light up in reading order ---------- */
  const tagline = $('#tagline');
  if (tagline && !reduce) {
    const words = [];
    const wrap = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.append(part);
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; words.push(s); frag.append(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') wrap(n);
      });
    };
    wrap(tagline);
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = tagline.getBoundingClientRect(), vh = innerHeight;
      // progress runs from the text entering the lower third to it reaching the upper third
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.4)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------- showreel ---------- */
  const frame = $('#stage-frame'), video = $('#stage-video'), playlist = $('#playlist'), err = $('#video-error');
  let group = 'reels', current = VIDEOS[0];
  document.addEventListener('play', e => $$('video').forEach(v => { if (v !== e.target) v.pause(); }), true);
  video.addEventListener('error', () => err.classList.add('show'));
  video.addEventListener('loadeddata', () => err.classList.remove('show'));
  $('#video-retry').addEventListener('click', () => { err.classList.remove('show'); video.load(); });

  const renderList = () => {
    playlist.innerHTML = VIDEOS.filter(v => v.group === group).map(v => `
      <li><button class="pl-item${v.orient === 'h' ? ' wide' : ''}" type="button" data-key="${v.key}" aria-current="${v.key === current.key}">
        <span class="pl-thumb"><img src="media/${v.key}-thumb.jpg" alt="" loading="lazy"></span>
        <span><span class="title-4" style="display:block">${esc(v.title)}</span><span class="caption-2 muted">${esc(v.format)}, ${esc(v.client)}</span></span>
      </button></li>`).join('');
  };
  const select = (key, autoplay = false) => {
    const v = VIDEOS.find(x => x.key === key); if (!v) return;
    current = v;
    frame.dataset.orient = v.orient;
    err.classList.remove('show');
    video.poster = `media/${v.key}.jpg`;
    video.src = `media/${v.key}.mp4`;
    video.setAttribute('aria-label', `Video: ${v.title}`);
    $('#now-kicker').textContent = `${v.format}, ${v.client}`;
    $('#now-title').textContent = v.title;
    $('#now-desc').textContent = v.desc;
    $$('.pl-item').forEach(b => b.setAttribute('aria-current', b.dataset.key === key));
    if (autoplay) { const p = video.play(); if (p) p.catch(() => {}); }
  };
  const setGroup = g => {
    group = g;
    $$('.tab').forEach(t => {
      const on = t.dataset.group === g;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      if (on) $('#reel-panel').setAttribute('aria-labelledby', t.id);
    });
    current = VIDEOS.find(v => v.group === g);
    renderList(); select(current.key);
  };
  $$('.tab').forEach(t => {
    t.addEventListener('click', () => setGroup(t.dataset.group));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const tabs = $$('.tab'), i = tabs.indexOf(t);
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.focus(); next.click();
    });
  });
  playlist.addEventListener('click', e => { const b = e.target.closest('.pl-item'); if (b) select(b.dataset.key, true); });
  renderList(); select(current.key);

  /* ---------- case study dialog ---------- */
  const dlg = $('#case-dialog');
  const openCase = key => {
    const c = CASES[key]; if (!c) return;
    $('#dlg-title').textContent = c.title;
    $('#dlg-meta').textContent = c.meta;
    let shots = '';
    if (c.shots) shots = `<div class="dlg-shots">${c.shots.map(([src, alt, cap]) => `
      <figure><a href="${src}" target="_blank" rel="noopener" class="media" aria-label="Open full size: ${esc(alt)}"><img src="${src}" alt="${esc(alt)}"></a>
      <figcaption class="caption-2 muted">${esc(cap)} <a class="caption-1" href="${src}" target="_blank" rel="noopener">Open full size</a></figcaption></figure>`).join('')}</div>`;
    if (c.posts) shots = `<div class="dlg-shots posts">${c.posts.map((src, i) => `<div class="media"><img src="${src}" alt="Instagram post ${i + 1} for ${esc(c.title)}"></div>`).join('')}</div>`;
    const block = (h, t) => `<section><h3 class="title-3 accent">${h}</h3><p class="body-6 muted">${esc(t)}</p></section>`;
    $('#dlg-body').innerHTML = `
      <p class="heading-5 accent">${esc(c.outcome)}</p>
      ${shots}
      <div class="dlg-sections">${block('The problem', c.problem)}${block('The strategy', c.strategy)}${block('What I did', c.execution)}${block('The result', c.result)}</div>
      <ul class="tags caption-4">${c.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      ${c.link ? `<p><a class="btn btn-ghost button-md" href="${c.link[0]}" target="_blank" rel="noopener">${esc(c.link[1])} <i class="ph ph-arrow-up-right icon-sm" aria-hidden="true"></i></a></p>` : ''}`;
    $$('#dlg-body .media img').forEach(markLoaded);
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    dlg.scrollTop = 0;
  };
  $$('[data-case]').forEach(b => b.addEventListener('click', () => openCase(b.dataset.case)));
  $('#dlg-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  /* ---------- copy email ---------- */
  const copyBtn = $('#copy-email'), toast = $('#toast');
  copyBtn.addEventListener('click', async () => {
    const email = 'abhisheksvalsan@gmail.com';
    try { await navigator.clipboard.writeText(email); toast.textContent = `Email address copied: ${email}`; }
    catch { toast.textContent = `Copy didn't work in this browser. The address is ${email}`; }
  });
})();
