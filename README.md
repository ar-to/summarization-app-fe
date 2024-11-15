# Summarization APP Frontend
![GitHub package.json version](https://img.shields.io/github/package-json/v/ar-to/strapi-backend)
![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/ar-to/summarization-app-fe/next)
![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/ar-to/summarization-app-fe/%40google%2Fgenerative-ai)
![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/ar-to/summarization-app-fe/react)



<img width="1001" alt="Screenshot 2024-11-14 at 5 11 53 PM" src="https://github.com/user-attachments/assets/b318f0f8-6ae5-41fc-be86-e682cb6442b5">


<img width="925" alt="Screenshot 2024-11-14 at 5 04 46 PM" src="https://github.com/user-attachments/assets/6365b912-8d3a-4df0-a582-556f55a2c75d">


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

Use npm or [pnpm](https://pnpm.io/cli/add), the latter may be better for installing packages.

Setup, Run backend via https://github.com/ar-to/strapi-backend or use deployed version from Railway.app.

```shell
pnpm install
#.env
touch .env.local
echo "API_KEY=@https://aistudio.google.com/app/apikey" >> .env.local
echo "NEXT_PUBLIC_STRAPI_URL=from_backend" >> .env.local
```

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
