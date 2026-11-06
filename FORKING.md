# Start Your Own Journey

Use this Hugo site as a template or fork to create a tour site for your own community. Replace the sample identity, data, and links with your own; the steps below cover setup and publishing.

## 1. Create your copy

Choose **Use this template** on GitHub (or fork this repository), then name the new repository.

## 2. Turn on Pages

In **Settings → Pages**, set **Source** to **GitHub Actions**. Do not choose **Deploy from a branch**: GitHub's Jekyll build can overwrite the Hugo site.

## 3. Edit `hugo.toml`

Set `baseURL` to `https://<user>.github.io/<repo>/` (including the trailing slash), or to your custom domain. The workflow uses this value as-is, so links and previews will break if you leave Luiz's domain in place.

Update `title` and every `[params]` key for your site: `description`, `goal`, `repo`, `name`, `firstName`, `email`, `kicker`, and `lede`.

## 4. Replace the data

- `data/journey.yaml` — each stop, including its date, JUG, location, topic, guests, link, and status. You can start with an empty journey.
- `data/talks.yaml` — talk titles and abstracts; the first entry is the main talk.
- `data/ports.yaml` — one line per JUG city with coordinates, used for map pins.
- `data/guests.yaml` — host and guests; a `github:` handle is used for the avatar.
- `data/links.yaml` — resources and contact links.

## 5. Update the issue forms

In `.github/ISSUE_TEMPLATE/*.yml`, replace the name "Luiz", the email `luiz@luizreal.com`, and the site URL `80jugs.thecommunity.dev` with your own. Make the topic dropdown match your talks.

Create the `jug-invitation` and `guest-proposal` labels with:

```sh
gh label create jug-invitation
gh label create guest-proposal
```

Or add them through **Issues → Labels**.

## 6. Update the images

Replace `static/og-image.jpg` (1200×630, used for link previews) and `static/favicon.svg`.

`branding/og-card.html` is the source card. Edit its text, then render it with:

```sh
google-chrome --headless --screenshot=og.png --window-size=1200,630 branding/og-card.html
```

For the GitHub social preview, render at 1280×640 and upload the image under **Settings → General → Social preview**.

## 7. Rewrite the README

Rewrite the README for your journey. Its progress counter and tables are updated by hand.

## 8. Update the About section

Set the repository description, website, and topics. Tick **Use your GitHub Pages website**.

## 9. Optional: add a custom domain

Add a CNAME DNS record pointing to `<user>.github.io`, set the domain in **Settings → Pages**, update `baseURL`, and then enable **Enforce HTTPS**. If Cloudflare proxies the domain, turn on **SSL/TLS → Edge Certificates → Always Use HTTPS** instead.

## 10. Preview locally

Run `hugo server`, then open http://localhost:1313/.

## 11. Keep the credit

Keep the MIT license notice. A link back to https://github.com/lgsreal/around-the-world-in-80-jugs is appreciated but optional.
