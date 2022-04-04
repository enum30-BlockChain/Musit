import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable({ findMusic }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [favorit, setFavorit] = React.useState([""]);

  React.useEffect(() => {
    if (findMusic) {
      setFavorit(findMusic);
    }
  }, [findMusic]);

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
    { id: "albumcover", label: "Album Cover", minWidth: 30 },
    { id: "music", label: "Music Title", minWidth: 120 },
    { id: "artist", label: "Artist", minWidth: 120 },
    {
      id: "playtime",
      label: "Music Play",
      minWidth: 120,
    },
    {
      id: "likecount",
      label: "Like",
      minWidth: 50,
    },
  ];

  //재목안에 넣는 내용 columns 기둥의 id랑 똑같이 적어줘야된다.
  function createRow(number, albumcover, music, artist, playtime, likecount) {
    return { number, albumcover, music, artist, playtime, likecount };
  }

  //row 안의 value값
  const rows = [
    createRow(
      favorit.map((MusicList, index) => {
        return (
          <>
            <div className="Musicfavoritlist">{index + 1}</div>
          </>
        );
      }),
      favorit.map((MusicList, index) => {
        return (
          <>
            <div>
              {<img src={MusicList.img_file} style={{ width: "100px" }} />}
            </div>
          </>
        );
      }),
      favorit.map((MusicList, index) => {
        return (
          <>
            <div>{MusicList.title}</div>
          </>
        );
      }),
      favorit.map((MusicList, index) => {
        return (
          <>
            <div>{MusicList.artist_name}</div>
          </>
        );
      }),
      favorit.map((MusicList, index) => {
        return (
          <>
            <div>{MusicList.play_time}</div>
          </>
        );
      }),
      favorit.map((MusicList, index) => {
        return (
          <>
            <div>{MusicList.likes}</div>
          </>
        );
      })
    ),
  ];

  ///////////////////////////////////////////////////////////////

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

{
  /* <img src={favorit.img_file} style={{ width: "100px" }} />,
favorit.title,
favorit.artist_name,
favorit.play_time,
favorit.likes */
}

// //row 안의 value값
