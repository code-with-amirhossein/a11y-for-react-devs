import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "A11Y For React Devs",
  description: "A VitePress Site",
  base: "/a11y-for-react-devs/",
  themeConfig: {
    sidebar: [
      {
        items: [
          { text: "Introduction", link: "/intro" },
          { text: "WAI-ARIA", link: "/wai-aria" },
          // { text: "Semantic HTML", link: "/semantic-html" },
          // { text: "Accessible Form", link: "/accessible-forms" },
          { text: "Visibility Methods", link: "/visibility-methods" },
          // { text: "Accessible Multimedia", link: "/multimedia" },
          // { text: "Focus Control", link: "/focus-control" },
          // {
          //   text: "Mouse and Pointer Events",
          //   link: "/mouse-and-pointer-events",
          // },
          { text: "Complex Widgets", link: "/complex-widgets" },
          { text: "Tools", link: "/tools" },
          { text: "Development Checklists", link: "/dev-checklists" },
          { text: "Exercise", link: "/exercise" },
          { text: "References", link: "/references" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/code-with-amirhossein" },
    ],
    footer: {
      message: 'Created with <span class="heart">♥️</span> by <a href="https://github.com/amir78729" target="_blank">Amirhossein</a>',
    },
  },
});
