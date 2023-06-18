import BotMenuItem from "./BotMenuItem";
import styles from "../BotMenu.module.css";

const SubBotMenu = ({ subMenu }) => {
  return (
    <ul className={styles.subMenu}>
      {subMenu.map((submenu, index) => (
        <BotMenuItem item={submenu} key={index} />
      ))}
    </ul>
  );
};

export default SubBotMenu;
