import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";

export default function MusicCard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const dispatch = useDispatch();
  const likeMusic = useSelector((state) => state.likeMusic);
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
    { id: "number", label: "Number", minWidth: 10 },
    { id: "albumcover", label: "Album Cover", minWidth: 30 },
    { id: "music", label: "Music Title", minWidth: 120 },
    { id: "artist", label: "Artist", minWidth: 120 },
    {
      id: "playtime",
      label: "Play Count",
      minWidth: 120,
    },
    {
      id: "audio",
      label: "Audio",
      minWidth: 50,
    },
  ];

  //재목안에 넣는 내용 columns 기둥의 id랑 똑같이 적어줘야된다.
  function createRow(number, albumcover, music, artist, playtime, audio) {
    return { number, albumcover, music, artist, playtime, audio };
  }

  //row 안의 value값
  const rows = [];
  likeMusic.data.forEach((favor, index) => {
    rows.push(
      createRow(
        index,
        <Avatar
          src={favor.img_file}
          style={{ width: "50px", height: "50px" }}
        />,
        // <LikeSongCard address={address} favor={favor} />,
        favor.title,
        favor.artist_name,
        favor.play_count,
        <audio
          src={`https://ipfs.infura.io/ipfs/${favor.ipfs_hash}`}
          controls
        ></audio>
      )
    );
  });

  console.log(likeMusic.data);

  return (
    <Paper
      className="table-container"
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: 635, width: "100%" }}>
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
    </Paper>
  );
}
