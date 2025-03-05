/**
 * Race3D Color Schema
 *
 * This file provides a comprehensive color schema for the Race3D website
 * to maintain visual continuity between the landing page and showcase.
 */

// Primary Colors
const colors = {
  // Base Colors
  background: {
    primary: "#FAFAFA", // Main background color
    secondary: "#FFFFFF", // Secondary background (cards, sections)
    tertiary: "#F8F5F2", // Tertiary background (subtle accent areas)
  },

  // Text Colors
  text: {
    primary: "#333333", // Primary text color
    secondary: "#666666", // Secondary text color (paragraphs)
    muted: "#8E7F7F", // Muted text (footer, small text)
  },

  // Brand Colors
  brand: {
    primary: "#D8B4A0", // Primary brand color (buttons, accents)
    primaryHover: "#C89F9C", // Primary hover state
    secondary: "#A7BED3", // Secondary brand color (secondary buttons)
    secondaryHover: "#8DABC4", // Secondary hover state
    accent: "#E8D5C4", // Accent color (subtle highlights)
  },

  // UI Elements
  ui: {
    border: "#F0F0F0", // Border color
    input: "#F0F0F0", // Input borders
    focus: "#D8B4A0", // Focus state
    success: "#A7BED3", // Success messages
    error: "#C89F9C", // Error messages
  },

  // Opacity Variants
  opacity: {
    light: "10", // 10% opacity (use as /10)
    medium: "20", // 20% opacity (use as /20)
    high: "40", // 40% opacity (use as /40)
  },
}

/**
 * Usage Guide
 *
 * 1. Background Hierarchy:
 *    - Main page background: background.primary
 *    - Content sections: background.secondary
 *    - Highlighted areas: background.tertiary
 *
 * 2. Text Hierarchy:
 *    - Headings: text.primary
 *    - Body text: text.secondary
 *    - Subtle text: text.muted
 *
 * 3. Brand Colors:
 *    - Primary actions: brand.primary (with brand.primaryHover)
 *    - Secondary actions: brand.secondary (with brand.secondaryHover)
 *    - Decorative elements: brand.accent
 *
 * 4. UI Elements:
 *    - Borders: ui.border
 *    - Form elements: ui.input
 *    - Focus states: ui.focus
 *    - Success/error states: ui.success, ui.error
 *
 * 5. Opacity Usage:
 *    - For subtle backgrounds: ${color}/10
 *    - For medium emphasis: ${color}/20
 *    - For higher emphasis: ${color}/40
 */

// Tailwind CSS Color Palette (for tailwind.config.js)
const tailwindColors = {
  transparent: "transparent",
  current: "currentColor",
  white: "#FFFFFF",
  background: {
    DEFAULT: "#FAFAFA",
    secondary: "#FFFFFF",
    tertiary: "#F8F5F2",
  },
  foreground: {
    DEFAULT: "#333333",
    secondary: "#666666",
    muted: "#8E7F7F",
  },
  primary: {
    DEFAULT: "#D8B4A0",
    hover: "#C89F9C",
    foreground: "#FFFFFF",
    light: "#E8D5C4",
  },
  secondary: {
    DEFAULT: "#A7BED3",
    hover: "#8DABC4",
    foreground: "#FFFFFF",
  },
  border: {
    DEFAULT: "#F0F0F0",
    focus: "#D8B4A0",
  },
  success: "#A7BED3",
  error: "#C89F9C",
}

/**
 * Implementation Guide for Showcase Website
 *
 * 1. Copy the tailwindColors object to your tailwind.config.js
 *
 * 2. For consistency, use the same color naming conventions:
 *    - bg-background, bg-background-secondary, bg-background-tertiary
 *    - text-foreground, text-foreground-secondary, text-foreground-muted
 *    - bg-primary, bg-primary-hover, text-primary-foreground
 *    - bg-secondary, bg-secondary-hover, text-secondary-foreground
 *    - border-border, border-focus
 *
 * 3. For opacity variants, use Tailwind's opacity modifier:
 *    - bg-primary/10 (light)
 *    - bg-primary/20 (medium)
 *    - bg-primary/40 (high)
 *
 * 4. Maintain the same visual hierarchy:
 *    - Use primary colors for main CTAs
 *    - Use secondary colors for less important actions
 *    - Use the same text color hierarchy
 *    - Maintain the same border styles
 */

export default colors

