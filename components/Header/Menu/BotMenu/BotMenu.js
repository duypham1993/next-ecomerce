import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BotMenuItem from "./BotMenuItem/BotMenuItem";
import { getCategories } from "@/store/slices/categorySlice";
import styles from "./BotMenu.module.css";

const BotMenu = () => {
  const dispatch = useDispatch();
  const { treeCategories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <nav className="bg-green text-white">
      <div className="container">
        <ul className={styles.menu}>
          {treeCategories.map((item, index) => (
            <BotMenuItem item={item} key={index} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default BotMenu;
