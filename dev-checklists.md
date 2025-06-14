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

![Image of the spider-man with triggered spider-sense](./assets/spider-sense.jpg)


There are a number of tools we can use to assist in the creation of accessible web applications. 

Here are some common issues that should make your spidey senses go off. My goal is for you to be able to identify these in code reviews and demos.

We want to bring kindness to these situations and not judge people. We also need to identify accessibility issues (ideally) before they ship:

## Keyboard Navigation

By far the easiest and also one of the most important checks is to test if your entire website can be reached and used with the keyboard alone. Do this by:

1. Disconnecting your mouse.
2. Using `Tab` and `Shift+Tab` to browse.
3. Using `Enter` to activate elements.
4. Where required, using your keyboard arrow keys to interact with some elements, such as menus and dropdowns.

::: info

Note that not everything has to be interactive for screen readers (e.g. headings)!

:::

## Increase text size to 200%!

Is the content still readable? Does increasing the text size cause content to overlap?

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


## Don't be a `div` button creator!

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

## Use `prefer-reduce-motion` for your animations!

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


## Accessible Media

Make note of any media in need of [captions](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video), [transcripts](https://www.w3.org/WAI/media/av/transcripts/), and other alternative content.
