import logo from "../../../../public/imgs/logo.webp";
import useViewport from "../../../../hooks/useViewport";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox/SearchBox";
import Cart from "./Cart/Cart";
import MenuMobile from "./MenuMobile/MenuMobile";

const TopMenu = () => {
  const { isMd } = useViewport();
  return (
    <div className="bg-white pt-2 pb-0 md:pb-2">
      <div className="container">
        <div className="flex items-center">
          <div className="w-1/3">
            <Link href="/" className="inline-block">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <SearchBox />
          </div>

          <div className="flex w-1/4 justify-end">
            <Cart />
            {!isMd && <MenuMobile expand={"md"} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
