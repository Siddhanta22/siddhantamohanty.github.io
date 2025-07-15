# Siddhanta Mohanty - Portfolio

A modern, responsive portfolio website showcasing my work in AI, Machine Learning, and software development. Built with React, Tailwind CSS, and Framer Motion for smooth animations and interactions.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **Interactive Elements**: Hover effects, micro-interactions, and smooth scrolling
- **SEO Optimized**: Meta tags, Open Graph, and proper semantic HTML
- **Fast Performance**: Optimized for speed and performance
- **Accessible**: WCAG compliant with proper ARIA labels

## 🚀 Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📋 Sections

1. **Hero**: Engaging introduction with call-to-action buttons
2. **About**: Personal story, education, and background
3. **Projects**: Showcase of key projects with detailed descriptions
4. **Experience**: Professional experience and achievements
5. **Skills**: Technical skills with proficiency levels
6. **Contact**: Contact form and social links

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddhantamohanty/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## 🚀 Deployment to GitHub Pages

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Install gh-pages package** (if not already installed)
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create a new repository** on GitHub named `siddhantamohanty.github.io`

3. **Push the build folder**
   ```bash
   cd build
   git init
   git add .
   git commit -m "Deploy portfolio"
   git remote add origin https://github.com/siddhantamohanty/siddhantamohanty.github.io.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

Your portfolio will be available at `https://siddhantamohanty.github.io`

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Projects.js
│   │   ├── Experience.js
│   │   ├── Skills.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary colors: Blue gradient
- Accent colors: Purple gradient
- Dark mode colors: Custom dark palette

### Content
Update the content in each component file:
- Personal information in `Hero.js`
- About section in `About.js`
- Projects in `Projects.js`
- Experience in `Experience.js`
- Skills in `Skills.js`
- Contact information in `Contact.js`

### Styling
- Global styles in `src/index.css`
- Component-specific styles using Tailwind classes
- Custom animations in `tailwind.config.js`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Performance Optimization

- Lazy loading of components
- Optimized images and assets
- Minified CSS and JavaScript
- Efficient animations
- Proper caching headers

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: siddhantamohanty22@gmail.com
- **LinkedIn**: [Siddhanta Mohanty](https://linkedin.com/in/siddhanta-mohanty-13aa92222)
- **GitHub**: [siddhantamohanty](https://github.com/siddhantamohanty)

---

Made with ❤️ by Siddhanta Mohanty 