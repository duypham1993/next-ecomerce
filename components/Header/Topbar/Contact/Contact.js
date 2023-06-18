const Contact = () => {
  return (
    <div className="m-0 flex py-2 px-0 text-white">
      <div className="mr-5">
        <span>Hotline: </span>
        <a href="tel:1800.9412" className="link-df link-df--white p-0">
          1800.9412
        </a>
      </div>
      <div className="mr-5">
        <span>Liên hệ: </span>
        <a href="mail:hello@balanh.com" className="link-df link-df--white p-0">
          hello@balanh.com
        </a>
      </div>
      <div>
        <span>Freeship cho đơn từ 1.500.000đ</span>
      </div>
    </div>
  );
};

export default Contact;
