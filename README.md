# Dating App Assistant Extension

Ember is the dating app. Jump from a profile into a live first-date practice with that person. The phone opens it from the Home Screen. The Boson key stays on your computer.

You need a Mac, Node.js 22.12 or newer, pnpm 10 or newer, and an iPhone with Safari. The Mac has to stay awake while you use the phone.

## Set up

From this folder:

```bash
cd parallel-worlds
pnpm install
cp .env.example .env
```

Open `.env` and set your Boson key:

```bash
BOSON_API_KEY=your-key-here
```

Start the app:

```bash
pnpm dev
```

That runs the API at `http://127.0.0.1:3000` and the app at `http://127.0.0.1:5173`. Ember is the home page. The live date is at `/practice/`.

Check the key before you leave the desk:

```bash
curl http://127.0.0.1:5173/api/health
```

`credentialsConfigured` should be `true`. If you change `.env` later, stop `pnpm dev` and start it again.

## Open it on an iPhone

Safari on an iPhone will not start the microphone over plain HTTP. Use a temporary HTTPS address that points at the app on your Mac.

Install Cloudflare’s tunnel tool once, then start it in a second terminal:

```bash
brew install cloudflared
cloudflared tunnel --url http://127.0.0.1:5173
```

The command prints an `https://….trycloudflare.com` address. That address changes every time you start the tunnel.

On the iPhone:

1. Open that address in Safari.
2. Tap Share, then Add to Home Screen, then Add.
3. Open Ember from the new icon.
4. Open a profile, tap the assistant, then Jump.
5. Tap the microphone and allow the microphone when iOS asks.

The icon is still this website. It fills the screen and launches without the Safari bar. It works only while the Mac, `pnpm dev`, and the tunnel are running. Stop both when you are done. Anyone with the tunnel address can start a live session on your Boson key, so do not share that address.
