import { CartProvider } from "../Component/store/Context/ProductContext";
import ListCard from "../Component/store/ListCart/ListCard";
import Slider from "../Component/store/StoreSlider/slider";
export const HomePage = (): JSX.Element => {
  return (
    <CartProvider>
      <div>
        <h1>Home Page</h1>
        <ListCard />
        <Slider />
      </div>
    </CartProvider>
  );
};
