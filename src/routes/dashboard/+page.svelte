<script lang="ts">
    import Container from "$lib/components/core/Container.svelte";
    import DashboardMainHeader from "$lib/components/core/dashboard/main/DashboardMainHeader.svelte";
    import DashboardMainContainer from "$lib/components/core/dashboard/main/DashboardMainContainer.svelte";
    import DashboardMainSidebar from "$lib/components/core/dashboard/main/DashboardMainSidebar.svelte";
    import DashboardMainContent from "$lib/components/core/dashboard/main/DashboardMainContent.svelte";
    import DashboardMainContentHeader from "$lib/components/core/dashboard/main/DashboardMainContentHeader.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import type { PageData } from "./$types";
    import { Separator } from "$lib/components/ui/separator";
    import { Badge } from "$lib/components/ui/badge";

    export let data: PageData;
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<Container>
    <div class="mx-auto mt-12 max-w-6xl">
        <DashboardMainHeader
            user="{data.user}"
            session="{data.session}"
        />
        <DashboardMainContainer>
            <DashboardMainSidebar
                active="dashboard"
                admin="{data.user?.admin || false}"
            />
            <DashboardMainContent>
                <div class="max-md:hidden">
                    <DashboardMainContentHeader title="Dashboard" />

                    <div class="w-full">
                        <Button
                            size="sm"
                            href="/create/p"
                            class="flex w-fit flex-row items-center gap-2"
                            ><i class="fa-regular fa-plus"></i> Create poll</Button
                        >
                        <div class="mb-2 mt-6 w-full">
                            <h3 class="text-xl">Your polls</h3>
                            <Separator />
                        </div>

                        {#if data.polls.length === 0}
                            <p class="flex flex-col py-6 text-center opacity-40">
                                <i class="fa-solid fa-face-spiral-eyes"></i>
                                <span>Many empty, much wow.</span>
                            </p>
                        {:else}
                            <div class="flex flex-col gap-2">
                                {#each data.polls as poll, index}
                                    <div
                                        class="flex flex-col gap-2"
                                        id="{poll.id}"
                                    >
                                        <div
                                            class="flex flex-row items-center rounded-lg bg-background-100 p-4"
                                        >
                                            <div class="flex flex-col items-start">
                                                <a
                                                    class="text-lg font-medium hover:text-primary hover:underline"
                                                    href="/p/{poll.id}">"{poll.title}"</a
                                                >
                                                <p class="text-sm opacity-60">
                                                    {poll.description || "No description provided"}
                                                </p>
                                            </div>

                                            <Dialog.Root>
                                                <Dialog.Trigger
                                                    class="{buttonVariants({ size: 'sm' })} ml-auto"
                                                >
                                                    <i class="fa-solid fa-square-poll-horizontal"
                                                    ></i></Dialog.Trigger
                                                >
                                                <Dialog.Content class="sm:max-w-[425px]">
                                                    <Dialog.Header>
                                                        <Dialog.Title>Poll Statistics</Dialog.Title>
                                                        <Dialog.Description>
                                                            Your question "{poll.title}" has {poll.votes
                                                                .length} votes.
                                                        </Dialog.Description>
                                                    </Dialog.Header>

                                                    <div class="flex flex-col gap-2">
                                                        {#each poll.options as option}
                                                            <div class="flex flex-col">
                                                                <p>
                                                                    "{option.text}"
                                                                    {#if option.votes.length === Math.max(...poll.options.map((option) => option.votes.length || -1))}
                                                                        <Badge
                                                                            variant="default"
                                                                            size="sm"
                                                                            class="ml-1">winner!</Badge
                                                                        >
                                                                    {/if}
                                                                </p>
                                                                <p class="ml-1 opacity-50">
                                                                    has
                                                                    {poll.votes.filter(
                                                                        (vote) => vote.option_id === option.id
                                                                    ).length} votes
                                                                </p>
                                                            </div>
                                                        {/each}
                                                    </div></Dialog.Content
                                                >
                                            </Dialog.Root>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </DashboardMainContent>
        </DashboardMainContainer>
    </div>
</Container>
