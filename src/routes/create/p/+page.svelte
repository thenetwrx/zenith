<script lang="ts">
    import Container from "$lib/components/core/Container.svelte";
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
    import { goto } from "$app/navigation";
    import { toast } from "svelte-sonner";

    let title: string = "";
    let description: string = "";
    let options: string[] = ["", ""];

    function add_option() {
        options = [...options, ""];
    }

    function remove_option(index: number) {
        if (index === 0) {
            // Clear the first option instead of removing it
            options[0] = "";
        } else {
            options = options.filter((_, i) => i !== index);
        }
        options = [...options]; // Trigger reactivity
    }

    function update_option(index: number, event: Event) {
        const input = event.target as HTMLInputElement;
        options[index] = input.value;
        options = [...options]; // Trigger reactivity
    }

    const deploy = async () => {
        const response = await fetch(`/api/v1/polls/create`, {
            method: "PUT",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                title,
                description,
                options
            })
        });

        const json = await response.json();
        if (response.ok) {
            goto(`/p/${json.id}`);
        } else {
            toast.error(json.message);
        }
    };
</script>

<svelte:head>
    <title>Create a Poll</title>
    <meta
        property="og:title"
        content="Create a Poll"
    />
</svelte:head>

<Container>
    <div class="mx-auto flex w-full flex-col items-center gap-4 py-12">
        <h2 class="text-3xl">Create a Poll</h2>
        <p class="text-sm opacity-65">Complete the below fields to create your poll.</p>
    </div>

    <Card.Root class="mx-auto w-[768px] bg-background-100">
        <Card.Header />
        <Card.Content>
            <div class="mb-6 flex w-full flex-col gap-4">
                <div class="flex w-full flex-col gap-1.5">
                    <Label>Title<span class="text-destructive">*</span></Label>
                    <Input
                        type="text"
                        bind:value="{title}"
                        placeholder="What is your favorite color?"
                    />
                </div>
                <div class="flex w-full flex-col gap-1.5">
                    <Label>Description <span class="opacity-40">(optional)</span></Label>
                    <Textarea
                        placeholder="Answer truthfully..."
                        bind:value="{description}"
                    />
                </div>
            </div>

            <div class="mb-6 flex w-full flex-col gap-4">
                <div class="flex w-full flex-col gap-2">
                    {#each options as option, i}
                        <div class="flex flex-row items-center gap-1">
                            <Input
                                type="text"
                                placeholder="Option {i + 1}"
                                value="{option}"
                                on:input="{(event) => update_option(i, event)}"
                            />
                            <Button
                                on:click="{() => remove_option(i)}"
                                variant="ghost"
                                size="sm"
                            >
                                <i class="fa-solid fa-{i === 0 ? 'eraser' : 'xmark'} fa-lg"></i>
                            </Button>
                        </div>
                    {/each}
                    <Button
                        on:click="{add_option}"
                        size="sm"
                        class="mt-2 flex w-fit flex-row items-center gap-2"
                        ><i class="fa-solid fa-plus"></i> Add Option</Button
                    >
                </div>
            </div>
        </Card.Content>
        <Card.Footer class="flex justify-between">
            <Button
                variant="outline"
                href="/dashboard">Cancel</Button
            >
            <Button on:click="{deploy}">Submit</Button>
        </Card.Footer>
    </Card.Root>
</Container>
