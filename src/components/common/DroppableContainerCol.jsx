import { TableCell } from "@mui/material";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
const keyframes = `
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;

const blinkStyle = {
  animation: "blink .5s linear infinite",
};
const DroppableContainerCol = ({
  children,
  index,
  onDrop,
  setIndicatorFlag,
  indicatorFlag,
  c,
  indicatorRowFlag,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => onDrop(item?.id, item?.index, index),
    collect: (monitor) => ({
      isOver: indicatorRowFlag === null && monitor.isOver(),
    }),
  }));
  useEffect(() => {
    if (isOver && Object?.keys(c)?.length > 0 && indicatorRowFlag === null) {
      setIndicatorFlag({ index, id: c?.name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c, isOver]);

  return (
    <>
      <style>{keyframes}</style>
      <TableCell
        ref={drop}
        style={{
          ...(isOver && blinkStyle),
          backgroundColor:
            indicatorFlag?.index === index
              ? "#D3D3D3"
              : isOver && indicatorRowFlag === null
                ? "#D3D3D3"
                : "#fff",
        }}
        key={`row-${index}`}
      >
        {children}
      </TableCell>
    </>
  );
};

export default DroppableContainerCol;
