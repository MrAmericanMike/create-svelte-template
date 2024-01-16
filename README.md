# Create-Svelte-Template

> # **WORK IN PROGRESS**

---

> ## Usage

Use create on an empty directory (root for your project)

```sh
npm create svelte-template
```

```sh
pnpm create svelte-template
```

```sh
yarn create svelte-template
```

---

> ## What is this package?

The idea of this package is to provide Svelte/SvelteKit like Scaffolding with slightlight different defaults. It also allows to start Svelte projects without SvelteKit on it (thing that create-svelte doesn't allow)

---

> ## Why no use create-svelte?

Please feel free to use [create-svelte](https://www.npmjs.com/package/create-svelte). This version is meant to provide you with an alternative scaffolding.

---

> ## Why this package exists?

I decided to make this package so when someone starts a project that will use Svelte/SvelteKit it comes scaffolded in a slightly different way compared to create-svelte. Check the templates folder on the [repository](https://github.com/MrAmericanMike/create-svelte-template) to see their structure. It also sets different ports and few more things like preferring `@sveltejs/adapter-static` over `@sveltejs/adapter-auto`. It moves the entry point for websites to an `index.html` page and it also sets a different location for the public folder (assets).

---

> ## Notice

Typescripts settings follow Svelte templates for the most part, with some minor changes. Please feel free to suggest changes.

---

> ## Can we contribute?

Sure, open an [issue](https://github.com/MrAmericanMike/create-svelte-template/issues) we will take a look at it.

---

> ## What Frameworks?

We provide 4 options as of now. Svelte (Javascript and Typescript) and SvelteKit (Javascript and Typescript)

---

# TODO

-   Write tests
-   Add more variations
