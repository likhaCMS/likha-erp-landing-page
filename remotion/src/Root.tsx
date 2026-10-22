import { Composition } from "remotion";
import { AD_DIMS } from "./brand";
import { LikhaPromo, TOTAL_FRAMES } from "./LikhaPromo";
import { Thumbnail } from "./components/Thumbnail";

/**
 * One comp per aspect — registered literally (not in a loop) so Remotion
 * Studio can list and edit each. 16:9 = YouTube/web, 1:1 = FB/IG feed,
 * 9:16 = Reels/TikTok/Shorts.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LikhaPromo-16x9"
        component={LikhaPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={AD_DIMS["16:9"].width}
        height={AD_DIMS["16:9"].height}
        defaultProps={{ aspect: "16:9" as const }}
      />
      <Composition
        id="LikhaPromo-1x1"
        component={LikhaPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={AD_DIMS["1:1"].width}
        height={AD_DIMS["1:1"].height}
        defaultProps={{ aspect: "1:1" as const }}
      />
      <Composition
        id="LikhaPromo-9x16"
        component={LikhaPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={AD_DIMS["9:16"].width}
        height={AD_DIMS["9:16"].height}
        defaultProps={{ aspect: "9:16" as const }}
      />
      {/* Static thumbnail frames — render a still at frame 150+ (mocks filled in) */}
      <Composition
        id="Thumb-16x9"
        component={Thumbnail}
        durationInFrames={200}
        fps={30}
        width={AD_DIMS["16:9"].width}
        height={AD_DIMS["16:9"].height}
        defaultProps={{ aspect: "16:9" as const }}
      />
      <Composition
        id="Thumb-1x1"
        component={Thumbnail}
        durationInFrames={200}
        fps={30}
        width={AD_DIMS["1:1"].width}
        height={AD_DIMS["1:1"].height}
        defaultProps={{ aspect: "1:1" as const }}
      />
      <Composition
        id="Thumb-9x16"
        component={Thumbnail}
        durationInFrames={200}
        fps={30}
        width={AD_DIMS["9:16"].width}
        height={AD_DIMS["9:16"].height}
        defaultProps={{ aspect: "9:16" as const }}
      />
    </>
  );
};
