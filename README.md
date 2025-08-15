# Multilingual Business Analysis Application

A comprehensive Next.js application for business analytics exercises with support for 14 languages.

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

## 📄 License

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