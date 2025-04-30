<script>
	let { params } = $props();
	let world = $state("Post");
</script>

<h1>¡Hello {world}!</h1>
<h2>ID is {params.id}</h2>

<style>
	h1 {
		color: royalblue;
		text-transform: uppercase;
		font-size: 4em;
	}
	h2 {
		color: royalblue;
		font-size: 2.5em;
	}
</style>
