---
outline: "deep"
---

# WAI-ARIA

The [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) (WAI-ARIA) document contains techniques for building fully accessible JavaScript widgets and web applications. It defines a set of attributes to help make web content and web applications more accessible to people with disabilities.

Note that all `aria-*` HTML attributes are fully supported in JSX. Whereas most DOM properties and attributes in React are camelCased, these attributes should be hyphen-cased (also known as kebab-case, lisp-case, etc.) as they are in plain HTML:

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

## How should we use these ARIA attributes?

While ARIA attributes are powerful tools for enhancing accessibility, it's important to use them correctly. The primary goal is to provide semantic information to assistive technologies, like screen readers, where native HTML might not be sufficient.

### Prioritize Native HTML Elements

Before resorting to ARIA, always try to use native HTML elements for their built-in semantics and accessibility features. For example, the `<label>` element is the best and preferred way to label form controls:

```html
<label for="nameInput">Name:</label>
<input type="text" id="nameInput" name="name" />
```

Linking a `label` to an input using the `for` attribute (pointing to the input's `id`) is the most robust way to ensure the input is properly labeled.

### When to Use ARIA Attributes

ARIA attributes should be used when native HTML doesn't provide the necessary semantics or when you are building custom widgets that don't have native HTML equivalents. Here are some common ARIA attributes and how to use them, inspired by insights from accessibility specialists:

1.  **`aria-label`**:

    - **Use Case**: Provides an accessible name for an element when there is no visible text label on the screen. This is common for icon buttons (e.g., a search button with only a magnifying glass icon) or other interactive elements where a visible label would be redundant or clunky.
    - **Example (from above)**: `aria-label={labelText}` ensures that even if there's no visible label text directly associated with the input, a screen reader will announce the value of `labelText`.
    - **Important**: The `aria-label` string will be announced by screen readers along with the element's role (e.g., "Search, button" or "Name, edit text").

2.  **`aria-labelledby`**:

    - **Use Case**: Provides an accessible name by referencing the `id`(s) of other elements on the page that serve as the label. This is useful when the labeling text is already present visually but isn't directly associated with the input using a `<label for="...">` tag, or when a label is composed of multiple text elements.
    - **Example**:
      ```tsx
      <div id="billing">Billing Address</div>
      // ... other elements ...
      <label id="streetLabel">Street:</label>
      <input type="text" aria-labelledby="billing streetLabel" />
      ```
      In this case, a screen reader might announce "Billing Address Street: edit text". The referenced IDs are space-separated.

3.  **`aria-describedby`**:

    - **Use Case**: Provides additional, non-essential information or a description for an element. This description is typically announced _after_ the element's label and role. It's useful for instructions, format requirements, or error messages.
    - **Example**:
      ```tsx
      <label for="password">Password:</label>
      <input type="password" id="password" aria-describedby="passwordHint" />
      <p id="passwordHint">Must be at least 8 characters long.</p>
      ```
      A screen reader would first announce the label ("Password, edit text, protected") and then the description ("Must be at least 8 characters long.").
    - **Crucial Note**: `aria-describedby` provides a _description_, not a label. You still need to ensure the element has a proper accessible name via `<label>`, `aria-label`, or `aria-labelledby`.

4.  **`aria-required`**:
    - **Use Case**: Indicates to assistive technologies that user input is required on an element before a form can be submitted.
    - **Example (from above)**: `aria-required="true"` will inform a screen reader user that the input field must be filled. This often complements visual indicators like asterisks.

### What to Avoid

- **`aria-details`**: While it exists to point to more detailed rich content, its screen reader support is currently poor, so it should generally not be relied upon for essential labeling or descriptive information.
- **`aria-description`**: This attribute is not currently part of the official ARIA specification and lacks browser and assistive technology support, making it unusable.

### General Principles

- **Don't override native semantics unless necessary**: If an HTML element already has the correct role, state, or property, you don't need to add ARIA to reiterate it.
- **Test with assistive technologies**: The best way to ensure your ARIA attributes are working correctly is to test your interface using screen readers (e.g., NVDA, JAWS, VoiceOver) and other accessibility tools.

By understanding and correctly applying these ARIA attributes, along with prioritizing native HTML, you can significantly improve the accessibility of your web applications for all users.


