import * as React from "react";
import { EventHandler, ChangeEvent, MouseEvent } from "react";
import IconBox from "./iconBox";
import "./styles.css";

const { useState, useEffect } = React;
const Popup: React.FC = () => {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetch("https://flatcon.herokuapp.com/search?q=test&count=100")
      .then((res) => res.json())
      .then(({ icons }) => {
        setList(icons);
      });
  }, []);

  const handleChange: EventHandler<ChangeEvent> = (e) => {
    const { value } = e.target as HTMLInputElement;
    setSearchText(value);
  };

  const submit: EventHandler<MouseEvent> = () => {
    fetch(`https://flatcon.herokuapp.com/search?q=${searchText}&count=100`)
      .then((res) => res.json())
      .then(({ icons }) => {
        setList(icons);
      });
  };

  return (
    <div className="mainflatconbody">
      <div className="headerofextenstion">
        <h1 className="logotext">Flowcon</h1>
      </div>
      <div>
        <form
          id="email-form"
          name="email-form"
          data-name="Email Form"
          className="mainform"
        >
          <input
            type="text"
            className="iconsearchinput w-input"
            maxLength={256}
            name="name"
            data-name="Name"
            placeholder="Arrows, Social Medi...."
            id="name"
            onChange={handleChange}
            required
          />
          <input
            type="button"
            value="Search"
            data-wait="Please wait..."
            className="iconsubmitbutton w-button"
            onClick={submit}
          />
        </form>
        <div className="w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div className="w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
      <div className="iconswilldisplayinthisdiv">
        {list.map(({ icon_id }) => (
          <IconBox iconid={icon_id} key={icon_id} />
        ))}
      </div>
      <div className="buymeacoffeesectionwrapper">
        <a
          href="https://www.buymeacoffee.com/webcited"
          target="_blank"
          rel="noreferrer"
          className="buymeacoffeebuttonwrapper w-inline-block"
        >
          <img
            src="../assets/coffee.png"
            width="37"
            alt="coffee"
            className="coffeeimage"
          />
          <div className="buycoffeetext">
            <h3 className="wearefeelingsleepytext">
              We are feeling sleeply
              <br />
              Buy us a coffee
            </h3>
          </div>
        </a>
        <link rel="prerender" href="https://www.buymeacoffee.com/webcited" />
      </div>
      <a
        href="https://webcited.co/?utm-flatcon"
        target="_blank"
        rel="noreferrer"
        className="webcited-colink"
      >
        Webcited.co
      </a>
      <a
        href="https://chrome.google.com/webstore/detail/webflow-code-exporter/hndfhngkfilifocejcpemadblknkmkjn"
        className="chromeextenstionlink"
      >
        Webflow Code Exporter
      </a>
    </div>
  );
};

export default Popup;
