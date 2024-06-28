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
import React, { useEffect, useState } from "react";
import Text from "../text.jsx";
import DndContext from "../common/DndContext.jsx";
import DroppableContainerCol from "../common/DroppableContainerCol.jsx";
import DraggableItemCol from "../common/DraggableItemCol.jsx";
import DroppableContainer from "../common/DroppableContainer.jsx";
import DraggableItem from "../common/DraggableItem.jsx";

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
  height,
  setTableRows,
  setColumns,
  msg,
}) => {
  const theme = useTheme();
  const [indicatorFlag, setIndicatorFlag] = useState(null);
  const [indicatorRowFlag, setIndicatorRowFlag] = useState(null);
  const [colBlurFlag, setColBlurFlag] = useState(null);
  const [sorting, setSorting] = useState({
    column: null,
    direction: "desc",
  });

  const handleSort = (columnName) => {
    setSorting((prevSorting) => ({
      column: columnName,
      direction:
        prevSorting.column === columnName && prevSorting.direction === "desc"
          ? "asc"
          : "desc",
    }));
  };

  const sortedData = React.useMemo(() => {
    if (sorting.column) {
      const sortedArray = [...rows].sort((a, b) => {
        const valueA = a[sorting.column];
        const valueB = b[sorting.column];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sorting.direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
        return sorting.direction === "asc" ? valueA - valueB : valueB - valueA;
      });

      return sortedArray;
    }

    return rows;
  }, [rows, sorting]);

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

  let sortedRows = sortedData;
  useEffect(() => {
    if (!!sorting?.column) {
      setTableRows(sortedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  return rows && rows.length > 0 ? (
    <DndContext>
      <TableContainer id="tableContainer">
        <MaterialTable stickyHeader>
          <TableHead>
            <TableRow hover>
              <TableCell />
              <TableCell
                style={{
                  minWidth: 80,
                  maxWidth: 80,
                }}
              >
                <Text
                  semibold
                  color={theme.palette.grey[500]}
                  fontSize={theme.typography.fontSize - 1}
                >
                  S. No.
                </Text>
              </TableCell>
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
                      handleSort={handleSort}
                      sorting={sorting}
                      setColBlurFlag={setColBlurFlag}
                    />
                  </DroppableContainerCol>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows?.map((r, index) => (
              <DroppableContainer
                index={index}
                onDrop={handleDrop}
                r={r}
                setIndicatorRowFlag={setIndicatorRowFlag}
                indicatorFlag={indicatorFlag}
                setSorting={setSorting}
              >
                <DraggableItem
                  key={r?.id}
                  id={r?.id}
                  index={index}
                  r={r}
                  columns={columns}
                  height={height}
                  indicatorFlag={indicatorFlag}
                  indicatorRowFlag={indicatorRowFlag}
                  colBlurFlag={colBlurFlag}
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
        {msg}
      </Text>
    </Box>
  );
};

export default TableDragAndDrop;
