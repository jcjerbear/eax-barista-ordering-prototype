import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>EAX Barista</h5>
            <p className={styles.description}>
              A web app for you to submit your coffee orders before you arrive
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a className={styles.footerlink}
                  href="https://www.origin.com/can/en-us/store">
                  Facebook
                </a>
              </li>
              <li>
                <a className={styles.footerlink}
                  href="https://www.origin.com/can/en-us/store">
                  Instagram
                </a>
              </li>
              <li>
                <a className={styles.footerlink}
                  href="https://www.origin.com/can/en-us/store">
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
