import { TablePagination } from "@mui/material";

const RequestListPagination = ({
  count, rowsPerPage, page, onPageChange, onRowsPerPageChange
}) => (
  <TablePagination
    rowsPerPageOptions={[10, 25, 50, 100]}
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    sx={{
      borderTop: "1px solid",
      borderColor: "divider",
      backgroundColor: "background.default",
    }}
  />
);

export default RequestListPagination;
