const NewsLetter = () => {
  return (
    <div className="border-t-2 border-green bg-yellow-200 py-4 text-center text-gray-600 md:py-8">
      <div className="container">
        <h3 className="mb-2 text-xl uppercase">newsletter</h3>
        <p className="mb-3">
          Hãy đăng ký email bạn vào ô phía dưới để luôn nhận được các thông tin
          mới nhất từ nhà Ba Lành!
        </p>
        <form className="mx-[10%] flex md:mx-[25%]">
          <div className="relative grow-[5]">
            <input
              type="text"
              placeholder="Your Email Address"
              className="h-[42px] w-full border-b border-gray-600 py-[10px] pl-[35px] pr-[20px] italic text-gray-600"
            />
          </div>
          <button className="btn-df btn-green grow border-0 uppercase leading-[40px]">
            subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
