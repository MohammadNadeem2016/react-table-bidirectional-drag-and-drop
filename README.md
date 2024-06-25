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
      description: "",
      created_by: "Mohammad",
      created_on: "2024-05-24T07:42:53.319375",
      file_count: 1,
    },
    {
      name: "LC_finacle_brd",
      id: "149e7dd4-a537-452e-9346-ab19194ea96d",
      description: "",
      created_by: "Nadeem",
      created_on: "2024-05-14T10:31:54.717724",
      file_count: 1,
    },
    {
      name: "BRD",
      id: "1",
      description: "",
      created_by: "Genuis",
      created_on: "2024-05-14T10:31:54.717724",
      file_count: 1,
    },
    {
      name: "Coverage",
      id: "2",
      description: "",
      created_by: "Master",
      created_on: "2024-05-14T10:31:54.717724",
      file_count: 1,
    },
  ]);

<!-- How to define columns -->
 const [columns, setColumns] = useState([
    {
      name: "name",
      displayName: "Name",
      render: (r) =>
        r && r?.name ? (
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <IconButton
              icon={<FaFolder size={12} color="#F8D775" />}
              size="small"
            />
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
      name: "message",
      displayName: "Message",
      render: (r) => (r && r?.created_on ? <Text>Hello word</Text> : "N/A"),
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
          setTableRows={setTableRows}
          setColumns={setColumns}
        />

```
## License

This project is licensed under the MIT License.

## Author

- **Mohammad Nadeem**
  - GitHub: (https://github.com/your-username)
  - LinkedIn: (https://in.linkedin.com/in/mohammad-nadeem-044418136)