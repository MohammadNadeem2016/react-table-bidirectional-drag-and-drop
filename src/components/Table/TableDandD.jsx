import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Table as MaterialTable,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import Text from "../text.jsx";
import DndContext from "../common/DndContext.jsx";
import DroppableContainerCol from "../common/DroppableContainerCol.jsx";
import DraggableItemCol from "../common/DraggableItemCol.jsx";
import DroppableContainer from "../common/DroppableContainer.jsx";
import DraggableItem from "../common/DraggableItem.jsx";
// import PropTypes from "prop-types";
const useStyles = styled((theme) => ({
  customCell: {
    padding: "0px 1rem",
  },
  customTableContainer: {
    overflowX: "initial",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px !important", // Set the width of the scrollbar
      height: "6px !important",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "3px", // Set the background color of the scrollbar track
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#e4e4e4",
      height: "3px",
      borderRadius: "3px", // Set the border radius of the scrollbar thumb
      opacity: 0.5,
    },
  },
}));
const TableDragAndDrop = ({
  rows,
  columns,
  size,
  height,
  isHeight,
  setTableRows,
  setColumns,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [indicatorFlag, setIndicatorFlag] = useState(null);
  const [indicatorRowFlag, setIndicatorRowFlag] = useState(null);
  const handleDrop = (draggedId, targetIndex) => {
    const presentID = rows?.some((data) => data?.id === draggedId);
    if (presentID) {
      setTableRows((prev) => {
        const draggedIndex = prev.findIndex((item) => item.id === draggedId);
        const updatedItems = [...prev];
        const [draggedItem] = updatedItems.splice(draggedIndex, 1);
        updatedItems.splice(targetIndex, 0, draggedItem);
        return updatedItems;
      });
    }
    setIndicatorRowFlag(null);
    setIndicatorFlag(null);
  };

  const handleDropCol = (draggedColId, draggedColIndex, targetColIndex) => {
    const presentID = columns?.some((data) => data?.name === draggedColId);
    if (presentID) {
      setColumns((prev) => {
        const updatedItems = [...prev];
        const [draggedItem] = updatedItems.splice(draggedColIndex, 1);
        updatedItems.splice(targetColIndex, 0, draggedItem);
        return updatedItems;
      });
    }
    setIndicatorFlag(null);
    setIndicatorRowFlag(null);
  };
  return rows && rows.length > 0 ? (
    <DndContext>
      <TableContainer classes={{ root: classes.customTableContainer }}>
        <MaterialTable size={size} stickyHeader>
          <TableHead>
            <TableRow hover>
              <TableCell />
              {columns &&
                columns.map((c, index) => (
                  <DroppableContainerCol
                    key={`col-${index}`}
                    index={index}
                    onDrop={handleDropCol}
                    setIndicatorFlag={setIndicatorFlag}
                    indicatorFlag={indicatorFlag}
                    c={c}
                    indicatorRowFlag={indicatorRowFlag}
                  >
                    <DraggableItemCol
                      theme={theme}
                      id={c?.name}
                      c={c}
                      index={index}
                      indicatorFlag={indicatorFlag}
                      indicatorRowFlag={indicatorRowFlag}
                    />
                  </DroppableContainerCol>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, index) => (
              <DroppableContainer
                index={index}
                onDrop={handleDrop}
                r={r}
                setIndicatorRowFlag={setIndicatorRowFlag}
                indicatorFlag={indicatorFlag}
              >
                <DraggableItem
                  key={r?.id}
                  id={r?.id}
                  index={index}
                  r={r}
                  columns={columns}
                  isHeight={isHeight}
                  height={height}
                  classes={classes}
                  indicatorFlag={indicatorFlag}
                  indicatorRowFlag={indicatorRowFlag}
                />
              </DroppableContainer>
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </DndContext>
  ) : (
    <Box
      height="90%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color={theme.palette.grey[500]} semibold>
        No records found
      </Text>
    </Box>
  );
};

// TableDragAndDrop.propTypes = {
//   rows: PropTypes.array,
//   columns: PropTypes.array,
//   msg: PropTypes.string,
//   setTableRows: PropTypes.func,
//   setColumns: PropTypes.func,
// };
export default TableDragAndDrop;
