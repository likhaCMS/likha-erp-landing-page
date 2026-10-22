import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Aspect, FEATURES } from "./brand";
import { AdAudio, Sfx } from "./components/AdAudio";
import { ComponentScene } from "./components/ComponentScene";
import { Intro } from "./components/Intro";
import { Outro } from "./components/Outro";
import { VO_LINES, VOICEOVER_ENABLED } from "./voiceover";

export const INTRO_FRAMES = 120;
export const SCENE_FRAMES = 140;
export const OUTRO_FRAMES = 180;

export const TOTAL_FRAMES =
  INTRO_FRAMES + FEATURES.length * SCENE_FRAMES + OUTRO_FRAMES;

/** Frame each component scene starts at — also the transition SFX cues. */
const SCENE_STARTS = FEATURES.map((_, i) => INTRO_FRAMES + i * SCENE_FRAMES);
const OUTRO_START = INTRO_FRAMES + FEATURES.length * SCENE_FRAMES;

export const LikhaPromo: React.FC<{ aspect: Aspect }> = ({ aspect }) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>
      {FEATURES.map((feature, i) => (
        <Sequence
          key={feature.index}
          from={SCENE_STARTS[i]}
          durationInFrames={SCENE_FRAMES}
        >
          <ComponentScene feature={feature} aspect={aspect} />
        </Sequence>
      ))}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>
      {VOICEOVER_ENABLED ? (
        <>
          <AdAudio lines={VO_LINES} />
          {SCENE_STARTS.map((at) => (
            <Sfx key={at} at={at} file="whoosh" volume={0.5} />
          ))}
          <Sfx at={OUTRO_START} file="chime" volume={0.6} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
