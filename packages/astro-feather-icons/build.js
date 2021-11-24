const path = require("path");
const feather = require("feather-icons/dist/icons.json");
const { pascalCase } = require("pascal-case");
const fs = require("fs-extra");

const handleComponentName = (name) => name.replace(/\-(\d+)/, "$1");

const component = (icon) =>
	`---
	export interface Props {
		size?: string | number;
		strokeWidth?: number;
		class?: string;
		color?: string;
	}
	let { size = "100%", strokeWidth = 2, class: customClass = "", color } = Astro.props;

	if (size !== "100%") {
		const stringSize = size + "";
		size = stringSize.slice(-1) === 'x' 
			? stringSize.slice(0, stringSize.length -1) + 'em'
			: parseInt(stringSize) + 'px';
	}
---

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24"  stroke={color || "currentColor"} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" class={\`feather feather-${
		icon.name
	} \${customClass}\`}>${feather[icon.name]}</svg>
`;

const icons = Object.keys(feather).map((name) => ({
	name,
	pascalCasedComponentName: pascalCase(`${handleComponentName(name)}-icon`),
	kebabCasedComponentName: `${handleComponentName(name)}-icon`,
}));

Promise.all(
	icons.map((icon) => {
		const filepath = `./dist/icons/${icon.pascalCasedComponentName}.astro`;
		return fs
			.ensureDir(path.dirname(filepath))
			.then(() => fs.writeFile(filepath, component(icon), "utf8"));
	})
).then(async () => {
	const main = icons
		.map(
			(icon) =>
				`export { default as ${icon.pascalCasedComponentName} } from './icons/${icon.pascalCasedComponentName}.astro'`
		)
		.join("\n\n");
	// const types =
	// 	'/// <reference types="svelte" />\nimport {SvelteComponentTyped} from "svelte/internal"\n' +
	// 	icons
	// 		.map(
	// 			(icon) =>
	// 				`export class ${icon.pascalCasedComponentName} extends SvelteComponentTyped<{size?: string, strokeWidth?: number, class?: string}> {}`
	// 		)
	// 		.join("\n");
	// await fs.outputFile("index.d.ts", types, "utf8");
	return await fs.outputFile("./dist/index.js", main, "utf8");
});
