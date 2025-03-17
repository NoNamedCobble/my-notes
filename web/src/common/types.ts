export type Position = {
  x: number;
  y: number;
};

export interface DotsProps {
  maxDotLength: number;
  minDotLength: number;
  multiplier: number;
  amount: number;
}

export type NoteProps = {
  _id: string;
  title: string;
  content: string;
};
