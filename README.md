# Cael Findley — Portfolio

Modern, fast, and accessible portfolio showcasing interactive demos, selected client work, and services. Each demo includes an embedded “View code” panel and a short README so employers can quickly grok the approach.

## ✨ Highlights

- Modern design system (Inter, clean spacing, subtle motion)
- Consistent demo layout (ProjectLayout → Thumb → Reveal → CaseStudy → README)
- History API navigation with clean URLs; Netlify SPA rewrites
- Deterministic demo logic with embedded CodeViewer
- Accessibility & SEO improvements (skip link, meta)

## Technologies Used

### Frontend
- **React** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features
- **Socket.io Client** - Real-time data communication

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure (frontend)

```
src/
  App.jsx                        # App shell, routing, navigation
  components/
    ProjectLayout.jsx            # Sticky TOC + next project + content
    ProjectThumb.jsx             # Lightweight SVG thumbnail
    Reveal.jsx                   # IntersectionObserver reveal
    CaseStudy.jsx                # Overview/Role/Stack/Challenges/Results
    DemoReadme.jsx               # Short problem/approach/highlights panel
    demos/                       # Demo components with embedded CodeViewer
  pages/                         # Demo pages wired to ProjectLayout
public/
  index.html                     # Fonts/meta
  _redirects                     # SPA rewrites
netlify.toml                     # Build and headers
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm start
   # open http://localhost:3000
   ```

The ACF chat assistant is a Netlify Function (`netlify/functions/chat.js`). To exercise the real LLM call path locally, run `netlify dev` instead of `npm start` and set `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY` + `LLM_PROVIDER=openai`) as an environment variable — never commit it. Without a key, the assistant still renders and responds with a friendly fallback message.

## 🧪 Live Demos (in‑app)

Open Projects to explore interactive demos. Each includes a “View code” button and a README panel.

- Object Detection — deterministic overlay algorithm
- Audio Transcription — timestamps & diarization
- E‑commerce Storefront — catalog, cart, totals
- Real‑time Chat — presence via BroadcastChannel
- SaaS Analytics — cohort retention SVG
- 3D Product Configurator — variant switching
- Plus: Smart City, Aquaculture, Resume Analyzer, Whiteboard, Blockchain, etc.

## Project Categories

- **Software Development** - Full-stack applications and systems
- **IT & Infrastructure** - DevOps and infrastructure projects
- **Cybersecurity** - Security tools and implementations
- **AI & Machine Learning** - Intelligent systems and automation
- **Data Analytics** - Business intelligence and reporting
- **DevOps & Infrastructure** - Cloud and deployment solutions
- **Blockchain & Emerging Tech** - Next-generation technologies

## Freelancing Services

Professional services offered:

- **Full-Stack Development** - Complete web applications
- **Security Consulting** - Cybersecurity assessments and implementations
- **Data Analytics** - Business intelligence and reporting solutions

## Design Features

- **Dark Mode** - Easy on the eyes with green and teal accents
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - CSS transitions and micro-interactions
- **Modern UI/UX** - Clean, professional design with excellent usability

## 🔧 Development

### Adding New Projects
1. Add project data to the `projects` object in `App.jsx`
2. Include project details, technologies, and demo links
3. Update navigation categories if needed

### Customizing Styles
- Modify Tailwind classes in `App.jsx`
- Update color scheme in the CSS variables
- Customize animations and transitions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

- **Email**: caelfindley@gmail.com

---

Built with ❤️ by Cael Findley
