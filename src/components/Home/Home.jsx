import Hero from "./Hero";
import VanImage from "./VanImage";
import KeyFeatures from "./KeyFeatures";
import CurvedSeparator from "./CurvedSeparator";
import CurvedSeparator2 from "./CurvedSeparator2";
import CurvedSeparator3 from "./CurvedSeparator3";
import CurvedSeparator4 from "./CurvedSeparator4";
import CustomizeScreen from "./CustomizeScreen";
import DreamDriveway from "./DreamDriveway";
import WhyChooseUs from "./WhyChooseUs";
import CustomerReviews from "./CustomerReviews";
import Blog from "./Blog";
import BookingPage from "./BookingPage";
import Shop from "./Shop";
import UpFooter from "./UpFooter";


import InvertedCurvedSeparator from "./InvertedCurvedSeparator";
import InvertedCurvedSeparator2 from "./InvertedCurvedSeparator2";
import InvertedCurvedSeparator3 from "./InvertedCurvedSeparator3";
import InvertedCurvedSeparator4 from "./InvertedCurvedSeparator4";
import Vector48 from "./vector48";
import { getVan } from "@/api/van/van";
export default async function Home() {
  const van = await getVan()

  return (
    <div>

      <Hero />
      <CurvedSeparator />
      <VanImage van={van} />
      <InvertedCurvedSeparator />
      <CustomizeScreen />
      <CurvedSeparator4 bg="#534BFF" />

      <Vector48 bg='#EEEEEE' color="#000000" />
      <Shop van={van} />
      <CurvedSeparator4 bg="#00000" />
      <DreamDriveway />
      {/* <CurvedSeparator3 /> */}
      <InvertedCurvedSeparator />
      <WhyChooseUs />
      <CurvedSeparator4 bg="#534BFF" />
      {/* <InvertedCurvedSeparator /> */}
      {/* <KeyFeatures /> */}
      {/* <CurvedSeparator2 /> */}
      <Vector48 bg='#EEEEEE' color="#1B2B41" />
      <CustomerReviews />
      <CurvedSeparator4 bg="#1B2B41" />
      <Blog />
      <InvertedCurvedSeparator4 />
      <BookingPage />
      <CurvedSeparator4 bg="#534BFF" />
      <Vector48 bg='#EEEEEE' color="#000000" />

      <UpFooter />


    </div>
  );
}