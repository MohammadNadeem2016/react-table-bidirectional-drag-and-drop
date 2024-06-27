import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import Text from "../text.jsx";
import { TableSortLabel } from "@mui/material";

const DraggableItemCol = ({
  theme,
  id,
  c,
  index,
  indicatorFlag,
  indicatorRowFlag,
  handleSort,
  sorting,
  setColBlurFlag,
}) => {
  const [{ isDragging, item }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: indicatorRowFlag === null && monitor.isDragging(),
      item: monitor.getItem(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.3 : 1,
    backgroundColor: indicatorFlag?.index === index ? "#D3D3D3" : "#fff",
    padding: "8px",
    display: "block",
    cursor: "move",
  };
  useEffect(() => {
    setColBlurFlag(item?.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  return (
    <td ref={drag} key={index} style={style}>
      <TableSortLabel
        active={sorting.column === c.name.toLowerCase()}
        direction={
          sorting.column === c.name.toLowerCase() ? sorting.direction : "asc"
        }
        onClick={() => handleSort(c.name)}
      >
        <Text
          semibold
          color={isDragging ? "#0070FF" : theme.palette.grey[500]}
          style={{
            backgroundColor:
              indicatorFlag?.index === index ? "#D3D3D3" : "#fff",
            cursor: "move",
          }}
          fontSize={theme.typography.fontSize - 1}
        >
          {c.displayName}
        </Text>
      </TableSortLabel>
    </td>
  );
};

export default DraggableItemCol;
