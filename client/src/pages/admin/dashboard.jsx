import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCartItems());
    // Fetch recent orders (mock data for now)
    setRecentOrders([
      {
        id: "123456",
        date: "01/01/2025",
        status: "In Process",
        price: "2000 Rs",
      },
      {
        id: "123457",
        date: "02/01/2025",
        status: "Delivered",
        price: "1500 Rs",
      },
    ]);
  }, [dispatch]);

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{productList.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{cartItems.items?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹
              {cartItems.items?.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ) || 0}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Order Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {productList.slice(0, 5).map((product) => (
                <li key={product._id} className="flex justify-between">
                  <span>{product.title}</span>
                  <span>₹{product.price}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
