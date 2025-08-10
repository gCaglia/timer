export class Sound {
    source_path: string;
    attribution_path: string;

    constructor(path: string) {
        this.source_path = path + "/sound.wav"
        this.attribution_path = path + "/attr.txt"
    }
}