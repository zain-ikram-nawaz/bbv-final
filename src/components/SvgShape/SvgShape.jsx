import ShapeCard from "./ShapeCard";

export default function SvgShape() {
  return (
  <ShapeCard shape="customRect" color="#2194f6">
  <h3 className="text-3xl font-bold">Full Screen Shape</h3>
  <p className="mt-4 max-w-xl">
    Ye card ab full screen cover karta hai, aur andar ka content bilkul center
    me dikh raha hai. Aap chahe to scrollable content bhi dal sakte ho.
  </p>
</ShapeCard>



  );
}
