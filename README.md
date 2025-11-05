This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies rqequired to run the server:

```bash
npm run install
# or
yarn
# or
pnpm i
# or
bun install
```

Then add the required environment variables:
```bash
# stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<value>
STRIPE_SECRET_KEY=<value>

# emailjs
NEXT_PUBLIC_EMAIL_JS_KEY_PUBLIC_KEY=<value>
NEXT_PUBLIC_CONTACT_SERVICE_ID=<value>
NEXT_PUBLIC_PRIVATE_TRIP_SERVICE_ID=<value>
NEXT_PUBLIC_PRIVATE_TRIP_TEMPLATE_ID=<value>
NEXT_PUBLIC_CONTACT_TEMPLATE_ID=<value>

# contentful
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=<value>
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=<value>
NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN=<value>


# MUX
MUX_TOKEN_ID=<value>
MUX_TOKEN_SECRET=<value>
```

Then run the server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

