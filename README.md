# Cael Findley - Portfolio

A modern, responsive portfolio website showcasing full-stack development projects, live demos, and professional services.

## Features

- **Dark Mode Design** - Modern dark theme with green and teal accents
- **Interactive Live Demos** - Real-time data visualization and project demonstrations
- **Comprehensive Project Showcase** - Detailed project descriptions with technical specifications
- **Freelancing Services** - Professional service offerings with pricing
- **Responsive Design** - Optimized for all devices and screen sizes
- **Search & Filter** - Easy navigation through projects and categories

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

## 📁 Project Structure

```
Portfolio/
├── App.jsx                 # Main React application
├── index.html             # HTML entry point
├── backend/               # Node.js backend server
│   ├── server.js         # Express server setup
│   ├── package.json      # Backend dependencies
│   └── ...
├── README.md             # Project documentation
└── .gitignore           # Git ignore rules
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:4000`

4. **Open the frontend**
   - Open `index.html` in your browser, or
   - Serve it with a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

## Live Demos

The portfolio includes several interactive live demos:

- **Aquaculture Tracking System** - Real-time sensor data visualization
- **Cloud Migration Toolset** - Migration simulation and planning
- **IT Helpdesk Portal** - Ticket management system
- **Network Vulnerability Scanner** - Security scanning interface
- **Zero Trust Authentication** - Multi-factor authentication demo
- **Customer Chatbot** - AI-powered customer service
- **Predictive Maintenance AI** - Equipment monitoring dashboard
- **Sales Forecasting Model** - Data analysis and predictions
- **Environmental Impact Dashboard** - Sustainability metrics

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

## Contact

- **Email**: findleytechs@gmail.com

---

Built with passion by Cael Findley 
