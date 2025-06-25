import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import type { Receipt } from "../models/receipt";
import { LoadingBanner, ErrorBanner, NavigationButton } from "@pierre/base/ui";
import { fetchReceipt } from "../reducers/receiptReducer";
import { useSliceStatus } from "../helpers/useSliceHelper";
import ReceiptList from "./receipt/ReceiptList";
import yygsImage from "../assets/images/YYGS.png";

function ReceiptPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const receipt: Receipt = useSelector((root: RootState) => {
    return root.receipt.data;
  });
  const { loading, error, status } = useSliceStatus("receipt");

  const orderId: string | undefined = params.id;

  useEffect(() => {
    {
      if (orderId) {
        dispatch(fetchReceipt(orderId));
      }
    }
  }, [dispatch, orderId]);

  if (error || status == "failed")
    return <ErrorBanner text={"Något gick fel. Försök igen."} />;

  if (loading) return <LoadingBanner />;

  return (
    <section
      className="d-flex flex-column justify-content-between"
      style={{ minHeight: "90vh", backgroundColor: "#605858" }}
    >
      <div className="container mx-5 bg-white d-flex flex-column justify-content-between mt-5"  style={{ minHeight: "70vh", backgroundColor: "#605858" }}>
        <div className="mx-auto mt-4 mb-3 bg-white">
          <img src={yygsImage} alt="" style={{ backgroundColor: "red" }} />
        </div>
        <h2 className="text-center fw-bold">KVITTO</h2>
        <p>#{receipt.id}</p>
        <div className="px-2 h-50 overflow-auto">
          <ReceiptList receipt={receipt} />
        </div>
        <div className=" bg-black py-3 mb-3 mt-auto">
          <div className="container d-flex justify-content-between">
            <p className="mb-0   fw-bold text-white">Totalt</p>
            <p className="mb-0  fw-bold text-white">{receipt.orderValue} SEK</p>
          </div>
        </div>
      </div>

      <div className="container mt-auto mb-2">
        <NavigationButton
          text={"GÖR EN NY BESTÄLLNING"}
          urlPath={"/"}
          classes={["btn-order text-center text-white mb-2 mt-3 p-3 w-100"]}
        />
      </div>
    </section>
  );
}

export default ReceiptPage;
