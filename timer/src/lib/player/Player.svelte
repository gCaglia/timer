<script lang="ts">
    import { onMount } from 'svelte'

    export let videoId;
    let player;
    let container;

    onMount(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            window.onYouTubeIframeAPIReady = initializePlayer;
        } else {
            initializePlayer();
        }
    });

    function initializePlayer() {
        player = new YT.Player(container, {
            videoId,
            events: {
                onReady: () => console.log("Player ready"),
                onStateChange: (event) => console.log("State change:", event.data)
            },
            playerVars: {
                rel: 0,
                modestbranding: 1,
                enablejsapi: 1
            }
        });
    }
</script>
<main>
    <div bind:this={container} class="yt-container"></div>
</main>
<style lang="scss">
    .yt-container {
        aspect-ratio: 16/9;
        width: 100%;
    }
</style>