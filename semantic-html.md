---
outline: "deep"
---

# Semantic HTML

Semantic HTML is the foundation of accessibility in a web application. Using the various HTML elements to reinforce the meaning of information in our websites will often give us accessibility for free.

- [MDN HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

## Use Fragments

Sometimes we break HTML semantics when we add `<div>` elements to our JSX to make our React code work, especially when working with lists (`<ol>`, `<ul>` and `<dl>`) and the HTML `<table>`. In these cases we should rather use [React Fragments](https://legacy.reactjs.org/docs/fragments.html) to group together multiple elements.

For example,

```tsx
import React, { Fragment } from "react";

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

You can map a collection of items to an array of fragments as you would any other type of element as well:

```tsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

When you don’t need any props on the Fragment tag you can use the [short syntax](https://legacy.reactjs.org/docs/fragments.html#short-syntax), if your tooling supports it:

```tsx
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

## Headings Hierarchy

Semantic structure is created with `<h1>`-`<h6>` headings, landmarks such as `<main>`, `<nav>`, `<footer>`, `<section>` (with unique labels), content markup including `<ul>` and `<ol>` lists, and more. These are incredibly important for people who rely on AT to understand the structure of a page.
