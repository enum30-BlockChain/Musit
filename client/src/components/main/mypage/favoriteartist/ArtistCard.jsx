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
import LikeCard from "./LikeCard";
import AlbumModel from "./AlbumModel";
import MusicPlayerSlider from "./MusicPlayerSlider";
import "./css/FavoriteAritst.css";
import { Avatar, Box } from "@mui/material";

export default function ArtistCard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [artistModal, setArtistModal] = React.useState("");
  const [musicmodal, setmusicmodal] = React.useState("");

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
    { id: "artistsimg", label: "Artist Image", minWidth: 120 },
    { id: "artistname", label: "Artist Name", minWidth: 30 },
    { id: "like", label: "Artist Like Count", minWidth: 120 },
  ];

  //재목안에 넣는 내용 columns 기둥의 id랑 똑같이 적어줘야된다.
  function createRow(number, artistsimg, artistname, like) {
    return { number, artistsimg, artistname, like };
  }

  const likeArtist = useSelector((state) => state.likeArtist);

  //row 안의 value값
  const rows = [];
  console.log(likeArtist);
  likeArtist.data.forEach((List, index) => {
    rows.push(
      createRow(
        index + 1,
        <Box sx={{ display: "inline-table" }}>
          <Avatar
            src={List.img}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        </Box>,
        List.artist_name,
        // <LikeCard List={List} setArtistModal={setArtistModal} />,
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
        <TableContainer sx={{ maxHeight: 633, width: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth, textAlign: "center" }}
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      style={{ zIndex: "100" }}
                      onClick={() => {
                        console.log(row);
                        console.log(List);
                      }}
                    >
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={index}
                            align={column.align}
                            style={{ zIndex: "1", textAlign: "center" }}
                          >
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

        {artistModal && (
          <AlbumModel
            sx={{ display: "block" }}
            artistModal={artistModal}
            setArtistModal={setArtistModal}
            musicmodal={musicmodal}
            setmusicmodal={setmusicmodal}
          />
        )}

        {musicmodal && (
          <MusicPlayerSlider
            sx={{ display: "block" }}
            musicmodal={musicmodal}
            setmusicmodal={setmusicmodal}
          />
        )}
      </Paper>
    );
}
