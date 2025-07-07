<script lang="ts">
    import { onMount } from 'svelte'

    export let timerDone: boolean;
    let videoId = "mWQtmzg5VSU";
    let videoErrorMessage: string;
    let player: YT.Player;
    let container;
    let playbackSetting: string = "0";
    let playback: number;
    $: playback = parseInt(playbackSetting);

    function mountPlayer(): void {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            window.onYouTubeIframeAPIReady = initializePlayer;
        } else {
            initializePlayer();
        }
    }

    onMount(mountPlayer)

    function initializePlayer() {
        if (player) {
            player.destroy();
        }
        try {
            player = new YT.Player(container, {
                videoId,
                events: {
                    onReady: () => console.log("Player ready"),
                    onStateChange: (event) => console.log("State change:", event.data),
                    onError: (event) => {
                        console.log("YouTube Player Error", event.data);
                    }
                },
                playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    enablejsapi: 1
                }
            });
            videoErrorMessage = "";
        } catch (error) {
            videoErrorMessage = error.message
            console.log(videoErrorMessage)
        }
    }
    function keypress(event) {
        if (event.key === "Enter") {
            initializePlayer()
        }
    }

    $: if (timerDone) {
        if (playback === 0) {
            player.playVideo();
        }
        if (playback === 1) {
            player.pauseVideo();
        }
        timerDone = false; // Reset timer variable
    }
</script>
<main class="video-box">
    <div>
        <input type="text" bind:value={videoId} name="videoId" on:keypress={(e) => keypress(e)}>
    </div>
    <div bind:this={container} class="yt-container">{videoErrorMessage}</div>
    <form>
        <div class="radio-buttons">
            <div>
                <input type="radio" id="start-on-play" name="playback" value=0 bind:group={playbackSetting}>
                <label for="start-on-play">Start on Timer End</label>
            </div>
            <div>
                <input type="radio" id="stop-on-play" name="playback" value=1 bind:group={playbackSetting}>
                <label for="stop-on-play">Stop on Timer End</label>
            </div>
        </div>
    </form>
    {#if videoErrorMessage != ""}
        <div class="video-box__error">{videoErrorMessage}</div>
    {/if}
</main>

<style lang="scss">
    .video-box {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
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
    .video-box__error {
        background-color: orange;
        color: black;
        font-weight: bold;
        padding-left: 5%;
        padding-right: 5%;
    }
</style>