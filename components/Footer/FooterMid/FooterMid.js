import Link from "next/link";
import useViewport from "@/hooks/useViewport";

const FooterMid = () => {
  const { isMd } = useViewport();
  const arrTags = [
    {
      link: "#",
      name: "nông nghiệp",
    },
    {
      link: "#",
      name: "bản địa",
    },
    {
      link: "#",
      name: "truyền thống",
    },
    {
      link: "#",
      name: "Oh-Chewcha",
    },
    {
      link: "#",
      name: "tự nhiên",
    },
    {
      link: "#",
      name: "bền vững",
    },
    {
      link: "#",
      name: "lương nông",
    },
  ];

  const arrList1 = [
    {
      link: "#",
      name: "Giới thiệu",
    },
    {
      link: "#",
      name: "Đăng kí đối tác",
    },
    {
      link: "#",
      name: "Chính sách vận chuyển",
    },
    {
      link: "#",
      name: "Chấp nhận thanh toán",
    },
    {
      link: "#",
      name: "Chính sách bảo mật",
    },
  ];

  const arrList2 = [
    {
      link: "#",
      name: "FAQ",
    },
    {
      link: "#",
      name: "Chính sách bảo hàng",
    },
    {
      link: "#",
      name: "Về Oh-Chewcha",
    },
    {
      link: "#",
      name: "Về Bột Mộc Mát",
    },
    {
      link: "#",
      name: "Quy định đổi trả",
    },
  ];
  return (
    <div className="bg-white pt-4 pb-3 md:pt-5 md:pb-4">
      <div className="container">
        {isMd ? (
          // Destop
          <div className="grid grid-cols-4 gap-4">
            <div>
              <h5 className="xs:hidden mb-3 font-bold uppercase text-gray-600">
                từ khoá nổi bật
              </h5>
              <ul className="flex list-none flex-wrap gap-2">
                {arrTags.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="btn-df inline-block p-2 text-xs capitalize text-gray-600 hover:border-green hover:text-green"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="mb-3 font-bold uppercase text-gray-600">
                hợp tác
              </h5>
              <ul className="mb-3 list-none p-0">
                {arrList1.map((item, index) => (
                  <li key={index} className="my-2">
                    <Link
                      href={item.link}
                      className=" inline-block py-1 px-0 hover:text-green"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="mb-3 font-bold uppercase text-gray-600">
                hỗ trợ khách hàng
              </h5>
              <ul className="mb-3 list-none p-0">
                {arrList2.map((item, index) => (
                  <li key={index} className="my-2">
                    <Link
                      href={item.link}
                      className=" inline-block py-1 px-0 hover:text-green"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="mb-3 font-bold uppercase text-gray-600">
                VỀ CÔNG TY TNHH BA LÀNH
              </h5>
              <ul className="mb-3 list-none p-0">
                <li className="my-2">
                  <span>
                    GCNDKDN số: 0315366569 do Sở Kế hoạch - Đầu tư Tp. HCM cấp
                    ngày 01/11/2018
                  </span>
                </li>
                <li className="my-2">
                  <span>Người đại diện: Nguyễn Văn Doanh</span>
                </li>
                <li className="my-2">
                  <span>
                    29/3 Đường số 36, Khu phố 8, P. Hiệp Bình Chánh, Tp. Thủ
                    Đức, Tp. HCM
                  </span>
                </li>
                <li className="my-2">
                  <span>Hotline hỗ trợ khách hàng: </span>
                  <a href="tel:18009412" className=" p-0">
                    1800.9412
                  </a>
                </li>
                <li className="my-2">
                  <span>Liên hệ hợp tác: </span>
                  <a href="tel:0966939412" className=" p-0">
                    096.693.9412
                  </a>
                </li>
                <li className="my-2">
                  <span>Email: </span>
                  <a href="mailto:hello@balanh.com" className=" p-0">
                    hello@balanh.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Mobile
          <div>
            <div>
              <div className="custom-accordion">
                <div className="mb-2 border-0 pb-2">
                  <h5 className="m-0 bg-white p-0 text-sm font-bold uppercase text-gray-600">
                    hợp tác
                  </h5>
                  <div className="p-0">
                    <ul className="mb-3 list-none p-0">
                      {arrList1.map((item, index) => (
                        <li key={index} className="my-2">
                          <Link
                            href={item.link}
                            className=" inline-block py-1 px-0 text-sm hover:text-green"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mb-2 border-0 pb-2">
                  <h5 className="m-0 bg-white p-0 text-sm font-bold uppercase text-gray-600">
                    hỗ trợ khách hàng
                  </h5>
                  <div className="p-0">
                    <ul className="mb-3 list-none p-0">
                      {arrList2.map((item, index) => (
                        <li key={index} className="my-2">
                          <Link
                            href={item.link}
                            className=" inline-block py-1 px-0 text-sm hover:text-green"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mb-2 border-0 pb-2">
                  <h5 className="m-0 bg-white p-0 text-sm font-bold uppercase text-gray-600">
                    VỀ CÔNG TY TNHH BA LÀNH
                  </h5>
                  <div className="p-0">
                    <ul className="mb-3 list-none p-0">
                      <li className="my-2 py-1">
                        <span>
                          GCNDKDN số: 0315366569 do Sở Kế hoạch - Đầu tư Tp. HCM
                          cấp ngày 01/11/2018
                        </span>
                      </li>
                      <li className="my-2 py-1">
                        <span>Người đại diện: Nguyễn Văn Doanh</span>
                      </li>
                      <li className="my-2 py-1">
                        <span>
                          29/3 Đường số 36, Khu phố 8, P. Hiệp Bình Chánh, Tp.
                          Thủ Đức, Tp. HCM
                        </span>
                      </li>
                      <li className="my-2 py-1">
                        <span>Hotline hỗ trợ khách hàng: </span>
                        <a href="tel:18009412" className=" p-0">
                          1800.9412
                        </a>
                      </li>
                      <li className="my-2 py-1">
                        <span>Liên hệ hợp tác: </span>
                        <a href="tel:0966939412" className=" p-0">
                          096.693.9412
                        </a>
                      </li>
                      <li className="my-2 py-1">
                        <span>Email: </span>
                        <a href="mailto:hello@balanh.com" className=" p-0">
                          hello@balanh.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterMid;
