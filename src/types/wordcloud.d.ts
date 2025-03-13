declare module "wordcloud" {
  export default function WordCloud(
    canvas: HTMLCanvasElement | HTMLElement,
    options?: {
      list?: [string, number][];
      gridSize?: number;
      weightFactor?: number | ((size: number) => number);
      fontFamily?: string;
      color?: string | ((word: string, weight: number, fontSize: number, distance: number) => string);
      backgroundColor?: string;
      rotateRatio?: number;
      rotationSteps?: number;
    }
  ): void;
}
