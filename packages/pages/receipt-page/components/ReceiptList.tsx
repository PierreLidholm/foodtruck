import type { Receipt } from "@pierre/core/models";

type ReceiptListProps = {
    receipt: Receipt;
}

function ReceiptList({receipt} : ReceiptListProps) {
  return (
    <ul className="list-unstyled">
      {receipt.items.map((item) => (
        <li key={item.id} className="mb-2">
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <p className="mb-0  fw-bold">{item.name}</p>
              <p className="mb-0  fw-bold">{item.price} SEK</p>
            </div>
            <p className="mb-0 text-muted text-start">
              {item.quantity} stycken
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export  { ReceiptList };
