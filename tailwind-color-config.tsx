const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        // Base colors
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

        // Brand colors
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

        // UI colors
        border: {
          DEFAULT: "#F0F0F0",
          focus: "#D8B4A0",
        },
        success: "#A7BED3",
        error: "#C89F9C",
      },
    },
  },
}

/**
 * CSS Variables Implementation
 *
 * If you prefer using CSS variables, here's how to implement them in your globals.css:
 *
 * :root {
 *   --background: #FAFAFA;
 *   --background-secondary: #FFFFFF;
 *   --background-tertiary: #F8F5F2;
 *
 *   --foreground: #333333;
 *   --foreground-secondary: #666666;
 *   --foreground-muted: #8E7F7F;
 *
 *   --primary: #D8B4A0;
 *   --primary-hover: #C89F9C;
 *   --primary-foreground: #FFFFFF;
 *   --primary-light: #E8D5C4;
 *
 *   --secondary: #A7BED3;
 *   --secondary-hover: #8DABC4;
 *   --secondary-foreground: #FFFFFF;
 *
 *   --border: #F0F0F0;
 *   --border-focus: #D8B4A0;
 *
 *   --success: #A7BED3;
 *   --error: #C89F9C;
 * }
 */

export default tailwindConfig

