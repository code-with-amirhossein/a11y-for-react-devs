---
outline: "deep"
---

<script setup>
import { registerAll } from '@tapsioss/web-components';
registerAll();
</script>

# Focus Control

Ensure that your web application can be fully operated with the keyboard only:

- [WebAIM talks about keyboard accessibility](https://webaim.org/techniques/keyboard/)

## Keyboard focus and focus outline (focus ring)

Keyboard focus refers to the current element in the DOM that is selected to accept input from the keyboard. We see it everywhere as a focus outline similar to that shown in the following image:

[![Blue keyboard focus outline around a selected link.](https://legacy.reactjs.org/static/dec0e6bcc1f882baf76ebc860d4f04e5/4fcfe/keyboard-focus.png)](https://legacy.reactjs.org/static/dec0e6bcc1f882baf76ebc860d4f04e5/4fcfe/keyboard-focus.png)

Only ever use CSS that removes this outline, for example by setting `outline: 0`, if you are replacing it with another focus outline implementation.

Here are some examples of custom focus rings in [Tapsi design system](https://github.com/Tap30/web-components):

<section aria-hidden="true" style="background: white; border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px;">

<tapsi-button variant="brand">عنوان دکمه</tapsi-button>
<tapsi-rate-slider label="rate-slider"></tapsi-rate-slider>
<tapsi-radio label="radio"></tapsi-radio>
<tapsi-switch label="switch"></tapsi-switch>
<tapsi-checkbox label="checkbox"></tapsi-checkbox>

</section>

## Mechanisms to skip to desired content

Provide a mechanism to allow users to skip past navigation sections in your application as this assists and speeds up keyboard navigation.

### Skip Links

On most pages, keyboard and screen reader users must navigate a long list of navigation links and other elements before ever arriving at the main content. This can be particularly difficult for users with some forms of motor disabilities. Consider users with no or limited arm movement who navigate a web page by tapping their heads on a switch or that use a stick in their mouth to press keyboard keys. Requiring users to perform any action numerous times before reaching the main content poses an accessibility barrier.

Of course, sighted people who use their mouse do not have any trouble with web pages like this. They can almost immediately scan over the page and identify where the main content is. Skip navigation links are useful to give screen reader and keyboard users the same capability of navigating directly to the main content.

The idea is simple enough: provide a link at the top of the page that, when activated, jumps the user to the beginning of the main content area.

```html
<body>
  <a href="#main">Skip to main content</a>
  <nav role="navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
  </nav>
  <main id="main">
    <!-- page specific content -->
  </main>
</body>
```

### Landmark Elements

Check [Semantic HTML: Landmark Elements](/semantic-html#landmark-elements)
<!-- 
## Programmatically managing focus

Our React applications continuously modify the HTML DOM during runtime, sometimes leading to keyboard focus being lost or set to an unexpected element. In order to repair this, we need to programmatically nudge the keyboard focus in the right direction. For example, by resetting keyboard focus to a button that opened a modal window after that modal window is closed.

MDN Web Docs takes a look at this and describes how we can build [keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

To set focus in React, we can use [Refs to DOM elements](https://legacy.reactjs.org/docs/refs-and-the-dom.html).

Using this, we first create a ref to an element in the JSX of a component class:

```tsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Create a ref to store the textInput DOM element    this.textInput = React.createRef();  }
  render() {
  // Use the `ref` callback to store a reference to the text input DOM  // element in an instance field (for example, this.textInput).    return (
      <input
        type="text"
        ref={this.textInput}      />
    );
  }
}
```

Then we can focus it elsewhere in our component when needed:

```tsx
focus() {
  // Explicitly focus the text input using the raw DOM API
  // Note: we're accessing "current" to get the DOM node
  this.textInput.current.focus();
}
```

Sometimes a parent component needs to set focus to an element in a child component. We can do this by [exposing DOM refs to parent components](https://legacy.reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) through a special prop on the child component that forwards the parent’s ref to the child’s DOM node.

```tsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />{" "}
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return <CustomTextInput inputRef={this.inputElement} />;
  }
}

// Now you can set focus when required.
this.inputElement.current.focus();
```

When using a [HOC](https://legacy.reactjs.org/docs/higher-order-components.html) to extend components, it is recommended to [forward the ref](https://legacy.reactjs.org/docs/forwarding-refs.html) to the wrapped component using the `forwardRef` function of React. If a third party HOC does not implement ref forwarding, the above pattern can still be used as a fallback.

A great focus management example is the [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). This is a relatively rare example of a fully accessible modal window. Not only does it set initial focus on the cancel button (preventing the keyboard user from accidentally activating the success action) and trap keyboard focus inside the modal, it also resets focus back to the element that initially triggered the modal.

::: warning
While this is a very important accessibility feature, it is also a technique that should be used judiciously. Use it to repair the keyboard focus flow when it is disturbed, not to try and anticipate how users want to use applications.
::: -->
