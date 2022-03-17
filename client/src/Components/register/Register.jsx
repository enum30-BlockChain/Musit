import React from "react";
// import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      {/* <Link to="/Listener">
        <button>청취자 가입</button>
      </Link>
      <Link to="/Artist">
        <button>아티스트 가입</button>
      </Link> */}

      <div>
        <p>Meta-Mask Address</p>
        <p>메타마스크 주소</p>
        <button>verifiy</button>
        <p>User Type</p>
        <div>
          <input type="checkbox" value="">
            Artist User
          </input>
        </div>
        <input type="hidden">
          <a selectbox-toggle>korea</a>
          <a selectbox-toggle>korea</a>
          <a selectbox-toggle>korea</a>
          <a selectbox-toggle>korea</a>
          <a selectbox-toggle>korea</a>
          <a selectbox-toggle>korea</a>
          <a selectbox-toggle>korea</a>
        </input>
      </div>
      <button>Submit</button>
    </div>
  );
};

export default Register;
