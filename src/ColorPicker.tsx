import { useAtom } from "jotai";
import React, { useState } from "react";
import { colorAtom } from "./constants";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useAtom(colorAtom);

  const [hslColor, setHslColor] = useState<string>("hsl(0, 100%, 50%)");
  const [rgbColor, setRgbColor] = useState<string>(
    `rgb(${color.r}, ${color.g}, ${color.b})`
  );
  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(100);
  const [lightness, setLightness] = useState<number>(50);

  const handleColorChange = (property: string, value: number) => {
    const newHslColor =
      property === "hue"
        ? `hsl(${value}, ${saturation}%, ${lightness}%)`
        : `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    setHslColor(newHslColor);

    const [r, g, b] = hslToRgb(
      property === "hue" ? value : hue,
      property === "saturation" ? value : saturation,
      property === "lightness" ? value : lightness
    );

    setRgbColor(`rgb(${r}, ${g}, ${b})`);
    setColor({ r, g, b });

    switch (property) {
      case "hue":
        setHue(value);
        break;
      case "saturation":
        setSaturation(value);
        break;
      case "lightness":
        setLightness(value);
        break;
      default:
        break;
    }
  };

  const hslToRgb = (h: number, s: number, l: number): number[] => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  return (
    <div style={{ float: "right" }}>
      <div>
        <label htmlFor="hue">Hue:</label>
        <input
          type="range"
          id="hue"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => handleColorChange("hue", Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="saturation">Saturation:</label>
        <input
          type="range"
          id="saturation"
          min="0"
          max="100"
          value={saturation}
          onChange={(e) =>
            handleColorChange("saturation", Number(e.target.value))
          }
        />
      </div>
      <div>
        <label htmlFor="lightness">Lightness:</label>
        <input
          type="range"
          id="lightness"
          min="0"
          max="100"
          value={lightness}
          onChange={(e) =>
            handleColorChange("lightness", Number(e.target.value))
          }
        />
      </div>
      {hslColor && <div>Picked Color (HSL): {hslColor}</div>}
      {rgbColor && <div>Picked Color (RGB): {rgbColor}</div>}
      <div
        style={{ width: "50px", height: "50px", backgroundColor: rgbColor }}
      ></div>
    </div>
  );
};

export default ColorPicker;
