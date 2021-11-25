# Astro Feather Icons

Feather is a collection of simply beautiful open source icons.
Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency, and flexibility.

```shell
npm install astro-feather-icons
```

```shell
pnpm i astro-feather-icons
```

```shell
yarn add astro-feather-icons
```

[GitHub](https://github.com/edazpotato/astro-feather-icons) |
[NPM](https://npmjs.com/package/astro-feather-icons)



## Usage

All of the icons are available from a single import.

```astro
---
import { AirPlay, AtSign, Zap } from 'astro-feather-icons'
---
<AirPlay />
<AtSign />
<Zap size="60" fill="gold" />
```

When importing all of the icons, only the ones that get used will be added to the page

```astro
---
import * as Icon from 'astro-feather-icons'
---
<Icon.AirPlay />
<Icon.AtSign />
<Icon.Zap size="60" fill="gold" />
```

The icons are also available as individual imports.

```astro
---
import AirPlayIcon from 'astro-feather-icons/AirPlay'
import AtSignIcon from 'astro-feather-icons/AtSign'
import ZapIcon from 'astro-feather-icons/Zap'
---
<AirPlayIcon />
<AtSignIcon />
<ZapIcon size="60" fill="gold" />
```



## Prop Types

The following `Props` interface is available to every icon:

```ts
export interface Props {
  'fill'?: string;
  'fill-opacity'?: number | string;
  'fill-rule'?: "nonzero" | "evenodd" | "inherit";
  'height'?: number | string;
  'size'?: number | string;
  'stroke'?: string;
  'stroke-dasharray'?: string | number;
  'stroke-dashoffset'?: string | number;
  'stroke-linecap'?: "butt" | "round" | "square" | "inherit";
  'stroke-linejoin'?: "miter" | "round" | "bevel" | "inherit";
  'stroke-miterlimit'?: number | string;
  'stroke-opacity'?: number | string;
  'stroke-width'?: number | string;
  'viewBox'?: string;
  'width'?: number | string;
}
```

- The `Props` interface additionally includes:
  - All HTML global attributes.
  - All WAI-ARIA attributes and the WAI-ARIA role attribute.
- The `title` attribute transforms into a `<title>` element within the `<svg>`.
- The `size` attribute transforms values like `1.5x` into `1.5em`.
- The `size` attribute is used as the default values for `width` and `height`.



## Acknowledgements

This package is maintained by [Edazpotato](https://github.com/edazpotato) and
based on
[svelte-feather-icons](https://github.com/dylanblokhuis/svelte-feather-icons) by
[dylanblokhuis](https://github.com/dylanblokhuis).

Licensed under the MIT License. Feather Icons & Feather name Copyright © 2013–present Cole Bemis.
