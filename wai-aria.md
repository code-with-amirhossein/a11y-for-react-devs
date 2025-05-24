---
outline: "deep"
---

# WAI-ARIA

The [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) document contains techniques for building fully accessible JavaScript widgets.

Note that all `aria-*` HTML attributes are fully supported in JSX. Whereas most DOM properties and attributes in React are camelCased, these attributes should be hyphen-cased (also known as kebab-case, lisp-case, etc) as they are in plain HTML:

```tsx
<input
  type="text"
  aria-label={labelText} // [!code highlight]
  aria-required="true" // [!code highlight]
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```
