import React, { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

// ✅ Define TypeScript Interface for WordCloud Options
interface WordCloudOptions {
  list: [string, number][];
  gridSize?: number;
  weightFactor?: (size: number) => number;
  fontFamily?: string;
  color?: string;
  rotateRatio?: number;
  rotationSteps?: number;
  backgroundColor?: string;
  shrinkToFit?: boolean;
  ellipticity?: number;
  minSize?: number;
  origin?: [number, number];
}

// ✅ Function to shuffle words for better distribution
const shuffleArray = (array: [string, number][]) => {
  return array.sort(() => Math.random() - 0.5);
};

// 🔹 **Duplicate the word list to increase density**
const baseWords: [string, number][] = [
  ["Data Visualization", 50],
  ["Power BI", 45],
  ["Tableau", 40],
  ["D3.js", 35],
  ["Chart.js", 30],
  ["SQL", 50],
  ["Python", 45],
  ["JavaScript", 40],
  ["React", 40],
  ["Dashboards", 35],
  ["Machine Learning", 50],
  ["Storytelling", 55],
  ["ETL", 40],
  ["Data Analysis", 60],
  ["Azure Synapse", 50],
  ["Looker", 45],
  ["Statistics", 40],
  ["Critical Thinking", 35],
  ["Problem-Solving", 40],
  ["Communication", 35],
  ["Decision-Making", 30],
  ["Collaboration", 40],
  ["Adaptability", 35],
  ["Leadership", 40],
  ["Time Management", 35],
  ["Creativity", 30],
  ["Attention to Detail", 40],
  ["Project Management", 35],
  ["Teamwork", 40],
  ["Business Intelligence", 50],
  ["Data Storytelling", 45],
  ["Predictive Analytics", 40],
  ["A/B Testing", 35],
  ["Data Governance", 30],
  ["KPI Analysis", 35],
  ["Data Modeling", 40],
  ["SQL Queries", 30],
  ["Data Wrangling", 40],
  ["Big Data", 35],
  ["Exploratory Data Analysis", 40],
  ["Data Cleaning", 35],
  ["Data-Driven Decisions", 40],
];

// 🔹 **Create multiple copies of the word list to increase coverage**
const words: [string, number][] = shuffleArray(
  baseWords.flatMap((word) => [
    word,
    [word[0], word[1] - 5], // Slight variation in size
    [word[0], word[1] - 10],
    [word[0], word[1] - 15],
  ])
);

const WordCloudBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // ✅ Make sure canvas takes full screen size
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // ✅ Scale factor to ensure words properly fit the screen
      const scaleFactor = Math.min(width, height) / 100; // Adjust dynamically

      // ✅ Define `wordCloudOptions` using the interface
      const wordCloudOptions: WordCloudOptions = {
        list: words,
        gridSize: Math.round(2 * scaleFactor),
        weightFactor: (size: number) => (size / 4.0) * scaleFactor,
        fontFamily: "Arial",
        color: "rgba(33, 42, 49, 0.7)", // ✅ Uniform color
        rotateRatio: 0.1, // ✅ Keeps most words horizontal
        rotationSteps: 2, // ✅ Only horizontal & vertical words
        backgroundColor: "#D3D9D4",
        shrinkToFit: true, // ✅ Ensures all words fit properly
        ellipticity: 0.9, // ✅ Ensures full screen coverage
        minSize: 5, // ✅ Ensures even small words appear
        origin: [width / 2, height / 2], // ✅ Centers the word cloud properly
      };

      // ✅ Generate the word cloud
      WordCloud(canvas, wordCloudOptions);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        filter: "brightness(0.5)", // Reduced brightness of the background
      }}
    />
  );
};

export default WordCloudBackground;
