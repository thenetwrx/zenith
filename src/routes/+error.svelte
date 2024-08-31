<script lang="ts">
    import { page } from "$app/stores";
    import { Button } from "$lib/components/ui/button";
    import Container from "$lib/components/core/Container.svelte";
</script>

<svelte:head>
    <title>{$page.error?.message}</title>
    <meta
        property="og:title"
        content="{$page.error?.message}"
    />
    <meta
        property="og:description"
        content="Uh oh. Unable to load this page, did you get the link right?"
    />
</svelte:head>

<Container>
    <div class="mx-auto mt-20 max-w-6xl text-center">
        <i class="fa-solid fa-triangle-exclamation fa-2xl mx-auto mb-4"></i>
        <h1 class="text-lg">Something snapped!</h1>
        <p class="mx-auto max-w-xl opacity-75">
            {$page.error?.message || "an unknown error occurred"}
        </p>
        {#if $page.status === 401}
            <Button
                href="/api/v1/auth/github?redirect={encodeURIComponent($page.url.pathname)}"
                class="mx-auto mt-16 flex w-fit flex-row items-center gap-2"
                size="sm"
                variant="secondary"
            >
                Sign in with GitHub
                <i class="fa-brands fa-github"></i>
            </Button>
        {:else}
            <Button
                href="/"
                class="mx-auto mt-16 flex w-fit flex-row items-center gap-2"
                size="sm"
                variant="secondary"
            >
                Go back Home
            </Button>
        {/if}
    </div>
</Container>
