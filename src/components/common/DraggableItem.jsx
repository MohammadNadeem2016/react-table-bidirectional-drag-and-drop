// DraggableItem.js
import { TableCell, useTheme } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";
import Text from "../text.jsx";
import { RiDragMove2Line } from "react-icons/ri";
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
const DraggableItem = ({
  id,
  index,
  r,
  columns,
  isHeight,
  height,
  classes,
  indicatorFlag,
  indicatorRowFlag,
}) => {
  const theme = useTheme();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.3 : 1,
    cursor: isDragging ? "move" : "default",
  };

  return (
    <>
      <style>{keyframes}</style>
      <TableCell
        ref={drag}
        style={{
          cursor: "move",
          backgroundColor: isDragging ? "#D3D3D3" : "#fff",
          opacity: isDragging ? 0.3 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RiDragMove2Line size={theme?.spacing(4)} color="#D3D3D3" />
      </TableCell>
      {columns.map((c, colIndex) => (
        <TableCell
          className={isHeight && classes.customCell}
          style={{
            ...style,
            ...((indicatorFlag?.id === c?.name ||
              indicatorRowFlag?.id === id) &&
              blinkStyle),
            padding: `${height || "0rem"} 1rem`,
            backgroundColor:
              indicatorFlag?.id === c?.name || indicatorRowFlag?.id === id
                ? "#D3D3D3"
                : isDragging
                ? "#D3D3D3"
                : "#fff",
          }}
          key={colIndex}
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
