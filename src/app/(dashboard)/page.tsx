import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const Home = async () => {
  return <div className="">Hello world</div>;
};

export default Home;
