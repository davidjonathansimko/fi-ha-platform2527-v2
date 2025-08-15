# FI-HA Platform - Multilingual Business Analytics with Authentication

A comprehensive Next.js application for business analytics exercises with support for 14 languages and Supabase authentication.

## 🔐 Authentication Features

- **Supabase Authentication**: Secure user registration and login
- **GitHub OAuth Integration**: One-click GitHub login
- **Email/Password Authentication**: Traditional email signup/signin
- **Magic Link Support**: Passwordless email authentication
- **User Profile Management**: Avatar, user info, and logout functionality
- **Session Management**: Persistent authentication across page reloads

## 🚀 Quick Setup

### 1. Clone and Install
```bash
git clone https://github.com/davidjonathansimko/fi-ha-platform2527.git
cd fi-ha-platform2527
npm install
```

### 2. Supabase Setup
1. Create a project at [Supabase](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`
3. Add your Supabase URL and key to `.env.local`

### 3. Run Development Server
```bash
npm run dev
```

## 🌍 Languages Supported

- 🇩🇪 German (Deutsch)
- 🇬🇧 English
- 🇹🇷 Turkish (Türkçe)
- 🇷🇴 Romanian (Română)
- 🇸🇾 Syrian Arabic (العربية السورية)
- 🇸🇦 Arabic (العربية)
- 🇷🇺 Russian (Русский)
- 🇵🇱 Polish (Polski)
- 🇦🇹 Austrian German (Österreichisches Deutsch)
- 🇨🇭 Swiss German (Schweizerdeutsch)
- 🇳🇱 Dutch (Nederlands)
- 🇨🇿 Czech (Čeština)
- 🇸🇰 Slovak (Slovenčina)
- 🇲🇩 Moldovan (Moldovenească)

## 🎯 Features

### Exercise 1: Market Share Analysis (Sirius AG)
- Calculate market share percentages
- Analyze trends over multiple semesters
- Step-by-step calculation explanations
- Interactive data visualization

### Exercise 2: Customer Survey Evaluation
- School grading system (1-6 scale)
- Statistical analysis of customer ratings
- Performance metrics across multiple criteria
- Comprehensive result interpretation

## 🛠️ Technical Stack

- **Framework:** Next.js 15.4.6
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.0
- **UI Components:** React 19.1.0
- **Theme Support:** Light/Dark/System modes
- **Responsive Design:** Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/davidjonathansimko/multilingual-business-analysis.git

# Navigate to project directory
cd multilingual-business-analysis

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🌐 Translation System

The application features a comprehensive type-safe translation system:

- **Complete Coverage:** All UI elements, business terms, and educational content
- **Fallback System:** Smart English fallback prevents missing translations
- **Type Safety:** TypeScript ensures translation key consistency
- **Performance:** Efficient translation loading and caching

## 📊 Business Analytics Features

### Market Share Analysis
- Revenue data processing
- Percentage calculations
- Trend analysis over time periods
- Growth rate calculations
- Business interpretation guidance

### Customer Survey Analytics
- Multi-criteria evaluation system
- Statistical aggregation
- Performance categorization
- Ecological aspects assessment
- Comprehensive reporting

## 🎨 UI/UX Features

- **Responsive Design:** Works on desktop, tablet, and mobile
- **Theme Support:** Light, dark, and system preference modes
- **Accessibility:** WCAG compliant design principles
- **Interactive Elements:** Progressive disclosure of information
- **Professional Styling:** Clean, modern business application design

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Landing page with exercise selection
│   ├── SiriusMarketShare.tsx   # Original market share component
│   └── SiriusMarketShareClean.tsx # Enhanced multilingual component
├── components/                 # Reusable UI components
└── styles/                    # Global styles and Tailwind config
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Deploy with default Next.js settings
3. Automatic deployments on git push

### Other Platforms
The application supports deployment on:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## � Supabase Authentication Setup

### Step 1: Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project setup to complete

### Step 2: Get Credentials
1. In Supabase dashboard → **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**

### Step 3: Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Update with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: GitHub OAuth (Optional)
1. In Supabase → **Authentication** → **Providers** → Enable GitHub
2. Create GitHub OAuth App:
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `https://your-project.supabase.co/auth/v1/callback`
3. Add GitHub Client ID & Secret to Supabase

### Step 5: Configure URLs
In Supabase → **Authentication** → **Settings**:
- **Site URL**: `http://localhost:3000` (dev) or your production URL
- **Redirect URLs**: Add `http://localhost:3000/auth/callback`

## �📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ using Next.js and TypeScript**



# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/davidjonathansimko/multilingual-business-analysis.git
git branch -M main
git push -u origin main