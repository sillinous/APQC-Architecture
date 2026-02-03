# APQC Strategic Framework Website

Interactive website showcasing the APQC Process Classification Framework for AI Agent Ecosystems.

## Features

- **Framework Overview**: Interactive exploration of 13 APQC process levels
- **Agent Catalog**: Browse 103 APQC-aligned agents with filtering
- **Workflows**: Pre-built cross-process automation workflows
- **Roadmap**: Strategic implementation roadmap with progress tracking
- **Resources**: Documentation, tools, and external references
- **Contribute**: Guide for adding new agents and workflows

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static files
npm run export
```

## Deployment

### Option 1: Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel: [vercel.com/import](https://vercel.com/import)
3. Deploy automatically

### Option 2: Netlify

1. Push to GitHub
2. Import to Netlify: [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build`
4. Publish directory: `out`

### Option 3: GitHub Pages

1. Update `next.config.js`:
```js
const nextConfig = {
  output: 'export',
  basePath: '/apqc-strategic-framework',
  trailingSlash: true,
}
```

2. Build and deploy:
```bash
npm run build
# Deploy the `out` folder to GitHub Pages
```

### Option 4: Any Static Host

The `npm run build` command generates static files in the `out` directory that can be deployed to any static hosting service:

- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Cloudflare Pages
- Firebase Hosting

## Project Structure

```
apqc-strategic-framework/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page
│   ├── framework/         # APQC framework explorer
│   ├── agents/            # Agent catalog
│   ├── workflows/         # Cross-process workflows
│   ├── roadmap/           # Strategic roadmap
│   ├── resources/         # Documentation & resources
│   └── contribute/        # Contribution guide
├── components/            # Reusable UI components
├── data/                  # APQC data and content
│   ├── apqc-levels.ts    # 13 process levels & agents
│   ├── workflows.ts      # Workflow definitions
│   ├── resources.ts      # Resource links
│   └── roadmap.ts        # Roadmap phases
├── public/               # Static assets
└── lib/                  # Utility functions
```

## Data Sources

This website presents data extracted from the Sillinous multi-repo collection:

- **AGENT_LIBRARY_CATALOG.md**: Master agent inventory
- **ArchitectureHub**: Catalog system
- **AgentOperationsHub**: Agent discovery API
- **AgenticStandardsResearch**: Standards research
- **devops-hub**: Agent factory

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Charts**: Recharts (for visualizations)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Key Statistics

| Metric | Value |
|--------|-------|
| Total Agents | 103 |
| APQC Levels | 13 |
| Implemented Agents | 15 |
| Business Algorithms | 20+ |
| Protocols | 8 |
| Workflows | 6 |

## Contributing

We welcome contributions! See the [Contribute page](/contribute) for:

- Adding new agents
- Creating workflows
- Improving documentation
- Reporting issues

## License

MIT License - See LICENSE file for details.

## Links

- [GitHub Repository](https://github.com/sillinous)
- [APQC Official](https://www.apqc.org)
- [Model Context Protocol](https://modelcontextprotocol.io)
