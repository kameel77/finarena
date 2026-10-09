import { Composition } from "remotion";
import { DURATION, MotoliaDesktop, MotoliaMobile } from "./MotoliaCase";
import { IzzyDesktop, IzzyMobile } from "./IzzyCase";
import { PrintflowDesktop, PrintflowMobile } from "./PrintflowCase";
import { TalentPilotDesktop, TalentPilotMobile } from "./TalentPilotCase";
import { VoicebotDesktop, VoicebotMobile } from "./VoicebotCase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="MotoliaDesktop" component={MotoliaDesktop} durationInFrames={DURATION} fps={30} width={1920} height={1080} />
      <Composition id="MotoliaMobile" component={MotoliaMobile} durationInFrames={DURATION} fps={30} width={1080} height={1350} />
      <Composition id="IzzyDesktop" component={IzzyDesktop} durationInFrames={DURATION} fps={30} width={1920} height={1080} />
      <Composition id="PrintflowDesktop" component={PrintflowDesktop} durationInFrames={DURATION} fps={30} width={1920} height={1080} />
      <Composition id="PrintflowMobile" component={PrintflowMobile} durationInFrames={DURATION} fps={30} width={1080} height={1350} />
      <Composition id="TalentPilotDesktop" component={TalentPilotDesktop} durationInFrames={DURATION} fps={30} width={1920} height={1080} />
      <Composition id="TalentPilotMobile" component={TalentPilotMobile} durationInFrames={DURATION} fps={30} width={1080} height={1350} />
      <Composition id="VoicebotDesktop" component={VoicebotDesktop} durationInFrames={DURATION} fps={30} width={1920} height={1080} />
      <Composition id="VoicebotMobile" component={VoicebotMobile} durationInFrames={DURATION} fps={30} width={1080} height={1350} />
      <Composition id="IzzyMobile" component={IzzyMobile} durationInFrames={DURATION} fps={30} width={1080} height={1350} />
    </>
  );
};
