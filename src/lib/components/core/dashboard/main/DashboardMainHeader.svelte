<script lang="ts">
    export let user: import("lucia").User | null;
    export let session: import("lucia").Session | null;
</script>

<div class="mb-4 flex items-center justify-between">
    <div class="flex flex-row items-center gap-2 max-md:flex-col max-md:items-start">
        <!-- <UserAvatar resource={user} /> -->
        <div>
            <h2 class="text-lg">
                Hey there,
                {#if user?.subscription === "pro"}
                    <span class="text-[#ffbf28]">
                        {#if user.subscription}
                            <i class="fa-solid fa-crown"></i>
                        {/if}
                        {user.display_name || user.username || "Unknown"}
                    </span>
                {:else if user?.subscription === "elite"}
                    <span
                        class="animate-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 bg-clip-text text-transparent"
                    >
                        {#if user.subscription}
                            <i class="fa-solid fa-crown"></i>
                        {/if}
                        {user.display_name || user.username || "Unknown"}
                    </span>
                {:else}
                    <span>
                        {#if user?.subscription}
                            <i class="fa-solid fa-crown"></i>
                        {/if}
                        {user?.display_name || user?.username || "Unknown"}
                    </span>
                {/if}
            </h2>
            <p class="opacity-40">
                You logged in on {new Date(Number(session?.created_at || 0)).toLocaleString()}
            </p>
        </div>
    </div>
</div>
