# SpectrumGovCon

Marketing website for SpectrumGovCon, the government contracting (GovCon) practice of Spectrum Careers — outsourced and interim back-office staffing for government contractors. Plain HTML/CSS/JS — no build step required.

## Structure

```
index.html       Home
services.html    Services
about.html       About
contact.html     Contact (demo form, no backend yet)
css/styles.css   All site styles
js/main.js       Full-screen nav overlay toggle + demo form handling
```

## Design language

Aligned with sibling sites [spectrumcareers.com](https://www.spectrumcareers.com/) and [govconleaderscircle.com](https://govconleaderscircle.com/): light body, deep-navy (`#031e48`) accent bands for the hero/footer/CTA/nav overlay, a blue accent (`#005587` / `#407ec9`, no orange), Playfair Display for headlines, Open Sans for body copy, and numbered "/ 01" divider-grid sections in place of card shadows — with a full-screen overlay menu (triggered by the "Menu" hamburger) instead of inline nav links.

## Local preview

Open `index.html` directly in a browser, or serve it locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder, then **Save**.
5. GitHub will publish the site at `https://<username>.github.io/SpectrumGovCon/` within a few minutes.

## Next steps

- **Contact form**: currently a front-end demo only. Connect it to a form backend such as [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/products/forms/) to actually receive submissions, or point it at your CRM.
- **Content**: copy is now aligned with SpectrumCareers' real GovCon practice (fractional CFO/Controller, interim staffing, DCAA compliance, Deltek Costpoint/Unanet) and reuses public stats and contact info from spectrumcareers.com/govcon — double-check the phone, email, and address in `contact.html` and the footers are the ones you want published under the SpectrumGovCon domain.
- **Branding**: colors and fonts are defined as CSS variables at the top of `css/styles.css` — update `--primary` and `--bg-dark` to adjust the palette, or swap in a real logo image in place of the "SG" text mark.
- **Custom domain**: if you have one, add a `CNAME` file with your domain and configure DNS per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
