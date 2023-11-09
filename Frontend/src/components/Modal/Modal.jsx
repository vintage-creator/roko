import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ children }) => {
  return <div className={styles.modalBackground}>{children}</div>;
};

export default Modal;
