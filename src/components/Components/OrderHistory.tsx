
import { Order } from "@/app/types/purchaseHistoryType";

interface OrderItemProps {
  order: Order;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-yellow-100 text-yellow-600";
    case "completed":
      return "bg-green-100 text-green-600";
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className="py-3 mx-4 border-b last:border-b-0">
      <div className="flex justify-between items-start mb-1">
        <div className="font-medium">Order {order.order_code}</div>
        <div className="text-blue-500 font-medium">
          ${parseFloat(order.total_price).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {order.items.length} items • {order.created_at}
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}
        >
          {order.status}
        </div>
      </div>
    </div>
  );
};



export default OrderItem;