import "./App.css";
import React, { useState } from "react";
import "react-color-palette/lib/css/styles.css";
import { ColorPicker, useColor, toColor } from "react-color-palette";
import useEyeDropper from "use-eye-dropper";
import { ImEyedropper } from "react-icons/im";
import { BiCopy } from "react-icons/bi";
import { BsCheck2 } from "react-icons/bs";

const App = () => {
  const { open } = useEyeDropper();
  const [color, setColor] = useColor("hex", "#121212");
  const [selectedProjectColor, setSelectedProjectColor] = useState();
  const [selectedImageColor, setSelectedImageColor] = useState();
  const [selectedPresetsColor, setSelectedPresetsColor] = useState();
  const [error, setError] = useState();
  const projectColors = [
    { color: "#000000", checkColor: "#fff" },
    { color: "#0a0001", checkColor: "#fff" },
    { color: "#be9ffe", checkColor: "#000" },
    { color: "#ffffff", checkColor: "#000" },
  ];
  const imageColors = ["#e9eae4", "#f5f5f3", "#edede9", "#eaeae8", "#e7eae3", "#e3e4e0"];
  const presetsColors = ["#f64339", "#ff9900", "#ffee57", "#67ba6b", "#25a69a", "#02a9f4", "#3f50b5", "#673ab7", "#9b28af", "#ec4079", "#8b6e63", "#d9d9d9"];

  const pickColor = () => {
    open()
      .then((color) => {
        setColor(toColor("hex", color.sRGBHex));
      })
      .catch((e) => {
        if (!e.canceled) setError(e);
      });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="text-area">
          <label>Text Field</label>
          <div style={{ paddingTop: "15px" }}>
            <ColorPicker width={310} height={160} color={color} onChange={setColor} hideHSV dark hideRGB alpha hideHEX />
            <input className="text-input" value={color.hex} />
            <BiCopy color="#f1efe0" size={20} className="icon-copy" onClick={() => navigator.clipboard.writeText(color.hex)} />
            <ImEyedropper color="#e3e3e3" onClick={pickColor} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className="presets">
          <h5 className="title-presets">Presets</h5>
          <label>Project Colors</label>
          <div className="color-wrapper">
            {projectColors.map((item) => (
              <div
                className={`color-item${selectedProjectColor === item.color ? " selected" : ""}`}
                style={{ background: item.color }}
                onClick={() => {
                  setSelectedProjectColor(item.color);
                  setColor(toColor("hex", item.color));
                }}
              >
                {selectedProjectColor === item.color && <BsCheck2 size={20} color={item.checkColor} />}
              </div>
            ))}
          </div>
          <label>Image Colors</label>
          <div className="color-wrapper">
            {imageColors.map((item) => (
              <div
                className={`color-item${selectedImageColor === item ? " selected" : ""}`}
                style={{ background: item }}
                onClick={() => {
                  setSelectedImageColor(item);
                  setColor(toColor("hex", item));
                }}
              >
                {selectedImageColor === item && <BsCheck2 size={20} />}
              </div>
            ))}
          </div>
          <label>Presets</label>
          <div className="color-wrapper">
            {presetsColors.map((item) => (
              <div
                className={`color-item${selectedPresetsColor === item ? " selected" : ""}`}
                style={{ background: item }}
                onClick={() => {
                  setSelectedPresetsColor(item);
                  setColor(toColor("hex", item));
                }}
              >
                {selectedPresetsColor === item && <BsCheck2 size={20} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
