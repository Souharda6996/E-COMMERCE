# Namastey India - React E-commerce Website

A modern, animated e-commerce website built with React and Vite featuring professional product galleries, gender-based filtering, and smooth 3D animations.

## Features

- **Light-themed Animated Background**: Dynamic gradient animation that continuously shifts colors
- **Responsive Design**: Mobile-first approach with responsive grids and layouts
- **Gender-Based Filtering**: Filter products by Men's or Women's collections
- **60 Professional Products**: Across 10 categories (5 for men, 5 for women)
- **3D Card Flip Animation**: Interactive product cards with hover animations
- **Smooth Animations**: Floating blobs in hero section, fade-in effects, and smooth transitions
- **Modern UI Components**: Navbar, Hero section, Products grid, About section

## Tech Stack

- **React** - UI library (JavaScript, JSX)
- **Vite** - Lightning-fast build tool
- **CSS3** - Animations, gradients, and responsive design
- **Unsplash API** - Professional product images

## Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── Navbar.css
│   ├── Hero.js
│   ├── Hero.css
│   ├── Products.js
│   ├── Products.css
│   ├── ProductCard.js
│   ├── ProductCard.css
│   ├── About.js
│   ├── About.css
│   ├── Footer.js
│   └── Footer.css
├── data/
│   └── products.js
├── App.js
├── index.css
└── main.jsx
```

## Installation

1. Navigate to project directory:
```bash
cd e:\Namastey-React
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

## Features Overview

### Navbar
- Fixed navigation with logo and menu
- Hamburger menu for mobile devices
- Smooth scroll to sections

### Hero Section
- Full-screen hero with animated blobs
- Gradient text heading
- Call-to-action button

### Products Section
- Gender-based filtering (All, Men, Women)
- 60 products across 10 categories
- 3D flip card animations on hover
- Professional Unsplash product images

### About Section
- Company information
- Contact details (email, phone, location)
- Hover animations on contact items

## Animation Effects

- **Gradient Background**: 15-second continuous shift through 4 pastel colors
- **Floating Blobs**: Keyframe animations at 15s, 20s, and 18s intervals
- **Card Flip**: 180-degree rotateY transformation on hover
- **Fade In/Up**: Entry animations for text and components
- **Pulse Effects**: Button and text pulse animations

## Customization

### Update Product Data
Edit `src/data/products.js` to modify product information.

### Change Colors
Update CSS gradient colors in component CSS files:
- Primary: `#ff6b6b`
- Secondary: `#4ecdc4`
- Background: Light pastels (`#f8f9fa`, `#e8f4f8`, etc.)

### Modify Animations
Edit `@keyframes` in component CSS files to adjust animation speeds and effects.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with Unsplash URL parameters (`w=500&h=600&fit=crop`)
- Lazy loading ready
- Smooth 60fps animations
- Fixed background prevents reflow

## Future Enhancements

- Shopping cart functionality
- User authentication
- Product reviews and ratings
- Payment gateway integration
- Search functionality
- Wishlist feature

## License

MIT

## Support

For issues or questions, contact: namasteyindia@gmail.com
