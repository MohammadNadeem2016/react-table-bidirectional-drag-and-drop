// DraggableItem.js
import { TableCell, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Text from "../text.jsx";
import { RiDragMove2Line } from "react-icons/ri";

const DraggableItem = ({
  id,
  index,
  r,
  columns,
  height,
  indicatorFlag,
  indicatorRowFlag,
  colBlurFlag,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const style = {
    cursor: isDragging ? "move" : "default",
  };

  return (
    <>
      <TableCell
        ref={drag}
        style={{
          cursor: "move",
          backgroundColor: isHovered
            ? "#ededed"
            : isDragging
            ? "#D3D3D3"
            : "#fff",
          opacity: isDragging ? 0.3 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RiDragMove2Line size={theme?.spacing(4)} color="#D3D3D3" />
      </TableCell>
      <TableCell
        style={{
          padding: `${height || "0rem"} 1rem`,
          opacity: isDragging ? 0.3 : 1,
          backgroundColor: isHovered
            ? "#ededed"
            : indicatorRowFlag?.id === id
            ? "#ededed"
            : isDragging
            ? "#D3D3D3"
            : "#fff",
        }}
      >
        {index + 1}
      </TableCell>
      {columns.map((c, colIndex) => (
        <TableCell
          style={{
            ...style,
            padding: `${height || "0rem"} 1rem`,
            opacity:
              isDragging ||
              (colBlurFlag === colIndex && indicatorRowFlag === null)
                ? 0.3
                : 1,
            backgroundColor: isHovered
              ? "#ededed"
              : indicatorFlag?.id === c?.name || indicatorRowFlag?.id === id
              ? "#ededed"
              : isDragging
              ? "#D3D3D3"
              : "#fff",
          }}
          key={colIndex}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {renderCellContent(r, c)}
        </TableCell>
      ))}
    </>
  );
};
const renderCellContent = (row, column) => {
  const { name, render } = column;
  let returnComponent;
  if (render) {
    returnComponent = render(row);
  } else {
    returnComponent = <Text>{row[name]}</Text>;
  }

  return returnComponent;
};
export default DraggableItem;
