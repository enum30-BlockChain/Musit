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
import { readLikeMusicList } from "../../../../../redux/actions/musicActions";

export default function StickyHeadTableMusic() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  React.useEffect(() => {}, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const getLikeList = async () => {
  //   //내가 좋아요누른 노래 카운트 증가
  //   const url = "http://localhost:5000/music/likes/like";
  //   await axios
  //     .post(url, { address })
  //     .then((res) => {
  //       dispatch(fetchLikeListData(res.data));
  //     })
  //     .catch((err) => alert("errrrrrrr.", err));
  // };

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
  // likeList.forEach((favor, index) => {
  //   rows.push(
  //     createRow(
  //       index,
  //       // <img src={favor.img_file} style={{ width: "100px" }} />,
  //       <LikeSongCard address={address} favor={favor} />,
  //       favor.title,
  //       favor.artist_name,
  //       favor.play_time,
  //       <audio
  //         src={`https://ipfs.infura.io/ipfs/${favor.ipfs_hash}`}
  //         controls
  //       ></audio>
  //     )
  //   );
  // });

  // if (likeMusic.artist_name == null) {
  //   <div>loding</div>;
  //   if (likeMusic.artist_name == false) {
  //     return <div>실패</div>;
  //   }
  // }
  return (
    <Paper
      className="table-container"
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
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
