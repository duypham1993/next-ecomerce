import Image from "next/image";
const Banner = ({ name, desc, img }) => {
  return (
    <div className="container">
      <div className="relative z-10 mb-6 bg-banner">
        <div className="relative z-20 m-[5rem] mr-0 inline-block max-w-[38%] bg-white py-[5.2rem] px-[3.5rem] text-center text-gray-600 opacity-80">
          <h1 className="upercase mb-2 font-bold tracking-[0.3rem] md:mb-4 md:text-5xl">
            {name}
          </h1>
          <h3 className="text-lg tracking-wide">{desc}</h3>
        </div>
        <div className="object-top-center absolute right-0 top-0 z-10 h-full w-3/4 object-cover">
          <Image src={img} alt={name} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
