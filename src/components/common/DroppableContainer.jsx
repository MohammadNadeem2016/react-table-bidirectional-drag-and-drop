// DroppableContainer.js
import { TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useDrop } from "react-dnd";

const DroppableContainer = ({
  children,
  onDrop,
  index,
  r,
  setIndicatorRowFlag,
  indicatorFlag,
  setSorting,
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
      setSorting({
        column: null,
        direction: "desc",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r, isOver]);
  return (
    <TableRow
      ref={drop}
      style={{
        backgroundColor:
          isOver && canDrop && indicatorFlag === null ? "#D3D3D3" : "#fff",
      }}
      key={`row-${index}`}
    >
      {children}
    </TableRow>
  );
};

export default DroppableContainer;
