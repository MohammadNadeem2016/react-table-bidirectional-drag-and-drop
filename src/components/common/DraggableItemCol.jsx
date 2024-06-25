import React from "react";
import { useDrag } from "react-dnd";
import Text from "../text.jsx";

const DraggableItemCol = ({
  theme,
  id,
  c,
  index,
  indicatorFlag,
  indicatorRowFlag,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: indicatorRowFlag === null && monitor.isDragging(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.3 : 1,
    backgroundColor: indicatorFlag?.index === index ? "#D3D3D3" : "#fff",
    cursor: isDragging ? "move" : "default",
  };
  return (
    <td ref={drag} key={index} style={style}>
      <Text
        semibold
        color={isDragging ? "#0070FF" : theme.palette.grey[500]}
        style={{
          backgroundColor: indicatorFlag?.index === index ? "#D3D3D3" : "#fff",
          cursor: "move",
        }}
        fontSize={theme.typography.fontSize - 1}
      >
        {c.displayName}
      </Text>
    </td>
  );
};

export default DraggableItemCol;
