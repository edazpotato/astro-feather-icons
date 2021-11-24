# astro-feather-icons

[GitHub](https://github.com/edazpotato/astro-feather-icons) |
[NPM](https://npmjs.com/package/astro-feather-icons)

## Install

```bash
npm i astro-feather-icons --save
pnpm i astro-feather-icons
```

## Usage

```astro
---
import { AirplayIcon, AtSignIcon, ... } from 'astro-feather-icons'
---

<AirplayIcon size="24" />
<AtSignIcon size="1.5x" />
```

See all icons here: https://feathericons.com/ More examples can be found in
[/src/pages/index.astro](/src/pages/index.astro).

## Prop types

Here's the `Props` interface used in every icon component:

```ts
export interface Props {
	size?: string | number;
	strokeWidth?: number;
	class?: string;
	color?: string;
}
```

## Author

This package is maintained by [Edazpotato](https://github.com/edazpotato) and
based on
[svelte-feather-icons](https://github.com/dylanblokhuis/svelte-feather-icons) by
[dylanblokhuis](https://github.com/dylanblokhuis).
