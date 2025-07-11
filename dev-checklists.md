---
outline: "deep"
---

<script setup>
  import { registerAll } from '@tapsioss/web-components';

  registerAll();

  const openModal = () => {
    document.getElementById('sample-modal').show();
  };
  const closeModal = () => {
    document.getElementById('sample-modal').hide();
  };
</script>

# Development Checklists

<!-- ![Image of the spider-man with triggered spider-sense](./assets/spider-sense.jpg) -->

There are a number of tools we can use to assist in the creation of accessible web applications.

Here are some common issues that should make your spidey senses go off. My goal is for you to be able to identify these in code reviews and demos.

We want to bring kindness to these situations and not judge people. We also need to identify accessibility issues (ideally) before they ship:

## Use Semantic Structure

Semantic structure is created with `<h1>`-`<h6>` headings, landmarks such as `<main>`, `<nav>`, `<footer>`, `<section>` (with unique labels), content markup including `<ul>` and `<ol>` lists, and more. These are incredibly important for people who rely on AT to understand the structure of a page.

## Keyboard Navigation

By far the easiest and also one of the most important checks is to test if your entire website can be reached and used with the keyboard alone. Do this by:

1. Disconnecting your mouse.
2. Using `Tab` and `Shift+Tab` to browse.
3. Using `Enter` to activate elements.
4. Where required, using your keyboard arrow keys to interact with some elements, such as menus and dropdowns.

::: warning

Users should know which element is currently focused. Do not remove default styles of the focused elements. If you want to change the style of the focus ring, replace the default one with your own outline.

Here are some examples of custom focus rings in [Tapsi design system](https://github.com/Tap30/web-components):

<section aria-hidden="true" style="background: white; border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px;">

<tapsi-button variant="brand">عنوان دکمه</tapsi-button>
<tapsi-rate-slider label="rate-slider"></tapsi-rate-slider>
<tapsi-radio label="radio"></tapsi-radio>
<tapsi-switch label="switch"></tapsi-switch>
<tapsi-checkbox label="checkbox"></tapsi-checkbox>

</section>

:::

## Be aware of nested focuses

Imagine we want to create a linked button:

```html
<a href="#">
  <tapsi-button variant="brand">nevigate somewhere</tapsi-button>
</a>
```

<a href="#">
  <tapsi-button variant="brand">nevigate somewhere</tapsi-button>
</a>

As you see both link and button are focusable, but we want the whole thing be focusable once.

We have 2 options:

1. make the button unfocusable.

```html
<a href="#">
  <tapsi-button tabindex="-1" variant="brand">nevigate somewhere</tapsi-button>
</a>
```

<a href="#">
<tapsi-button tabindex="-1" variant="brand">nevigate somewhere</tapsi-button>
</a>

1. Use only the link and style it like a button

```html
<a href="#" class="button-like-link">nevigate somewhere</a>
<!-- If you are using `@tapsioss/web-components` or `@tapsioss/react-components` package, you can easily pass href to the button componets and use them as links. -->
```

<tapsi-button href="#" variant="brand">nevigate somewhere</tapsi-button>

## Use Skip Links

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

## Modals

Modals are a big one. Anything that opens as a layer on top of other content has accessibility requirements, including:

- Sending focus into the new content when it opens.
- Restoring focus to the element the user was on previously when closing the layer.
- Preventing keyboard and screen reader interaction with elements in the background.
- Using a `dialog` role, focusable and labeled buttons and CTAs.

Non-modal dialogs don’t have all of the same background requirements. But the goal is still to move focus into relevant content when a non-modal dialog opens and closes.

<tapsi-button @click="openModal" variant="brand" id="open-modal-btn">Open a sample modal</tapsi-button>
<tapsi-modal style="z-index: 999" id="sample-modal" heading="a sample modal" description="As you can see. the focus is now on the first focusable element inside the modal.">
  <tapsi-button-group slot="action-bar">
    <tapsi-button @click="closeModal">button 1</tapsi-button>
    <tapsi-button @click="closeModal">button 2</tapsi-button>
  </tapsi-button-group>
</tapsi-modal>

## Don't be a `div` button creator

It’s real easy to add a click event to a `div`. Too easy, in fact. And it happens all the time! the problem is, `div`s are not interactive elements so you have to backfill quite a few things to make them accessible. All the while, you could have just used a `<button>` element and been done with it.

::: details What if we really need to be a `div` button creator?!

First, do the easiest part!

```tsx
const MyComponent = () => {
  const fn = () => {
    console.log("clicked on the div!")
  }

  return (
    <div 
      onClick={fn} // [!code focus]
    >
      click!
    </div>
  )
}
```

Then we set a `role="button"` attribute. based on [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role):

> The button role is for clickable elements that trigger a response when activated by the user. Adding role="button" tells the screen reader the element is a button, but provides no button functionality.

```tsx
const MyComponent = () => {
  const fn = () => {
    console.log("clicked on the div!")
  }

  return (
    <div 
      role="button" // [!code focus]
      onClick={fn}
    >
      click!
    </div>
  )
}
```

Now we need should pass key down event handler for keyboard interaction:

```tsx
const MyComponent = () => {
  const fn = () => {
    console.log("clicked on the div!")
  }

  const handleKeyDown = (e: KeyboardEvent) => { // [!code focus]
    if (e.code === 'Space' || e.code === 'Enter') { // [!code focus]
      fn(); // [!code focus]
    } // [!code focus]
  } // [!code focus]

  return (
    <div 
      role="button"
      onClick={fn}
      onKeyDown={handleKeyDown} // [!code focus]
    >
      click!
    </div>
  )
}
```

We are not done yet! The element can trigger the `fn` function using `Enter` and `Space` keys, but the problem is the element is not focusable and we should bass a `tabIndex` attribute to the `div` element.

```tsx
const MyComponent = () => {
  const fn = () => {
    console.log("clicked on the div!")
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      fn();
    }
  }

  return (
    <div 
      role="button"
      onClick={fn}
      onKeyDown={handleKeyDown}
      tabIndex="0"  // [!code focus]
    >
      click!
    </div>
  )
}
```

**QUESTION**: Wasn't it eassier to use the following approach instead?

```tsx
const MyComponent = () => {
  const fn = () => {
    console.log("clicked on the div!")
  }

  return <button onClick={fn}>click!</div>
}
```

That’s it. No explicit button `role`, no `tabIndex`, no key handler (because buttons will fire from clicks with the keyboard, unlike `div`s)

:::

## Use `prefer-reduce-motion` for your animations

::: danger Warning

An embedded example in this section has a scaling movement that may be problematic for some readers. Readers with [vestibular motion disorders](https://www.a11yproject.com/posts/understanding-vestibular-disorders/) may wish to enable the reduce motion feature on their device before viewing the animation.

:::

The `prefers-reduced-motion` CSS media feature is used to detect if a user has enabled a setting on their device to minimize the amount of non-essential motion. The setting is used to convey to the browser on the device that the user prefers an interface that removes, reduces, or replaces motion-based animations.

Such animations can trigger discomfort for those with vestibular motion disorders. Animations such as scaling or panning large objects can be vestibular motion triggers.

<iframe height="358" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/amir78729/embed/myJmQZR?default-tab=css%2Cresult&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/amir78729/pen/myJmQZR">
  Untitled</a> by Amirhossein Alibakhshi (<a href="https://codepen.io/amir78729">@amir78729</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Straw Testing

Proximity issues can arise when interface elements are designed far apart from one another. This mostly affects people with **low-vision** who rely on zoom software.

What happens when someone uses zoom software is that they only see a small fraction of the screen at once. Usually, the zoomed portion of the screen follows the current position of the mouse pointer or keyboard cursor.

As a result of someone only being able to see a small section at a time, oftentimes when attempting to complete a task, content is difficult to find or may be missed entirely.

How do we test to ensure there are minimal to no proximity issues with our design? One relatively simple and effective method is to perform what's called, "the straw test."

<iframe height="500" style="width: 100%;" scrolling="no" title="Poor Proximity" src="//codepen.io/svinkle/embed/wXNMZr/?height=265&amp;theme-id=0&amp;default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/svinkle/pen/wXNMZr/">Poor Proximity</a> by Scott Vinkle
  (<a href="https://codepen.io/svinkle">@svinkle</a>) on <a href="https://codepen.io">CodePen</a>.
</iframe>

<iframe height="500" style="width: 100%;" scrolling="no" title="Better Proximity" src="//codepen.io/svinkle/embed/LrqNPV/?height=265&amp;theme-id=0&amp;default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/svinkle/pen/LrqNPV/">Better Proximity</a> by Scott Vinkle
  (<a href="https://codepen.io/svinkle">@svinkle</a>) on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Increase text size to 200%

Is the content still readable? Does increasing the text size cause content to overlap?

## Accessible Media

Make note of any media in need of [captions](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video), [transcripts](https://www.w3.org/WAI/media/av/transcripts/), and other alternative content.
