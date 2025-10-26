
'use strict';

export type SoundMeter = {
    context: AudioContext;
    instant: number;
    connectToSource(stream: MediaStream): void;
    stop(): void;
};

export default function SoundMeter(context: AudioContext): SoundMeter {
    const soundMeter = {
        context,
        instant: 0.0,
        mic: null as MediaStreamAudioSourceNode | null,
        script: context.createScriptProcessor(2048, 1, 1) as ScriptProcessorNode
    };

    // onaudioprocess typing: AudioProcessingEvent is deprecated in some lib versions,
    // so fall back to any to avoid TS complaints in older toolchains.
    soundMeter.script.onaudioprocess = (event: any) => {
        const input = event.inputBuffer.getChannelData(0);
        let sum = 0.0;
        let clipcount = 0;
        for (let i = 0; i < input.length; ++i) {
            sum += input[i] * input[i];
            if (Math.abs(input[i]) > 0.99) {
                clipcount += 1;
            }
        }
        soundMeter.instant = Math.sqrt(sum / input.length);
        // slow/clip calculations can be added here if needed
    };

    function connectToSource(stream: MediaStream): void {
        soundMeter.mic = context.createMediaStreamSource(stream);
        soundMeter.mic.connect(soundMeter.script);
        // necessary to make script run in some browsers
        soundMeter.script.connect(context.destination);
    }

    function stop(): void {
        if (soundMeter.mic) {
            try { soundMeter.mic.disconnect(); } catch (_) {}
            soundMeter.mic = null;
        }
        try { soundMeter.script.disconnect(); } catch (_) {}
    }

    return {
        context: soundMeter.context,
        get instant() { return soundMeter.instant; },
        connectToSource,
        stop
    } as SoundMeter;
}

















