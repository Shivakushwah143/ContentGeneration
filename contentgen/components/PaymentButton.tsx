"use client";
import { useState } from "react";
import { Button } from "./ui/button";

import { loadRazorpay } from "@/lib/razorpay";
import { useRouter } from "next/navigation"; // Add this import

export function PaymentButton({
  plan,
  className = ""
}: {
  plan: "BASIC" | "PREMIUM";
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const initiatePayment = async () => {
    setIsLoading(true);
    
    try {
      // 1. Create order
      const res = await fetch("/api/v1/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create payment order");
      }

      const { orderId, amount, currency, key } = await res.json();

      // 2. Load Razorpay script
      await loadRazorpay();

      // 3. Open payment modal
      const options = {
        key,
        amount: amount.toString(),
        currency,
        order_id: orderId,
        name: "Your Content App",
        description: `${plan} Plan Subscription`,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verification = await fetch("/api/v1/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            const result = await verification.json();

            if (verification.ok) {
            
              router.push("/");
            } else {
              throw new Error(result.error || "Verification failed");
            }
          } catch (error) {
           
          }
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
           
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={initiatePayment}
      className={className}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : `Get ${plan} Plan`}
    </Button>
  );
}