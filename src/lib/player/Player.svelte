<script lang="ts">
    import { onMount } from 'svelte'

    let videoId = "BzxVZ4SD8uk";
    let player: YT.Player;
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
        if (player) {
            player.destroy();
        }
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
    function keypress(event) {
        if (event.key === "Enter") {
            initializePlayer()
        }
    }
</script>
<main class="video-box">
    <div>
        <input type="text" bind:value={videoId} name="videoId" on:keypress={(e) => keypress(e)}>
    </div>
    <div bind:this={container} class="yt-container"></div>
    <form>
        <div class="radio-buttons">
            <div>
                <input type="radio" id="start-on-play" name="playback" value=0>
                <label for="start-on-play">Start on Timer End</label>
            </div>
            <div>
                <input type="radio" id="stop-on-play" name="playback" value=1>
                <label for="stop-on-play">Stop on Timer End</label>
            </div>
        </div>
    </form>
</main>

<style lang="scss">
    .video-box {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .yt-container {
        aspect-ratio: 16/9;
        width: 100%;
    }

    .radio-buttons {
        color: rgb(153, 135, 135);
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>