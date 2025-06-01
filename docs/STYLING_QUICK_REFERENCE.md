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
// For custom CSS classes - use directly in className
<Card className="transition-all anim-normal hover:shadow-md">
  Content
</Card>

// For @apply in CSS files - use standard Tailwind utilities
.my-component {
  @apply transition-all duration-300;
}

// Fast micro-interaction
<Button className="transition-colors anim-fast">
  Click me
</Button>
```

### Dark Mode First Approach
1. Design components for dark mode first
2. Use semantic color variables that adapt automatically
3. Test in both themes
4. Ensure proper contrast ratios

## Available Components

All components are built with the new color scheme:
- `<ThemeToggle />` - Switch between light/dark modes
- `<StatusBadge />` - Consistent status indicators
- All shadcn/ui components with updated colors

## Testing the Theme

The development server is running at http://localhost:3000
- View the current theme in your browser
- Use the theme toggle to switch between light/dark modes
- All colors automatically adapt to the selected theme

## Next Steps

1. **Customize Components**: Build your features using the new color scheme
2. **Test Accessibility**: Ensure proper contrast ratios in both themes
3. **Extend Colors**: Add project-specific semantic colors if needed
4. **Animation**: Use the custom animation classes for consistent motion

## ✅ Implementation Status

**Status**: ✅ **COMPLETED AND WORKING**

- Development server running successfully at http://localhost:3000
- Nunito Sans font loaded and applied
- Developer-focused color scheme active in both light and dark modes
- Custom animation classes working without conflicts
- All Tailwind CSS utility class issues resolved

## Current Setup Summary

### Font Implementation
- **Google Fonts**: Nunito Sans successfully imported and applied
- **Font Stack**: Nunito Sans with system font fallbacks
- **Performance**: Display=swap for optimal loading

### Color System Status  
- **Light Mode**: Professional green/blue theme active
- **Dark Mode**: Enhanced contrast dark theme active
- **Semantic Colors**: Success, warning, error, info properly configured
- **OKLCH Colors**: Better color accuracy across displays

### Animation System
- **Custom Classes**: `.anim-fast`, `.anim-normal`, `.anim-slow` working
- **No Conflicts**: Renamed from `animate-*` to avoid Tailwind conflicts
- **CSS Variables**: Duration variables properly configured

---

*This quick reference covers the updated Nunito Sans font and developer-focused color scheme implemented on June 1, 2025.*
