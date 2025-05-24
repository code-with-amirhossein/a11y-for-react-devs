import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "A11Y For React Devs",
  description: "A VitePress Site",
  themeConfig: {
    sidebar: [
      {
        items: [
          { text: "WAI-ARIA", link: "/wai-aria" },
          { text: "Semantic HTML", link: "/semantic-html" },
          { text: "Accessible Form", link: "/accessible-forms" },
          { text: "Focus Control", link: "/focus-control" },
          {
            text: "Mouse and Pointer Events",
            link: "/mouse-and-pointer-events",
          },
          { text: "Complex Widgets", link: "/complex-widgets" },
          { text: "Development Checklists", link: "/dev-checklists" },
          { text: "Tools", link: "/tools" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/code-with-amirhossein" },
    ],
  },
});
