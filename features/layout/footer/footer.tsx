import styles from "./footer.module.scss";
import classNames from "classnames";
import { useContext } from "react";
import { NavigationContext } from "@features/layout";
import { version } from "../../../package.json";

const DekstopRender = () => {
  return (
    <>
      <p data-test-id={"footer-version"}>Version: {version}</p>
      <div data-test-id={"footer-navigation"} className={styles.navigation}>
        <a href="#">Docs</a>
        <a href="#">API</a>
        <a href="#">Help</a>
        <a href="#">Community</a>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-test-id={"footer-logo"}
        src={"/icons/logo-small.svg"}
        alt={"Logo"}
        className={styles.menuIcon}
      />
    </>
  );
};

const MobileRender = () => {
  return (
    <>
      <div data-test-id={"footer-navigation"} className={styles.navigation}>
        <a href="#">Docs</a>
        <a href="#">API</a>
        <a href="#">Help</a>
        <a href="#">Community</a>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-test-id={"footer-logo"}
        src={"/icons/logo-small.svg"}
        alt={"Logo"}
        className={styles.menuIcon}
      />
      <p data-test-id={"footer-version"}>Version: {version}</p>
    </>
  );
};
export function Footer() {
  const { isSidebarCollapsed } = useContext(NavigationContext);

  return (
    <div className={classNames(styles.container)}>
      {isSidebarCollapsed ? <DekstopRender /> : <MobileRender />}
    </div>
  );
}
