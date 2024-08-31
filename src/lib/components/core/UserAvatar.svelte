<script
    setup
    lang="ts"
>
    import github from "$lib/helpers/github";

    export let id: number;
</script>

<div class="h-8 w-8 overflow-hidden rounded-full">
    <div class="avatar">
        <div class="w-full">
            <img
                alt="Resource"
                src="{github.cdn.user_avatar(id)}"
            />
        </div>
    </div>
</div>
