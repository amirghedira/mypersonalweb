import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <Link to="/aboutus"> About us </Link>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}{" "}
          Coded by{" "}
          <a
            href="https://www.facebook.com/ghedira.amir"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amir Ghedira
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
