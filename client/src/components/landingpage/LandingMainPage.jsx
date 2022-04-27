import "./LandigMainPage.css";
import React from "react";

export default function LandingMainPage() {
  return (
    <>
      <div className="landing-page">
        <div className="line-container"></div>
        <section className="one">
          <h1 className="scroll" data-rate=".4" data-direction="vertical">
            We are BlockChain
          </h1>
        </section>
        <section className="two">
          <h1 className="scroll" data-rate=".2" data-direction="vertical">
            We are Music
          </h1>
        </section>
      </div>
    </>
  );
}
