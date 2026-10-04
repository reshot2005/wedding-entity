import {
  atelierSignature as signatureMark,
  secondaryPortrait as secondary,
  siteImage,
  studioPortrait as studio,
} from "./siteImages";

export type VisualFrame = {
  src: string;
  alt: string;
};

function frame(index: number, alt: string): VisualFrame {
  return { src: siteImage(index), alt };
}

export const wideStageFrames: VisualFrame[] = [
  frame(0, "A composed wedding portrait in warm architectural light"),
  frame(1, "A couple photographed during a destination wedding celebration"),
  frame(2, "An editorial wedding portrait in a historic garden"),
  frame(3, "Newlyweds surrounded by the atmosphere of their wedding day"),
  frame(4, "A pre-wedding portrait in open landscape"),
  frame(5, "A destination wedding scene rich with color and architecture"),
  frame(6, "An editorial portrait photographed beside the water"),
  frame(7, "A bold editorial wedding portrait"),
  frame(8, "A quiet pre-wedding portrait in open landscape"),
];

export const compactStageFrames: VisualFrame[] = [
  frame(9, "An editorial bridal portrait"),
  frame(10, "A wedding portrait framed by modern architecture"),
  frame(11, "A wedding reception photographed in evening light"),
  frame(12, "A refined wedding portrait with a relaxed editorial feeling"),
  frame(13, "A couple photographed together on their wedding day"),
  frame(14, "An editorial portrait beside painted color"),
  frame(15, "An outdoor wedding celebration in warm light"),
  wideStageFrames[3],
  wideStageFrames[5],
  wideStageFrames[6],
  wideStageFrames[7],
  wideStageFrames[8],
];

export const atelierFrames: VisualFrame[] = [
  frame(16, "Sculptural bridal couture photographed in studio light"),
  frame(17, "A destination wedding photographed beside water"),
  frame(18, "A wedding portrait shaped by natural light"),
  frame(19, "A bridal portrait with a quiet editorial presence"),
  frame(20, "A couple photographed in an open landscape"),
  frame(21, "A wedding day portrait with a documentary feeling"),
  frame(22, "A celebration photographed with an editorial eye"),
  frame(23, "A gathering photographed in late light"),
  frame(24, "A bridal portrait with veil and architectural detail"),
  frame(25, "A wedding celebration photographed in coastal light"),
  frame(26, "A fashion-forward wedding editorial portrait"),
];

export const atelierMarks = [
  { label: "Editorial" },
  { label: "Destination" },
  { label: "Portrait" },
  { label: "Documentary" },
  { label: "Atelier" },
  { label: "Print" },
  { label: "Journal" },
  { label: "Study" },
] as const;

export const atelierSignature = signatureMark;
export const studioPortrait = studio;
export const secondaryPortrait = secondary;
