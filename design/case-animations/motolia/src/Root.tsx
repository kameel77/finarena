import { Composition } from "remotion";
import { DURATION, MotoliaDesktop, MotoliaMobile } from "./MotoliaCase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="MotoliaDesktop" component={MotoliaDesktop} durationInFrames={DURATION} fps={30} width={1920} height={1080} />
      <Composition id="MotoliaMobile" component={MotoliaMobile} durationInFrames={DURATION} fps={30} width={1080} height={1350} />
    </>
  );
};
