import SheetSide from "@/components/Checkout/SheetSide";
import CardItem from "@/components/ProductDetail/Cart/CardItem";
export default function page() {
  return (
    <section className="w-full h-screen flex flex-col justify-between text-center">
      {/* Title */}
      <p className="text-title my-5">កន្រ្តករបស់ខ្ញុំ</p>

      {/* Scrollable Cart Items */}
      <div className="flex-grow overflow-y-auto px-4">
        <CardItem />
      </div>

      {/* Checkout Button  */}
      <SheetSide />
    </section>
  );
}
