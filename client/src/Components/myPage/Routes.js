import React from "react";
// import axios from "axios";
import { Route, Switch } from "react-router-dom";

function Routes(props) {
  if (props.address === props.artistAddress) {
    return (
      <Switch>
        {/* -----------------아티스트  노출------------------ */}

        {/* 아티스트/유저 상태노출 */}
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/">
          <h1>MUSIC UP LOAD</h1>
        </Route>

        <Route exact path="/">
          <h1>PUT UP FOR AUCTION</h1>
        </Route>

        <Route exact path="/">
          <h1>INCOME</h1>
        </Route>

        <Route exact path="/">
          <h1>MY PLAY LIST</h1>
        </Route>

        <Route exact path="/">
          <h1>RECENTLY PLAYED</h1>
        </Route>

        <Route exact path="/">
          <h1>MY FAVORITE</h1>
        </Route>

        <Route exact path="/">
          <h1>EDIT YOUR INFOMATION</h1>
        </Route>

        <Route exact path="/">
          <h1>MY PLAY LIST</h1>
        </Route>

        <Route exact path="/">
          <h1>RECENTLY PLAYED</h1>
        </Route>

        <Route exact path="/">
          <h1>MY FAVORITE</h1>
        </Route>

        <Route exact path="/">
          <h1>EDIT YOUR INFOMATION</h1>
        </Route>
      </Switch>
    );
  } else if (props.address === props.artistAddress) {
    <Switch>
      {/* -----------------유저노출------------------ */}
      <Route exact path="/">
        <HomePage />
      </Route>

      <Route exact path="/">
        <h1>MY PLAY LIST</h1>
      </Route>

      <Route exact path="/">
        <h1>RECENTLY PLAYED</h1>
      </Route>

      <Route exact path="/">
        <h1>MY FAVORITE</h1>
      </Route>

      <Route exact path="/">
        <h1>EDIT YOUR INFOMATION</h1>
      </Route>
    </Switch>;
  }
}

export default Routes;
