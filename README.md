# Notion2Pi

Notion2Pi is a modern web application that makes abstract mathematical formulas more accessible by providing detailed explanations and interactive analysis. The platform allows users to explore mathematical formulas through a unique "7-Vector" analysis system that breaks down each formula into its fundamental components, explaining their roles, domains, geometric interpretations, and mathematical significance.

## What This Project Does

Notion2Pi transforms complex mathematical formulas into understandable components. For example, when you explore the Normal Distribution formula:

```
f(x) = (1/σ√(2π)) * e^(-(x-μ)²/(2σ²))
```

The application breaks it down into clickable components:
- **1/(σ√(2π))** - The normalizing constant that ensures the curve has unit area
- **e^(-(x-μ)²/(2σ²))** - The exponential decay term that creates the bell shape

Each component includes a comprehensive 7-Vector analysis covering:
- **Role**: Mathematical function of the component
- **Domain**: Input/output mathematical spaces
- **Binding**: How variables relate to each other
- **Variance**: How the component changes or varies
- **Geometric**: Geometric interpretation or visualization
- **Invariant**: What remains constant
- **Limits**: Behavior at mathematical extremes
- **Narrative**: Educational explanation of significance

Users can also generate new formula explanations using AI, search through an extensive catalog of mathematical formulas, and explore formulas across different mathematical categories including algebra, calculus, statistics, and geometry.

## Project Structure

```
notion2pi/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   └── formulas/            # Formula-related endpoints
│   ├── browse/                   # Formula catalog page
│   ├── formula/                  # Formula generation and display
│   │   ├── [slug]/              # Dynamic formula pages
│   │   ├── data.ts              # Formula data types
│   │   └── route.ts             # AI formula generation
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # Reusable components
│   ├── formula/                 # Formula-specific components
│   ├── ui/                      # UI components (shadcn/ui)
│   ├── app-footer.tsx           # Shared footer
│   ├── error-boundary.tsx       # Error handling
│   ├── glass-panel.tsx          # Glassmorphism wrapper
│   ├── latex-renderer.tsx       # LaTeX rendering
│   ├── loading-spinner.tsx      # Loading states
│   └── theme-toggle.tsx         # Dark/light mode
├── hooks/                       # Custom React hooks
│   ├── use-api-error.ts         # Error handling
│   ├── use-formulas.ts          # Formula data fetching
│   ├── use-search.ts            # Search functionality
│   └── use-toast.ts             # Toast notifications
├── lib/                         # Utility libraries
│   ├── database.ts              # SQLite database operations
│   ├── database-service.ts      # Database service layer
│   └── utils.ts                 # Utility functions
├── types/                       # TypeScript type definitions
│   └── formula.ts               # Formula-related types
└── formulas.db                  # SQLite database file
```

## How to Run

### Prerequisites

- Node.js 18+ or Bun runtime
- SQLite (included with the project)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notion2pi
```

2. Install dependencies:
```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Initialize the database:
The SQLite database will be automatically created and seeded with sample formulas on first run.

### Development

Start the development server:
```bash
# Using bun
bun run dev

# Or using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build and start the production server:
```bash
# Build the application
bun run build

# Start production server
bun run start
```

## Features

- **AI-Powered Formula Generation**: Generate detailed formula explanations using OpenAI GPT-4
- **Interactive Formula Explorer**: Click on formula components to see detailed analysis
- **7-Vector Analysis System**: Comprehensive mathematical breakdown of each component
- **Formula Catalog**: Browse and search through mathematical formulas
- **LaTeX Rendering**: Beautiful mathematical notation using KaTeX
- **Dark/Light Mode**: Responsive design with theme switching
- **Glassmorphism UI**: Modern, elegant user interface
- **Full-Text Search**: Search formulas by name, category, or LaTeX content
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Framework**: Next.js 13+ with App Router
- **Runtime**: Bun (recommended) or Node.js
- **Database**: SQLite with better-sqlite3
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **UI Components**: shadcn/ui component library
- **Math Rendering**: KaTeX with react-markdown
- **AI Integration**: Vercel AI SDK with OpenAI GPT-4
- **TypeScript**: Full type safety throughout the application

## Author

Mohamed Yassine Hemissi

---

*This README.md was generated by AI.*