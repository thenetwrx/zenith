<script lang="ts">
    export let admin: boolean;
    export let active: "dashboard" | "settings" | "admin";
</script>

<div class="flex w-full flex-col md:hidden">
    <a
        class="flex flex-row items-center gap-2 rounded-md p-2 opacity-75 transition-all duration-[150] hover:bg-background-100"
        href="/dashboard"
    >
        <i class="fa-solid fa-arrow-left"></i>
        Dashboard
    </a>
</div>

<div class="top-24 flex h-full w-full flex-col gap-1 max-md:hidden max-md:pb-6 md:sticky md:max-w-[12rem]">
    <a
        class="flex flex-row items-center gap-2 rounded-md transition-all duration-[150] p-2{active ===
        'dashboard'
            ? ' bg-background-200'
            : ' opacity-75 hover:bg-background-100'}"
        href="/dashboard"
    >
        <i class="fa-regular fa-house"></i> Dashboard
    </a>
    <a
        class="flex flex-row items-center gap-2 rounded-md transition-all duration-[150] p-2{active ===
        'settings'
            ? ' bg-background-200'
            : ' opacity-75 hover:bg-background-100'}"
        href="/dashboard/settings"
    >
        <i class="fa-regular fa-gear"></i> Settings
    </a>
    {#if admin}
        <a
            class="flex flex-row items-center gap-2 rounded-md transition-all duration-[150] p-2{active ===
            'admin'
                ? ' bg-background-200'
                : ' opacity-75 hover:bg-background-100'}"
            href="/dashboard/admin"
        >
            <i class="fa-regular fa-hammer"></i> Admin
        </a>
    {/if}
</div>
