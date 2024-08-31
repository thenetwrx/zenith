<script lang="ts">
    import type { PageData } from "./$types";
    import { Button } from "$lib/components/ui/button";
    import Container from "$lib/components/core/Container.svelte";
    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";
    import * as Accordion from "$lib/components/ui/accordion";
    import * as Card from "$lib/components/ui/card";

    export let data: PageData;

    onMount(() => {
        if (data.error_message) toast.error(data.error_message);
    });
</script>

<svelte:head>
    <title>Zenith: Free, yet Powerful Polls!</title>
    <meta
        property="og:title"
        content="Zenith: Free, yet Powerful Polls!"
    />
    <meta
        property="og:description"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book."
    />
    <meta
        property="og:image"
        content="/favicon.png"
    />
</svelte:head>

<Container>
    <div class="mx-auto flex w-full max-w-5xl flex-row gap-8 py-16 max-md:flex-col md:px-12 md:py-36">
        <div class="flex flex-col gap-5">
            <a
                class="border-core/65 bg-core/30 flex flex-row items-center gap-2 rounded-full border px-2 py-1"
                href="/blog/we-have-just-launched"
            >
                <i class="fa-regular fa-star"></i>
                <p>New</p>
                <p class="text-secondary-foreground/25">/</p>
                <p class="overflow-hidden text-ellipsis text-nowrap">We've just launched!</p>
                <i class="fa-solid fa-arrow-right ml-auto"></i>
            </a>
            <h1 class="text-5xl max-lg:text-4xl">
                Free, yet <span class="font-bold underline">Powerful</span> Polls.
            </h1>
        </div>
        <div class="flex w-full flex-col gap-4 sm:max-w-lg">
            <p class="mx-auto w-full py-2 opacity-75">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
            </p>

            <div class="flex w-full flex-row items-center gap-2 max-sm:flex-col">
                <Button
                    href="/create/p"
                    size="sm"
                    class="max-sm:w-full">Get started</Button
                >
                <Button
                    href="/faq"
                    size="sm"
                    variant="secondary"
                    class="max-sm:w-full">Learn more</Button
                >
            </div>
        </div>
    </div>

    <div class="mx-auto grid max-w-6xl pb-24">
        <h2 class="text-center text-3xl">Trusted by a lot of people</h2>
        <div class="grid grid-cols-3 gap-2 py-4 max-sm:grid-cols-1">
            <Card.Root>
                <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Card.Title class="text-sm font-medium">Unique visitors</Card.Title>
                    <i class="fa-solid fa-eye text-muted-foreground"></i>
                </Card.Header>
                <Card.Content>
                    <div class="text-2xl font-bold">69.6B</div>
                    <p class="text-xs text-muted-foreground">visitors every month</p>
                </Card.Content>
            </Card.Root>
            <Card.Root>
                <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Card.Title class="text-sm font-medium">Polls</Card.Title>
                    <i class="fa-solid fa-server text-muted-foreground"></i>
                </Card.Header>
                <Card.Content>
                    <div class="text-2xl font-bold">696T</div>
                    <p class="text-xs text-muted-foreground">running polls</p>
                </Card.Content>
            </Card.Root>
            <Card.Root>
                <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Card.Title class="text-sm font-medium">Customers</Card.Title>
                    <i class="fa-solid fa-icons text-muted-foreground"></i>
                </Card.Header>
                <Card.Content>
                    <div class="text-2xl font-bold">6.9M</div>
                    <p class="text-xs text-muted-foreground">happy customers</p>
                </Card.Content>
            </Card.Root>
        </div>

        <h2 class="pt-32 text-center text-3xl">Frequently asked questions</h2>
        <div class="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4">
            <Accordion.Root class="w-full ">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>uwu!?</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book.
                        </p>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>uwu!?</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-3">
                    <Accordion.Trigger>uwu!?</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-4">
                    <Accordion.Trigger>uwu!?</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-5">
                    <Accordion.Trigger>uwu!?</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-6">
                    <Accordion.Trigger>uwu!?</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-7">
                    <Accordion.Trigger>uwu.</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen
                            book.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </div>

        <h2 class="pt-32 text-center text-3xl">Are you ready?</h2>
        <p class="text-center opacity-75">Start creating polls today for free!</p>

        <div class="mx-auto flex flex-row gap-2 py-12 max-md:flex-col max-md:gap-4">
            <Button
                size="lg"
                href="/create/p"
                class="px-12">Get started</Button
            >
        </div>
    </div>
</Container>
