<<<<<<< HEAD
# SRL Logistics & Holdings — Website

A modern, user-friendly business website showcasing four core service areas:

1. **Logistics & Transportation** — Freight, fleet management, and supply chain solutions
2. **Server Hosting & Cloud Solutions** — Managed hosting, cloud migration, and infrastructure
3. **Email Hosting & Domain Management** — Business email, domains, DNS, and security
4. **Software & Database Development** — Custom apps, APIs, and database solutions

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser after running `npm run dev`.

## Project Structure

```
src/
├── components/     # Navbar, Footer, Layout, ContactForm, ServiceCard
├── data/           # Service content and testimonials
├── pages/          # Home, About, Contact, and service pages
├── App.jsx         # Route definitions
└── main.jsx        # App entry point
```

## Customization

- **Contact details**: Update email, phone, and address in `src/components/Footer.jsx` and `src/pages/Contact.jsx`
- **Service content**: Edit features and descriptions in `src/data/services.js`
- **Branding colors**: Adjust the brand palette in `src/index.css` under `@theme`
- **Photos & backgrounds**: Replace images in `public/images/` (see `public/images/README.md`) or edit paths in `src/data/images.js`

## Deployment

After running `npm run build`, deploy the `dist/` folder to any static host:

- **Netlify** — Drag and drop the `dist` folder, or connect your Git repo
- **Vercel** — Import the project; Vite is detected automatically
- **Shared hosting** — Upload `dist/` contents via FTP/cPanel

For client-side routing (React Router), configure your host to redirect all routes to `index.html`.

## Contact Form

The contact form currently shows a success message on submit. To receive real submissions, connect it to:

- [Formspree](https://formspree.io)
- [EmailJS](https://www.emailjs.com)
- Your own backend API

## Tech Stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)
=======
# srllogisticsandholdingswebsite
Official SRL Logistics and Holdings Website
>>>>>>> 1c48eda6f8270261a7fddae199ada0496cebf50c
