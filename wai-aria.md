---
outline: "deep"
---

# WAI-ARIA

The [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) (WAI-ARIA) document contains techniques for building fully accessible JavaScript widgets and web applications. It defines a set of attributes to help make web content and web applications more accessible to people with disabilities.


## `aria-label`

`aria-label` overrides an element's name, replacing it with text that you specify. For instance, consider the following button:

```html
<button aria-label="Close">
	×
</button>
```
By default, the button's name would have been `"×"`. However, `×` is meant to be a multiplication symbol, and screenreaders will announce it as such. That means that, while this might be a visually appealing close button, it won't be super useful or descriptive for disabled users who rely on assistive technology. To remedy this, we put `aria-label="Close"` on the button. The button's name is now "Close," which is much more descriptive and intuitive.

## `aria-labelledby`

`aria-labelledby` also overrides an element's name, replacing it with the contents of another element. `aria-labelledby` is set to the id of another element whose contents make up a useful name. 

::: info

You can think of it as kind of like a generalized version of the `<label>` element's `for` attribute (or `htmlFor` in React). 


```tsx
<label htmlFor="age">Age</label>
<input id="age" />
```

:::


This is useful when you already have another element that serves as a visual label for something. By linking the two elements with `aria-labelledby` like this, we ensure that we only have to update content in one place and our accessible name updates automatically.

One handy use case for aria-labelledby is labelling sections. When sections are labelled, screenreader users can skim through them like a table of contents, using them to skip to sections of the page they care about. Usually, these sections already have a heading element that can serve as a nice, convenient label!


```tsx
<section aria-labelledby="intro-heading">
	<h2 id="intro-heading">
		Introduction
	</h2>
	<p> ... </p>
</section>
```

`aria-labelledby` shares many of the same caveats as `aria-label` such as compatible elements and user expectations. Additionally, `aria-labelledby` will supercede `aria-label` if both attributes are provided.

## `aria-describedby`

`aria-describedby` sets an element's description to the contents of another element. Like `aria-labelledby`, `aria-describedby` takes an id. Descriptions are helpful for providing longer-form, supplemental information about an interface control that should probably be exposed along with the rest of the element, but which wouldn't make sense as part of the element's name.

We could, for instance, use `aria-describedby` to link an input with an element that provides further details about the input's expected format:

```tsx
<form>
	<label htmlFor="username">Username</label>
	<input id="username" type="text" aria-describedby="format" />
	<p id="format">
		Username may contain alphanumeric characters.
	</p>
</form>
```

The above input will have the name "Username" (given to it by its `<label>`) and the description "Username may contain alphanumeric characters." That means that while assistive technologies will call the input field "Username," when the user actually navigates to the field, they'll be informed of both its name and the expected format. Nifty.

Because descriptions are supplemental, they may not be exposed to the user in every navigation mode. This is a great thing, because it reduces clutter! For instance, many screenreader users will skim through a whole form to find out which fields are available before filling it out, but they wouldn't need your descriptions until they start filling out each field. However, this does mean you should go in with the assumption that your provided description might not be guaranteed.

::: details Providing Multiple IDs

Should you need, both `aria-labelledby` and `aria-describedby` support passing multiple IDs. When assembling the element's name or description from multiple elements, the browser will concatenate each element's contents into one big string.

Expanding on our username field example from earlier...


```tsx
<form>
	<label for="username">Username</label>
	<input id="username" type="text" aria-describedby="length format" />
	<p id="length">
		Username must be 6 to 15 characters.
	</p>
	<p id="format">
		Username may contain alphanumeric characters.
	</p>
</form>
```

Our input's full description now reads **"Username must be 6 to 15 characters. Username may contain alphanumeric characters."**.


:::

## Hidden Labels and Descriptions 

`aria-labelledby` and `aria-describedby` interact with a few other attributes—namely, hidden or `aria-hidden—in` an interesting way. In an ideal, 100% compatible world, when you set hidden or `aria-hidden`="true" on an element, that element won't be exposed to assistive technology so, for instance, screenreaders won't announce it. But what happens if you use a hidden element's id in another element's `aria-labelledby` or `aria-describedby`?

What happens is kind of cool—the hidden element stays hidden, but its contents populate the other element's name or description anyways! You might not use this with `aria-labelledby` because using `aria-label` is probably easier in these cases. Where this comes in handy, though, is with descriptions.

::: danger Don't Use `aria-description`!

Currently, there isn't an `aria-description` attribute yet, though this attribute is on its way. Until it arrives and is widely supported by browsers and assistive technology alike, however, the only way to set an element's description is to introduce another DOM node to the page using `aria-describedby`. By default, this means that you have a new node that assistive technology could expose independently of the labelled/described element. In other words, you could be introducing potentially confusing clutter. We could place an `aria-hidden` on our description to minimize that misleading clutter.

:::

Here's an example!

```tsx
<table>
	<thead>
		<tr>
			<th role="columnheader" scope="col" aria-sort="none">
				<button aria-describedby="sort-description">
					<svg><!-- some sort icon --></svg>
					Name
				</button>
			</th>
			<th> ... </th>
		</tr>
	</thead>
	<tbody>
		...
	</tbody>
</table>

<p id="sort-description" hidden>
	Sort this table alphabetically by name.
</p>
```

In this example, we have a table whose column headers have buttons that will sort the table. That sorting behavior is made evident for sighted users with some recognizable sort icon, but blind users wouldn't get any cues to the buttons' functionality. To compensate, we give the button a description using aria-describedby, pointing to a `<p>` tag outside of the table. We wouldn't want users to navigate to the `<p>` on its own, however, so we apply hidden to it. Now our sort button has a description of "Sort this table alphabetically by name." without any of the ensuing clutter! 🙌🏻

