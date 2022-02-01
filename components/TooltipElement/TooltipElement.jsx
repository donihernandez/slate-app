import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Editor, Range } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import styles from "./TooltipElement.module.css";

const TooltipElement = ({ position }) => {
  const [show, setShow] = useState("visible");
  const [opacity, setOpacity] = useState(1);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    console.log(position);
  }, [position]);

  const tooltipStyle = {
    position: "relative",
    backgroundColor: "#555",
    color: "white",
    padding: "5px 0",
    borderRadius: "5px",
    visibility: show,
    opacity: opacity,
    transition: "all 0.5s",
    textAlign: "center",
    left: `${top}%`,
    zIndex: "1",
  };

  return (
    <Box w={120} style={tooltipStyle} className={styles.tooltip}>
      <p>Hello World</p>
    </Box>
  );
};

export { TooltipElement };
