import type { Order } from "../models/order";
import { NavigationButton, LoadingBanner, ErrorBanner } from "@pierre/ui";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOrder } from "../reducers/orderReducer";
import { CalculateTimeDifferenceInMinutes } from "../helpers/timeHelper";
import { useSliceStatus } from "../helpers/useSliceHelper";
import lunchbox from "../assets/images/lunchbox.png";

function OrderPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, status } = useSliceStatus("order");
  const orderId: string | undefined = params.id;

  const order: Order = useSelector((state: RootState) => state.order.data);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrder(orderId!));
    }
  }, [dispatch, orderId]);

  if (loading) return <LoadingBanner />;

  if (error || status == "failed")
    return <ErrorBanner text={"Något gick fel. Försök igen."} />;

  return (
    <section
      className="d-flex flex-column justify-content-between  text-white bg-secondary bg-gradient"
      style={{ height: "100vh" }}
    >
      <div className="mt-5 mb-3">
        <img className="img-fluid " src={lunchbox} alt="" />

        <p className="fs-2 fw-bold mb-1">DINA WONTON TILLAGAS!</p>
        <p className="fs-3 mb-1">
          ETA {CalculateTimeDifferenceInMinutes(order.timestamp!, order.eta!)}
        </p>
        <p className="fs-5 ">#{order.id}</p>
      </div>
      <div className="d-flex flex-column mb-3 mt-auto container">
        <NavigationButton
          text="GÖR EN NY BESTÄLLNING"
          urlPath="/"
          classes={["btn-order text-center text-white mb-2 p-3 w-100"]}
        />
        <NavigationButton
          text="SE KVITTO"
          urlPath={`/receipt/${orderId}`}
          classes={["btn-receipt text-center p-3"]}
        />
      </div>
    </section>
  );
}

export default OrderPage;
