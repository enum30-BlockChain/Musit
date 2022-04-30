import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector, useDispatch } from "react-redux";
import AlbumCard from "./AlbumCard";
import AlbumModel from "./AlbumModel";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

export default function AlbumList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [musicmodal, setmusicmodal] = React.useState("");
  const [musicEditModal, setMusicEditModal] = React.useState(false);
  const [upLoadMusic, setupLoadMusic] = React.useState([]);
  const location = useLocation();
  const content = location.state !== null || undefined ? location.state : "";
  const artist = useSelector((state) => state.artist);

  useEffect(() => {
    let Box = [...artist.Music];
    if (content === "") {
      setupLoadMusic(Box);
    } else {
      let searchCount = Box.filter((a) => a.title.indexOf(content) > -1);

      searchCount.map((a) => {
        Box.splice(
          Box.findIndex((music) => music.ipfs_hash === a.ipfs_hash),
          1
        );
      });
      Box.unshift(...searchCount);
    }
    setupLoadMusic(Box);
  }, [artist]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openModal = (song) => {
    setMusicEditModal(song);
  };

  //mui 내용
  function createColumn(id, label, minWidth, align, format) {
    return { id, label, minWidth, align, format };
  }

  //제목리스트 내용
  const columns = [
    { id: "number", label: "Number", minWidth: 30 },
    { id: "title", label: "Title", minWidth: 30 },
    { id: "artist", label: "Artist Name", minWidth: 30 },
    { id: "albumimg", label: "Album Cover", minWidth: 120 },
    { id: "edit", label: "edit", minWidth: 50 },
  ];

  //재목안에 넣는 내용 columns 기둥의 id랑 똑같이 적어줘야된다.
  function createRow(number, title, artist, albumimg, edit) {
    return { number, title, artist, albumimg, edit };
  }

  const rows = [];

  upLoadMusic &&
    upLoadMusic.forEach((song, index) => {
      rows.push(
        createRow(
          index,
          song.title,
          song.artist_name,
          <AlbumCard song={song} setmusicmodal={setmusicmodal} />,
          <Button
            variant="contained"
            onClick={() => {
              openModal(song);
            }}
            sx={{
              width: 100,
              color: "var(--black-light-color)",
              backgroundColor: "var(--box1-color)",
              ":hover": {
                background: "var(--primary-color)",
                color: "var(--text-color)",
              },
            }}
          >
            Edit
          </Button>
        )
      );
    });

  return (
    <Paper
      className="table-container"
      sx={{
        mx: "auto",
        width: "100%",
        overflow: "hidden",
        bgcolor: "var(--box1-color)",
      }}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    textAlign: "center",
                  }}
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
                        <TableCell
                          key={index}
                          align={column.align}
                          style={{ textAlign: "-webkit-center" }}
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
      {musicmodal && (
        <AlbumModel
          sx={{ display: "block" }}
          musicmodal={musicmodal}
          setmusicmodal={setmusicmodal}
        />
      )}

      {musicEditModal && (
        <Modal music={musicEditModal} setMusicEditModal={setMusicEditModal} />
      )}
    </Paper>
  );
}

// //row 안의 value값
