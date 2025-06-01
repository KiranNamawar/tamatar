# Tamatar Styling Quick Reference

## Font Family

- **Primary Font**: Nunito Sans (Google Fonts)
- **Fallback**: System font stack for optimal performance
- **Usage**: Automatically applied via CSS variables

## Color Scheme Overview

### Light Mode Theme

- **Primary**: Green (#22c55e) - Represents growth and progress
- **Accent**: Blue (#3b82f6) - Tech-focused, professional
- **Background**: Clean whites and light grays
- **Text**: Professional dark grays for readability

### Dark Mode Theme

- **Primary**: Brighter green (#4ade80) - Better visibility in dark mode
- **Accent**: Lighter blue (#60a5fa) - Maintains contrast
- **Background**: Modern dark grays and blacks
- **Text**: Light colors optimized for dark backgrounds

### Semantic Colors

- **Success**: Green tones (completion, achievements)
- **Warning**: Amber tones (caution, pending actions)
- **Error/Destructive**: Red tones (errors, deletion)
- **Info**: Blue tones (information, neutral states)

## Animation Durations

Use these custom CSS classes for consistent animations:

```css
.anim-fast     /* 150ms - micro-interactions */
.anim-normal   /* 250ms - standard transitions */
.anim-slow     /* 400ms - major state changes */
```

## Quick Usage Examples

### Using Color Variables

```tsx
// Good - semantic colors
<div className="bg-card text-card-foreground">
  <h3 className="text-foreground">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>

// Avoid - hardcoded colors
<div className="bg-white dark:bg-gray-800">
```

### Using Animation Classes

```tsx
// Interactive button with consistent timing
<Button className="anim-fast hover:scale-105">
  Click me
</Button>

// Modal with standard transition
<Dialog className="anim-normal">
  Modal content
</Dialog>

// Major page transition
<PageWrapper className="anim-slow">
  Page content
</PageWrapper>
```

## Theme Implementation

### Dark Mode First Approach

1. Design components for dark mode first
2. Ensure proper contrast ratios
3. Test with light mode as secondary
4. Use semantic color variables throughout

### Theme Components

- `<ThemeToggle />` - Switch between light/dark modes
- Built-in theme persistence via localStorage
- Smooth transitions between theme changes

### Testing Your Theme

- Visit <http://localhost:3000> and toggle themes
- View the current theme in your browser's dev tools
- Check component states in both themes

## Implementation Status

### Current Features

- ✅ OKLCH color space implementation
- ✅ Complete dark/light mode support
- ✅ Custom animation duration variables
- ✅ Semantic color system
- ✅ Google Fonts integration
- ✅ Theme toggle functionality
- ✅ Responsive design system

### View the Showcase

Visit <http://localhost:3000> to see the complete styling system in action.

## Technical Details

### Font Implementation

- **Google Fonts**: Nunito Sans loaded via app.html
- **Optimization**: Font-display: swap for performance
- **Fallbacks**: Comprehensive system font stack

### Color System Status

- **Light Mode**: Professional, clean aesthetic
- **Dark Mode**: Modern, eye-friendly design
- **Semantic Variables**: Consistent meaning across themes
- **OKLCH Color Space**: Perceptually uniform colors

### Animation System

- **Custom Classes**: `.anim-fast`, `.anim-normal`, `.anim-slow`
- **Hardware Acceleration**: GPU-optimized transitions
- **Reduced Motion**: Respects user accessibility preferences
- **Performance**: Optimized for 60fps animations
