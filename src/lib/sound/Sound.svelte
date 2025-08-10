<script lang="ts">
    import { Sound } from "../sound/Sound"

    let options: Map<string, string> = new Map([
        ["The Grind", "grind"]
    ]);
    let selectedOption: string = "The Grind";
    $: sound = new Sound(selectedOption);
</script>
<main></main>
<style lang="scss"></style>