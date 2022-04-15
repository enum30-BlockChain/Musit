import "./FavoriteArtist.css";

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
import { Avatar } from "@mui/material";
import ArtistCard from "./ArtistCard";
import ArtistModal from "./ArtistModal";

export default function ArtistList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [musicmodal, setmusicmodal] = React.useState("");
  const [artistModal, setArtistModal] = React.useState("");

  const dispatch = useDispatch();
  const likeArtist = useSelector((state) => state.likeArtist);

  React.useEffect(() => {}, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  ///////////////////////////////////////////////////////////////
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
  ];

  //재목안에 넣는 내용 columns 기둥의 id랑 똑같이 적어줘야된다.
  function createRow(number, artistname, artistsimg, like) {
    return { number, artistname, artistsimg, like };
  }

  //row 안의 value값
  const rows = [];

  likeArtist.data.forEach((List, index) => {
    rows.push(
      createRow(
        index,
        List.artist_name,
        <div className="img-box" style={{ width: "200px", height: "200px" }}>
          <ArtistCard List={List} setArtistModal={setArtistModal} />
        </div>,
        List.likes
      )
    );
  });

  if (likeArtist.error) {
    return <>error</>;
  } else
    return (
      <Paper
        className="table-container"
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
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
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
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
        {/* 모달창입니당 */}
        {artistModal && (
          <ArtistModal
            sx={{ display: "block" }}
            artistModal={artistModal}
            setArtistModal={setArtistModal}
            setmusicmodal={setmusicmodal}
          />
        )}
      </Paper>
    );
}
