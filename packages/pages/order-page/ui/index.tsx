import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@pierre/core/store";
import { useSliceStatus } from "@pierre/base/hooks";
import type { Order } from "@pierre/core/models";
import { ErrorBanner, LoadingBanner } from "packages/base/ui/banners";
import { CalculateTimeDifferenceInMinutes } from "@pierre/utils";
import { NavigationButton } from "packages/base/ui/navigation-button";
import { lunchboxImage } from "@pierre/core/assets";
import { fetchOrder } from "packages/core/api/order";

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
      className="d-flex flex-column justify-content-between  text-white bg-secondary bg-gradient" style={
        { minHeight: "100vh" }
      }
    >
      <div className="mt-5 mb-3">
        <img className="img-fluid " src={lunchboxImage} alt="" />

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

export { OrderPage };
