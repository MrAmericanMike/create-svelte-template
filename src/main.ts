#!/usr/bin/env node
import { blue, bold, red, reset, yellow } from "kolorist";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";

import type { Framework, FrameworkFlavor } from "./types";

const FRAMEWORKS: Framework[] = [
	{
		name: "svelte",
		display: "Svelte",
		color: red,
		flavors: [
			{
				name: "template-svelte-js",
				display: "JavaScript",
				color: yellow
			},
			{
				name: "template-svelte-ts",
				display: "TypeScript",
				color: blue
			}
		]
	},
	{
		name: "sveltekit",
		display: "SvelteKit",
		color: red,
		flavors: [
			{
				name: "template-sveltekit-js",
				display: "JavaScript",
				color: yellow
			},
			{
				name: "template-sveltekit-ts",
				display: "TypeScript",
				color: blue
			}
		]
	}
];

async function doMagic() {
	const ARGS = process.argv.slice(2);
	const FORCE = ARGS.includes("--force");
	console.log(blue("Create-Svelte-Template"));
	console.log(bold(blue("This package is still in beta. Bugs included at no extra charge!")));
	if (!isPathEmpty(".") && !FORCE) {
		console.log(`❌ ${red("You can only use this script within an empty folder")} ❌`);
		return console.log(`❌ ${yellow(`add ${blue("--force")} if you want to overwrite existing files`)} ❌`);
	} else {
		try {
			const RESPONSE = await getFramework();
			console.log(`${RESPONSE.framework.display} ${RESPONSE.flavor.display}`);
			const TEMPLATE_DIR = path.resolve(fileURLToPath(import.meta.url), "../..", RESPONSE.flavor.name);
			const FILES = fs.readdirSync(TEMPLATE_DIR);
			for (const FILE of FILES) {
				writeFile(TEMPLATE_DIR, FILE);
			}
			doneMessage();
		} catch (error) {
			console.log(error);
		}
	}
}

async function getFramework() {
	return await prompts(
		[
			{
				type: "select",
				name: "framework",
				message: "Pick a framework",
				choices: FRAMEWORKS.map((framework) => {
					return {
						title: framework.color(framework.display),
						value: framework
					};
				})
			},
			{
				type: (framework) => (framework && framework.flavors ? "select" : null),
				name: "flavor",
				message: reset("Select a flavor:"),
				choices: (framework) =>
					framework.flavors.map((flavor: FrameworkFlavor) => {
						const flavorColor = flavor.color;
						return {
							title: flavorColor(flavor.display),
							value: { name: flavor.name, display: flavor.display }
						};
					})
			}
		],
		{
			onCancel: () => {
				console.log("❌ Cancelled");
				process.exit(0);
			}
		}
	);
}

function renameFile(file: string) {
	const FILES: Record<string, string> = {
		_gitignore: ".gitignore"
	};
	return FILES[file] ?? file;
}

function isPathEmpty(path: string) {
	try {
		const files = fs.readdirSync(path);
		return files.length === 0 || (files.length === 1 && files[0] === ".git");
	} catch (error) {
		console.log(error);
		return false;
	}
}

function getPackageManager() {
	const AGENT = process?.env?.npm_config_user_agent || null;
	if (!AGENT) {
		return null;
	}
	const PKG = AGENT.split(" ")[0];
	const [NAME, VERSION] = PKG.split("/");
	return {
		name: NAME,
		version: VERSION
	};
}

function writeFile(templateDir: string, file: string) {
	const TARGET = renameFile(file);
	copyFile(path.join(templateDir, file), TARGET);
}

function copyFile(source: string, destination: string) {
	const STATS = fs.statSync(source);
	if (STATS.isDirectory()) {
		copyDir(source, destination);
	} else {
		fs.copyFileSync(source, destination);
	}
}

function copyDir(sourceDir: string, destinationDir: string) {
	fs.mkdirSync(destinationDir, { recursive: true });
	const FILES = fs.readdirSync(sourceDir);
	for (const FILE of FILES) {
		const sourceFile = path.resolve(sourceDir, FILE);
		const destinationFile = path.resolve(destinationDir, FILE);
		copyFile(sourceFile, destinationFile);
	}
}

function doneMessage() {
	console.log(`${blue("All done")} · ${red("Update package.json accordingly")}`);
	const PKG_MANAGER = getPackageManager();
	if (PKG_MANAGER?.name) {
		switch (PKG_MANAGER?.name.toLowerCase()) {
			case "yarn":
				console.log("  yarn");
				console.log("  yarn dev");
				break;
			default:
				console.log(`  ${PKG_MANAGER?.name.toLowerCase()} install`);
				console.log(`  ${PKG_MANAGER?.name.toLowerCase()} run dev`);
				break;
		}
	} else {
		console.log(`  install dependencies`);
		console.log(`  run dev script`);
	}
}

doMagic();
