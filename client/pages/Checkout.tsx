import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({ title: "Error", description: "Please fill in all required fields." });
      return false;
    }
    if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast({ title: "Error", description: "Please complete your shipping address." });
      return false;
    }
    if (paymentMethod === "card" && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      toast({ title: "Error", description: "Please enter valid payment details." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Order Placed Successfully! ✨",
        description: `Thank you for your purchase. Order confirmation has been sent to ${formData.email}`,
      });

      clear();
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8 sm:py-12">
          <button
            onClick={() => navigate("/shop")}
            className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </button>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 sm:p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-yellow-600 mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Your Cart is Empty</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">Add products to your cart before checking out.</p>
            <Button className="mt-6 w-full sm:w-auto" onClick={() => navigate("/shop")}>
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 sm:py-12">
        <button
          onClick={() => navigate("/shop")}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Continue Shopping
        </button>

        <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold">Checkout</h1>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Shipping Information */}
              <div className="rounded-lg border bg-card p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold mb-4">Delivery Address</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House No., Building Name"
                      required
                      className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Zip Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg border bg-card p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { id: "card", label: "Credit/Debit Card" },
                    { id: "upi", label: "UPI" },
                    { id: "netbanking", label: "Net Banking" },
                  ].map(({ id, label }) => (
                    <label key={id} className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-muted transition">
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={paymentMethod === id}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cardNumber: e.target.value.replace(/\s/g, "").substring(0, 16),
                          }))
                        }
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, expiryDate: e.target.value.substring(0, 5) }))
                          }
                          placeholder="MM/YY"
                          required
                          className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">CVV *</label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, cvv: e.target.value.substring(0, 3) }))
                          }
                          placeholder="123"
                          required
                          className="w-full rounded-md border bg-background px-3 py-2 sm:py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs sm:text-sm text-blue-800">You will be redirected to your UPI app to complete the payment securely.</p>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs sm:text-sm text-blue-800">You will be redirected to your bank's secure payment gateway.</p>
                  </div>
                )}
              </div>

              {/* Order Summary Mobile */}
              <div className="lg:hidden rounded-lg border bg-card p-4 sm:p-6">
                <h3 className="font-semibold mb-4 text-base sm:text-lg">Order Summary</h3>
                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between text-xs sm:text-sm gap-2">
                      <span className="line-clamp-1">{product.name} x{quantity}</span>
                      <span className="flex-shrink-0">₹{(product.price * quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between font-semibold text-sm sm:text-base">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full text-sm sm:text-base py-2.5 sm:py-3" disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>

          {/* Order Summary Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-6 rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 pb-4 border-b last:border-none">
                    <img src={product.image} alt={product.name} className="h-16 w-16 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-tight">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Qty: {quantity}</p>
                      <p className="text-sm font-semibold mt-1">₹{(product.price * quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹0.00</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold">Secure Checkout</p>
                    <p className="text-xs mt-1">Your payment is protected by advanced encryption.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
