import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toggleLikeArtist } from "../../../../redux/actions/artistActions";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ArtistCard({ List, setArtistModal }) {
  const [TotalLike, setTotalLike] = useState("");
  const likeArtist = useSelector((state) => state.likeArtist).data;
  const [artistlike, setArtistlike] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!likeArtist.loading) {
      setArtistlike(
        likeArtist.filter((artist) => {
          return artist.artist_name.indexOf(List.artist_name) > -1;
        })
      );
    }
  }, [likeArtist]);

  // 파업창 띄워주는 것
  const postInfo = () => {
    console.log(List);
    setArtistModal(List);
  };

  const likeOnclick = async () => {
    dispatch(toggleLikeArtist(List.artist_name));
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
        List.img === "" ? (
          <Avatar alt="Remy Sharp" sx={{ width: "50px", height: "50px" }} />
        ) : (
          <img
            className="user-image"
            alt="Remy Sharp"
            src={List.img}
            sx={{ width: 100, height: 100 }}
          />
        ),
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
        <TableContainer sx={{ maxHeight: 633 }}>
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
