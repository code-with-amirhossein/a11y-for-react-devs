<script setup>
if (typeof window !== 'undefined') {
    import('./components/visibility-widget.ts')
}

</script>

# Visibility Methods

When building and debugging UIs, there are some techniques to rendering content visible, visibly hidden, or fully hidden that you must know! These techniques could make a difference in whether something is accessible.

## `.visually-hidden` or `.sr-only` CSS classes

The custom CSS classes we often include in projects such as `.visually-hidden` or `.sr-only` exist so we can include content that isn’t visible but is still read aloud in a screen reader. The modern versions of these classes accomplish this by using a combination of properties such as absolute positioning, clip, negative margins, `overflow: hidden`, and more.

Here is the `.sr-only` utility from [Tailwind](https://tailwindcss.com/docs/screen-readers):

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

<visibility-widget option-name=".sr-only" classes-to-toggle="sr-only"></visibility-widget>

## `display: none` in CSS

CSS `display: none` will hide content from everyone: keyboard users, screen reader users, sighted mouse users, and all. The space normally taken up by `display: none` elements will collapse.

```css
.custom-dropdown-panel {
    display: none;
}
.custom-dropdown-panel.active {
    display: flex;
}
```

The `display: none` is a critical UI tool to understand and use. It will cancel out any `flex`, `grid`, or `block` display properties, though, which is a thing to consider. Display is not animatable without keyframe animations.

<visibility-widget option-name="display: none" classes-to-toggle="hidden"></visibility-widget>

## `visibility: hidden` in CSS

Like `display: none`, CSS `visibility: hidden` will render something invisible. It will also hide it from keyboards and screen readers. But it will also reserve the visual space. Visibility is not animatable without keyframe animations.

```html
<div style="visibility: hidden;">test</div>
```

<visibility-widget option-name="visibility: hidden" classes-to-toggle="invisible"></visibility-widget>

## `opacity: 0` in CSS

`Opacity` is different from display and visibility in that it will render something invisible visually but keep it accessible to keyboards and screen readers. It is animatable.

```html
<div style="opacity: 0;">

</div>
```

<visibility-widget option-name="opacity: 0" classes-to-toggle="opacity-0"></visibility-widget>

## `aria-hidden`

No ARIA attributes will affect the display or keyboard accessibility of an element. But `aria-hidden` will impact screen readers. This can be tricky, since the effect of `aria-hidden` isn’t obvious to teams.

```html
<div aria-hidden="true">
    <h1>This heading will be hidden from screen readers</h1>
    <button>This button will still be focusable without `tabIndex="-1"`</button>
</div>
```

<visibility-widget option-name='aria-hidden="true"' attribute-to-toggle="aria-hidden"></visibility-widget>

## `hidden` attribute in HTML

Built-in to HTML is the `hidden` attribute. It will effectively render an element with `display: none`, so it has the same effects as a CSS class with `display: none` in it. `[hidden]` can be overridden with custom CSS.

```html
<div hidden>
    <button>This button is hidden also</button>
</div>
```

<visibility-widget option-name='hidden' attribute-to-toggle="hidden"></visibility-widget>
