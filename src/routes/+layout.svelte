<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";
    import UserAvatar from "$lib/components/core/UserAvatar.svelte";
    import { ModeWatcher, mode, setMode, resetMode } from "mode-watcher";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import MobileLink from "$lib/components/core/MobileLink.svelte";
    import { Toaster } from "$lib/components/ui/sonner";

    let open = false;

    export let data: LayoutData;

    const signout = () => {
        goto("/api/v1/auth/signout");
    };
</script>

<ModeWatcher defaultMode="system" />
<Toaster
    position="top-center"
    expand
    richColors
/>

<svelte:head>
    <meta
        property="og:site_name"
        content="Zenith"
    />
    <meta
        property="og:type"
        content="website"
    />
    <meta
        property="og:url"
        content="https://zenith.sh"
    />
    <meta
        property="og:locale"
        content="en_US"
    />
    <meta
        property="twitter:card"
        content="summary"
    />
    <meta
        property="twitter:site"
        content="@thenetwrx"
    />
    <meta
        property="twitter:creator"
        content="@thenetwrx"
    />
</svelte:head>

<div class="flex min-h-screen flex-col">
    <div class="sticky top-0 z-[9999] w-full border-b border-y-secondary p-0 backdrop-blur-md">
        <div class="mx-auto flex h-14 max-w-7xl flex-row items-center bg-transparent px-4 py-4">
            <Sheet.Root bind:open>
                <Sheet.Trigger
                    asChild
                    let:builder
                >
                    <Button
                        builders="{[builder]}"
                        variant="ghost"
                        class="z-[999999] mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 min-[500px]:hidden"
                    >
                        <i class="fa-solid fa-bars fa-lg"></i>
                        <span class="sr-only">Toggle Menu</span>
                    </Button>
                </Sheet.Trigger>
                <Sheet.Content
                    side="left"
                    class="z-[999999999] pr-0"
                >
                    <MobileLink
                        bind:open
                        href="/"
                        class="mr-3 flex flex-row items-center gap-2"
                    >
                        <img
                            src="/favicon.png"
                            alt="Logo"
                            height="32"
                            width="32"
                        />
                        <h5 class="text-3xl font-bold">Zenith</h5>
                    </MobileLink>
                    <ScrollArea
                        orientation="both"
                        class="my-4 h-[calc(100vh-8rem)] pb-10"
                    >
                        <div class="flex flex-col space-y-3">
                            <MobileLink
                                bind:open
                                href="/create/p">Create a Poll</MobileLink
                            >
                            <MobileLink
                                bind:open
                                href="/faq">FAQ</MobileLink
                            >
                            <MobileLink
                                bind:open
                                href="/pricing">Pricing</MobileLink
                            >
                        </div>
                    </ScrollArea>
                </Sheet.Content>
            </Sheet.Root>

            <a
                class="mr-3 flex flex-row items-center gap-2 max-[499px]:hidden"
                href="/"
            >
                <img
                    src="/favicon.png"
                    alt="Logo"
                    height="32"
                    width="32"
                />
                <h5 class="text-3xl font-bold">Zenith</h5>
            </a>
            <nav class="flex flex-row items-center gap-3 max-[499px]:hidden">
                <a
                    href="/create/p"
                    class="{$page.url.pathname === '/create/p'
                        ? 'text-foreground'
                        : 'text-foreground/60 transition-colors hover:text-foreground'}"
                >
                    Create a Poll
                </a>
                <a
                    href="/faq"
                    class="{$page.url.pathname === '/faq'
                        ? 'text-foreground'
                        : 'text-foreground/60 transition-colors hover:text-foreground'}"
                >
                    FAQ
                </a>
                <a
                    href="/pricing"
                    class="{$page.url.pathname === '/pricing'
                        ? 'text-foreground'
                        : 'text-foreground/60 transition-colors hover:text-foreground'}"
                    >Pricing
                </a>
            </nav>

            <div class="ml-auto flex flex-row items-center gap-2">
                <DropdownMenu.Root preventScroll="{false}">
                    <DropdownMenu.Trigger
                        asChild
                        let:builder
                    >
                        <Button
                            builders="{[builder]}"
                            variant="ghost"
                            size="icon"
                        >
                            <i class="fa-solid fa-sun-bright fa-lg block dark:hidden"></i>
                            <i class="fa-solid fa-moon-stars fa-lg hidden dark:block"></i>
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        class="z-[99999] w-48"
                        align="end"
                    >
                        <DropdownMenu.Label>Theme</DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item on:click="{() => setMode('light')}">Light</DropdownMenu.Item>
                        <DropdownMenu.Item on:click="{() => setMode('dark')}">Dark</DropdownMenu.Item>
                        <DropdownMenu.Item on:click="{() => resetMode()}">System</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
                {#if data.user}
                    <DropdownMenu.Root preventScroll="{false}">
                        <DropdownMenu.Trigger>
                            <UserAvatar id="{data.user.provider_id}" />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                            class="z-[99999] w-48"
                            align="end"
                        >
                            <DropdownMenu.Label
                                >Hi, {data.user.display_name ?? data.user.username}</DropdownMenu.Label
                            >
                            <DropdownMenu.Group>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item href="/dashboard">Dashboard</DropdownMenu.Item>
                                <DropdownMenu.Item on:click="{signout}">Sign out</DropdownMenu.Item>
                            </DropdownMenu.Group>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                {:else}
                    <Button
                        href="/api/v1/auth/github?redirect={encodeURIComponent($page.url.pathname)}"
                        class="gap-2 "
                        variant="secondary"
                        size="sm"
                    >
                        <i class="fa-brands fa-github"></i>
                        Sign in
                    </Button>
                {/if}
            </div>
        </div>
    </div>

    <slot></slot>

    <div class="flex w-full flex-col">
        <div class="w-full border-y">
            <div class="mx-auto flex w-full max-w-7xl flex-row gap-6 p-6 max-md:flex-col">
                <div class="flex flex-col gap-2">
                    <p class="text-md whitespace-break-spaces">SERVICE</p>
                    <a
                        href="/create/p"
                        class="opacity-65 hover:underline">Create a Poll</a
                    >
                    <a
                        href="/faq"
                        class="opacity-65 hover:underline">FAQ</a
                    >
                    <a
                        href="/pricing"
                        class="opacity-65 hover:underline">Pricing</a
                    >
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-md whitespace-break-spaces">LEGAL</p>
                    <a
                        href="/legal/guidelines"
                        class="opacity-65 hover:underline">Guidelines</a
                    >
                    <a
                        href="/legal/terms-of-service"
                        class="opacity-65 hover:underline">Terms of Service</a
                    >
                    <a
                        href="/legal/privacy-policy"
                        class="opacity-65 hover:underline">Privacy Policy</a
                    >
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-md whitespace-break-spaces">SUPPORT</p>
                    <a
                        href="/discord"
                        class="opacity-65 hover:underline">Discord</a
                    >
                    <a
                        href="mailto:hello@netwrx.dev"
                        class="opacity-65 hover:underline">Email</a
                    >
                </div>
            </div>
        </div>
        <div class="w-full">
            <div
                class="mx-auto flex w-full max-w-7xl flex-row items-center justify-between gap-6 p-6 text-sm opacity-75 max-md:flex-col"
            >
                <p>Copyright &copy; 2024 Echelon Media • Not affiliated with Discord.</p>
                <div class="flex flex-row gap-4">
                    <a
                        href="https://x.com/thenetwrx"
                        target="_blank"
                    >
                        <i class="fa-brands fa-lg fa-x-twitter"></i></a
                    >
                    <a
                        href="https://reddit.com/u/thenetwrx"
                        target="_blank"
                    >
                        <i class="fa-brands fa-lg fa-reddit"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    :global(html) {
        scroll-behavior: smooth;
    }
    :global(body) {
        font-family: Cairo;
    }
</style>
