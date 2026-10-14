"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
export type SketchPoint = { x: number; y: number };
type Sketch = SketchPoint[][];
const ScribbleContext = createContext<{
  sketch: Sketch;
  publishSketch: (next: Sketch) => void;
}>({ sketch: [], publishSketch: () => {} });
export function ScribbleTheme({ children }: { children: React.ReactNode }) {
  const [sketch, setSketch] = useState<Sketch>([]);
  const publishSketch = useCallback(
    (next: Sketch) =>
      setSketch((previous) =>
        previous.length === 0 && next.length === 0 ? previous : next,
      ),
    [],
  );
  const value = useMemo(
    () => ({ sketch, publishSketch }),
    [sketch, publishSketch],
  );
  return (
    <ScribbleContext.Provider value={value}>
      {children}
    </ScribbleContext.Provider>
  );
}
export function useScribbleTheme() {
  return useContext(ScribbleContext);
}
