---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Accessibility"
  text: "for React Developers"
  tagline: 🚧  Work in Progress
  image: 
    src: ./assets/a11y.svg
    alt: accessibility icon
  actions:
    - theme: brand
      text: Get Started!
      link: /intro
---

<style>

.VPImage {
  color: var(--vp-c-brand-1);
  animation: a11y-icon 1s;
  
}

@keyframes a11y-icon {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#author {
  display: flex;
  align-items: center;
}
#author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ffffff;
}
#author .author-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  font-size: 1rem;
  line-height: 1.2;
}
</style>
