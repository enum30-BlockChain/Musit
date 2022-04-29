import "./LandigMainPage.css";
import React from "react";

export default function LandingMainPage() {
  constructor(el) {
    // the SVG element
    this.DOM = {el: el};
    // SVG texts
    this.DOM.circleText = [...this.DOM.el.querySelectorAll('text.circles__text')];
    // total of texts
    this.circleTextTotal = this.DOM.circleText.length;
    // initial setudp
    this.setup();
}
setup() {
    // need to set the transform origin in the center
    gsap.set(this.DOM.circleText, { transformOrigin: '50% 50%' });
    // hide on start
    gsap.set([this.DOM.circleText, DOM.content.children, DOM.frame.children], {opacity: 0});
    // don't allow to hover
    gsap.set(DOM.enterCtrl, {pointerEvents: 'none'});

    this.initEvents();
}
initEvents() {
    // click and hover events for the "enter" button:
    this.enterMouseEnterEv = () => {
        gsap.killTweensOf([DOM.enterBackground,this.DOM.circleText]);
        
        gsap.to(DOM.enterBackground, {
            duration: 0.8,
            ease: 'power4',
            scale: 1.2,
            opacity: 1
        });
        
        gsap.to(this.DOM.circleText, {
            duration: 4,
            ease: 'power4',
            rotate: '+=180',
            stagger: {
                amount: -0.3
            }
        });
    };
    this.enterMouseLeaveEv = () => {
        //gsap.killTweensOf(DOM.enterBackground);
        gsap.to(DOM.enterBackground, {
            duration: 0.8,
            ease: 'power4',
            scale: 1
        });
    };
    this.enterClickEv = () => this.enter();
    
    DOM.enterCtrl.addEventListener('mouseenter', this.enterMouseEnterEv);
    DOM.enterCtrl.addEventListener('mouseleave', this.enterMouseLeaveEv);
    DOM.enterCtrl.addEventListener('click', this.enterClickEv);
}
// initial (intro) animation
start() {
    this.startTL = gsap.timeline()
    .addLabel('start', 0)
    // scale in the texts & enter button and fade them in
    .to([this.DOM.circleText, DOM.enterCtrl], {
        duration: 2.5,
        ease: 'expo',
        startAt: {opacity: 0, scale: 0.3},
        scale: 1,
        opacity: 1,
        stagger: {
            amount: 0.5
        }
    }, 'start')
    // at start+1 allow the hover over the enter ctrl
    .add(() => gsap.set(DOM.enterCtrl, {pointerEvents: 'auto'}), 'start+=1');
}
// animation when clicking the enter button
enter() {
    // stop the previous timeline
    this.startTL.kill();
    // remove any event listener on the button
    DOM.enterCtrl.removeEventListener('mouseenter', this.enterMouseEnterEv);
    DOM.enterCtrl.removeEventListener('mouseleave', this.enterMouseLeaveEv);
    DOM.enterCtrl.removeEventListener('click', this.enterClickEv);
    gsap.set(DOM.enterCtrl, {pointerEvents: 'none'});
    // show frame and content
    gsap.set([DOM.frame, DOM.content], {opacity: 1});
    // start the animation
    gsap.timeline()
    .addLabel('start', 0)
    .to(DOM.enterCtrl, {
        duration: 1.5,
        ease: 'expo.inOut',
        scale: 0.7,
        opacity: 0
    }, 'start')
    .to(this.DOM.circleText, {
        duration: 1.5,
        ease: 'expo.inOut',
        scale: i => 1.5+(this.circleTextTotal-i)*.3,
        opacity: 0,
        stagger: {
            amount: 0.2
        }
    }, 'start')
    // show the content elements
    .to([DOM.content.children, DOM.frame.children], {
        duration: 1,
        ease: 'power3.out',
        startAt: {opacity: 0, scale: 0.9},
        scale: 1,
        opacity: 1,
        stagger: {
            amount: 0.3
        }
    }, 'start+=1.1')
  return (
    <>
      <div className="landing">
        <svg className="circles" width="100%" height="100%">
          <def>
            <path
              id="circle-1"
              d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5"
            />
            <path
              id="circle-2"
              d="M382,700.5A318.5,318.5 0 1 11019,700.5A318.5,318.5 0 1 1382,700.5"
            />
            <path
              id="circle-3"
              d="M487,700.5A213.5,213.5 0 1 1914,700.5A213.5,213.5 0 1 1487,700.5"
            />
            <path
              id="circle-4"
              d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5"
            />
          </def>

          <text className="circles__text circles__text--2">
            <textPath
              className="circles__text-path"
              xlinkHref="#circle-2"
              aria-label=""
              textLength="2001"
            >
              WE ARE MUSIC REVOLUTION&nbsp;
            </textPath>
          </text>
          <text className="circles__text circles__text--3">
            <textPath
              className="circles__text-path"
              xlinkHref="#circle-3"
              aria-label=""
              textLength="1341"
            >
              we are music&nbsp;
            </textPath>
          </text>
          <text className="circles__text circles__text--4">
            <textPath
              className="circles__text-path"
              xlinkHref="#circle-4"
              aria-label=""
              textLength="836"
            >
              WE ARE BLOCk chain&nbsp;
            </textPath>
          </text>
        </svg>

        <button className="enter">
          <div className="enter__bg"></div>
          <span className="enter__text">Enter</span>
        </button>
      </div>
    </>
  );
}
