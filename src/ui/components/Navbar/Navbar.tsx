import * as React from "react";
import Tab from "../../../consts/Tab";

const Navbar = ({ onClick, tabSelected }) => {
  return (
    <nav className="border-bottom py-xs px-sm">
      <ul className="d-flex flex-row p-0">
        <li>
          <a
            href="#"
            className={tabSelected === Tab.TOKENS ? "section-title" : "label"}
            onClick={() => onClick(Tab.TOKENS)}
          >
            Tokens
          </a>
        </li>
        <li>
          <a
            href="#"
            className={
              tabSelected === Tab.CSS ? "section-title pr-md" : "label pr-md"
            }
            onClick={() => onClick(Tab.CSS)}
          >
            CSS
          </a>
        </li>
        <li>
          <a
            href="#"
            className={
              tabSelected === Tab.SCSS ? "section-title pr-md" : "label pr-md"
            }
            onClick={() => onClick(Tab.SCSS)}
          >
            SCSS
          </a>
        </li>
        <li>
          <a
            href="#"
            className={
              tabSelected === Tab.JSON ? "section-title pr-md" : "label pr-md"
            }
            onClick={() => onClick(Tab.JSON)}
          >
            JSON
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
