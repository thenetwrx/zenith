<script lang="ts">
    import Container from "$lib/components/core/Container.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import { toast } from "svelte-sonner";
    import type { PageData } from "./$types";
    import { invalidateAll } from "$app/navigation";
    export let data: PageData;
    let selected: string = data.voted ?? "";

    const vote = async () => {
        const response = await fetch(`/api/v1/polls/${data.poll.id}/vote`, {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                option: selected
            })
        });

        if (response.ok) {
            invalidateAll();
            toast.success("Your vote has been carefully recorded");
        } else {
            const json = await response.json();
            toast.error(json.message);
        }
    };
</script>

<svelte:head>
    <title>{data.poll.title}</title>
    <meta
        property="og:title"
        content="{data.poll.title}"
    />
    <meta
        property="og:description"
        content="{data.poll.description}"
    />
</svelte:head>

<Container>
    <div class="mx-auto flex w-full flex-col items-center gap-4 py-12">
        <h2 class="text-3xl">{data.poll.title}</h2>
        <p class="text-sm opacity-65">{data.poll.description || "No description provided"}</p>
    </div>

    <div class="mx-auto flex w-full max-w-xl flex-col items-center gap-2">
        {#each data.poll.options as option}
            <button
                class="{data.voted !== null
                    ? 'cursor-not-allowed '
                    : ''}w-full rounded-lg transition-colors animate-duration-1000 hover:bg-background-200 p-3{selected ===
                option.id
                    ? ' bg-background-100'
                    : ''}"
                disabled="{data.voted !== null}"
                on:click="{() => (selected = option.id)}"
            >
                <div class="flex items-center space-x-2">
                    {#if selected === option.id || option.id === data.voted}
                        <i class="fa-solid fa-square-check fa-lg text-primary"></i>
                    {:else}
                        <i class="fa-regular fa-square fa-lg"></i>
                    {/if}
                    <p
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {option.text}
                    </p>
                </div>
            </button>
        {/each}

        <Separator class="my-6" />

        <div class="ml-auto flex flex-row items-center gap-2">
            <Button
                size="sm"
                on:click="{vote}"
                disabled="{data.voted !== null}"
                class="flex flex-row items-center gap-2"
                ><i class="fa-solid fa-check-to-slot"></i> Vote</Button
            >
        </div>
    </div>
</Container>
