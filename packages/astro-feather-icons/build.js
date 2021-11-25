import { createRequire } from 'module'
import fs from 'fs/promises'
import ps from 'path/posix'

const require = createRequire(import.meta.url)

const licenseText = `/*! feather-icons | MIT License | https://feathericons.com/ */`

const toAstroComponent = (innerSVG, title) => `---
${licenseText}

export { Props } from './Props.ts';

let {
	size,
	title,
	width = size,
	height = size,
	...props
} = {
	'fill': 'CurrentColor',
	'fill-rule': 'evenodd',
	'size': '24',
	'stroke-linecap': 'round',
	'stroke-linejoin': 'round',
	'stroke-width': '2',
	'title': '${title}',
	'viewBox': '0 0 24 24',
	...Astro.props
}

const toAttributeSize = (size: number) => String(size).replace(/(?<=[0-9])(x%)$/, 'em')

size = toAttributeSize(size)
width = toAttributeSize(width)
height = toAttributeSize(height)
---
<svg {width} {height} {...props}>{title ? (<title>{title}</title>) : ''}${innerSVG}</svg>`

/** Imported Feather Icons data. */
const source = require('feather-icons/dist/icons.json')

/** Current directory. */
const currentDir = ps.resolve('.')

/** Distribution directory. */
const distDir = ps.resolve(currentDir, 'dist')

// clean the distribution directory

await fs.rm(distDir, { force: true, recursive: true })
await fs.mkdir(distDir, { recursive: true })

// copy the attribute typings file

await fs.copyFile(ps.resolve(currentDir, 'Props.ts'), ps.resolve(distDir, 'Props.ts'))

/** Content of the main entry `index.js` file */
let contentOfIndexJS = `${licenseText}\n`

for (const [name, innerSVG] of Object.entries(source)) {
	/** Formatted title, which is title-cased, and has corrected brand names. */
	const title = name.replace(/(?<=^|-)([a-z0-9])/g, (_0, $1) => $1.toUpperCase()).replace(/[^A-Za-z0-9]+/g, ' ').replace(/Airplay/, 'AirPlay').replace(/Codepen/, 'CodePen').replace(/Github/, 'GitHub').replace(/Gitlab/, 'GitLab').replace(/Youtube/, 'YouTube')

	/** Base name, which is the formatted title without spaces (PascalCase) */
	const baseName = title.replace(/ /g, '')

	// write the astro component to a file
	await fs.writeFile(
		ps.resolve(distDir, `${baseName}.astro`),
		toAstroComponent(innerSVG, title),
		'utf8'
	)

	// add the astro component export to the main entry `index.js` file
	contentOfIndexJS += `\nexport { default as ${baseName} } from './${baseName}.astro'`
}

// write the main entry `index.js` file
await fs.writeFile(
	ps.resolve(distDir, 'index.js'),
	contentOfIndexJS,
	'utf8'
)