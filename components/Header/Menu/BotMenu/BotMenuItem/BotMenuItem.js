import Link from "next/link";
import SubBotMenu from "./SubBotMenu";
import styles from "../BotMenu.module.css";

const BotMenuItem = ({ item }) => {
  return (
    <li className={styles.item}>
      {item.children ? (
        <>
          <Link className={styles.link} href={`/${item.slug}`}>
            <span>{item.name}</span>
          </Link>
          <SubBotMenu subMenu={item.children} />
        </>
      ) : (
        <>
          <Link className={styles.link} href={`/${item.slug}`}>
            <span>{item.name}</span>
          </Link>
        </>
      )}
    </li>
  );
};

export default BotMenuItem;
