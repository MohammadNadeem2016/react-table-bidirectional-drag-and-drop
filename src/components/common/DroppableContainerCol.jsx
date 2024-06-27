import { TableCell } from "@mui/material";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";

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
    <TableCell
      ref={drop}
      style={{
        backgroundColor:
          indicatorRowFlag === null && indicatorFlag?.index === index
            ? "#ededed"
            : isOver && indicatorRowFlag === null
            ? "#D3D3D3"
            : "#fff",
        minWidth: c.minWidth || 80,
        maxWidth: c.maxWidth || 240,
        padding: "8px",
      }}
      key={`row-${index}`}
    >
      {children}
    </TableCell>
  );
};

export default DroppableContainerCol;
