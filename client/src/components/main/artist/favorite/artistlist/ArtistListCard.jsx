import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistListData } from "../../../../../redux/artistlist/artistListAction";
import axios from "axios";

export default function ArtistListCard({ address }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [checkedInputs, setCheckedInputs] = React.useState([]);

  const dispatch = useDispatch();
  const artistlist = useSelector((state) => state.artistlist);

  React.useEffect(() => {
    dispatch(fetchArtistListData(address)).then(() => {});
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeHandler = async (checked) => {
    const url = "http://localhost:5000/artists/likes/like";
    await axios
      .post(url, address)
      .then((res) => {})
      .catch((err) => alert("회원가입부터하세용.", err));

    if (checked) {
    } else {
    }
  };

  //mui 내용
  function createColumn(id, label, minWidth, align, format) {
    return { id, label, minWidth, align, format };
  }

  //제목리스트 내용
  const columns = [
    { id: "number", label: "Number", minWidth: 30 },
    { id: "artistname", label: "Artist Name", minWidth: 30 },
    { id: "artistsimg", label: "Artist Image", minWidth: 120 },
    { id: "like", label: "Artist Like Count", minWidth: 120 },
    { id: "likecheck", label: "Artist Like Check", minWidth: 120 },
  ];

  //재목안에 넣는 내용 columns 기둥의 id랑 똑같이 적어줘야된다.
  function createRow(number, artistname, artistsimg, like, likecheck) {
    return { number, artistname, artistsimg, like, likecheck };
  }

  //row 안의 value값
  const rows = [];

  console.log(checkedInputs);

  artistlist.artistList.forEach((Artists, index) => {
    rows.push(
      createRow(
        index,
        Artists.artist_name,
        <img src={Artists.img} style={{ width: "100px" }} />,
        Artists.likes,
        <td>
          <input
            type="checkbox"
            onChange={(e) => {
              changeHandler(e.currentTarget.checked);
            }}
          />
        </td>
      )
    );
  });

  return (
    <Paper
      className="table-container"
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// //row 안의 value값
