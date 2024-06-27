## react-drag-and-drop-table

This package will do drag and drop of a table rows and columns both.

## Installation

```bash
npm install react-drag-and-drop-table OR npm install react-drag-and-drop-table  --legacy-peer-deps

OR

yarn add react-drag-and-drop-table OR yarn add react-drag-and-drop-table  --legacy-peer-deps
```
## Usage

```javascript
<!-- How to import package -->
import { TableDragAndDrop } from "react-drag-and-drop-table";
<!-- How to define rows -->
const [tableRows, setTableRows] = useState([
    {
      name: "Design count Making",
      id: "2f251f31-4d52-4c6d-b383-3e35b2257beb",
      message: "Npm",
      created_by: "Mohammad",
      file_count: 1,
      days: "Monday",
      date: "27-June-2024",
      status: "Complete",
    },
    {
      name: "LC_finacle_brd",
      id: "149e7dd4-a537-452e-9346-ab19194ea96d",
      message: "Package",
      created_by: "Nadeem",
      file_count: 1,
      days: "Tuesday",
      date: "27-June-2024",
      status: "Ready",
    },
    {
      name: "BRD",
      id: "1",
      message: "Storybook",
      created_by: "Amans",
      file_count: 1,
      days: "Wednesday",
      date: "27-June-2024",
      status: "Review",
    },
    {
      name: "Coverage",
      id: "2",
      message: "React.JS",
      created_by: "Maans",
      file_count: 1,
      days: "Thursday",
      date: "27-June-2024",
      status: "In_Progress",
    },
  ]);

<!-- How to define columns -->
const [columns, setColumns] = useState([
    {
      name: "name",
      displayName: "Name",
      minWidth: 240,
      maxWidth: 300,
      render: (r) =>
        r && r?.name ? (
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <IconButton size="small">
              <FaFolder size={12} color="#F8D775" />
            </IconButton>
            <Text color="primary" semibold>
              {r?.name}
            </Text>
          </Box>
        ) : (
          "N/A"
        ),
    },
    {
      name: "created_by",
      displayName: "Created By",
      render: (r) =>
        r && r?.created_by ? <Text>{r?.created_by}</Text> : "N/A",
    },
    {
      name: "days",
      displayName: "Days",
      render: (r) => (r && r?.days ? <Text>{r?.days}</Text> : "N/A"),
    },
    {
      name: "date",
      displayName: "Date",
      render: (r) => (r && r?.date ? <Text>{r?.date}</Text> : "N/A"),
    },
    {
      name: "status",
      displayName: "Status",
      render: (r) => (r && r?.status ? <Text>{r?.status}</Text> : "N/A"),
    },
    {
      name: "message",
      displayName: "Message",
      render: (r) => (r && r?.message ? <Text>{r?.message}</Text> : "N/A"),
    },

    {
      name: "file_count",
      displayName: "Files Count",
      render: (r) =>
        r && r?.file_count ? <Text>{r?.file_count}</Text> : "N/A",
    },
    {
      name: "actions",
      displayName: "Actions",
      render: (r) =>
        r &&
        r?.id && (
          <OptionMenu
            options={[
              {
                icon: <FiTrash2 />,
                name: "delete",
                displayName: "Delete",
                onClick: () => {},
              },
            ]}
          />
        ),
    },
  ]);
<!-- How to use component -->
  <TableDragAndDrop
          rows={tableRows}
          columns={columns}
          msg={"No results found"}
          height={"0.1rem"}
          setTableRows={setTableRows}
          setColumns={setColumns}
        />

```
## License

This project is licensed under the MIT License.

## Author

- **Mohammad Nadeem**
  <!-- - GitHub: (https://github.com/your-username) -->
  - LinkedIn: (https://in.linkedin.com/in/mohammad-nadeem-044418136)