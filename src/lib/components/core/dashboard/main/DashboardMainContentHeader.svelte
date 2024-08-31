<script
    setup
    lang="ts"
>
    export let title: string;
</script>

<div class="mb-2 flex flex-wrap items-center gap-2">
    <h2 class="text-2xl font-semibold">{title}</h2>
    <slot></slot>
</div>
