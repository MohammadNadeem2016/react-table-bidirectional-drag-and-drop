// DroppableContainer.js
import { TableRow } from "@mui/material";
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
const DroppableContainer = ({
  children,
  onDrop,
  index,
  r,
  setIndicatorRowFlag,
  indicatorFlag,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => onDrop(item.id, index),
    collect: (monitor) => ({
      isOver: indicatorFlag === null && monitor.isOver(),
      canDrop: indicatorFlag === null && monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (isOver && Object?.keys(r)?.length > 0 && indicatorFlag === null) {
      setIndicatorRowFlag({ index, id: r?.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r, isOver]);
  return (
    <>
      <style>{keyframes}</style>
      <TableRow
        ref={drop}
        style={{
          ...(isOver && indicatorFlag === null && blinkStyle),
          backgroundColor:
            isOver && canDrop && indicatorFlag === null ? "#D3D3D3" : "#fff",
        }}
        key={`row-${index}`}
        hover
      >
        {children}
      </TableRow>
    </>
  );
};

export default DroppableContainer;
