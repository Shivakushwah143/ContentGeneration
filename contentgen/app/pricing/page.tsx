import { PaymentButton } from "@/components/PaymentButton";

export default function PricingPage() {
  const PLANS = [
    {
      name: "Basic",
      id: "BASIC",
      price: "₹500/month",
      credits: 500,
      features: [
        "500 content generations", 
        "Basic templates",
        "Standard support"
      ],
    },
    {
      name: "Premium",
      id: "PREMIUM",
      price: "₹900/month",
      credits: 1000,
      features: [
        "1000 content generations",
        "All templates", 
        "Priority support",
        "Advanced analytics"
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground">
          Upgrade to generate more content and unlock powerful features
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {PLANS.map((plan) => (
          <div 
            key={plan.id}
            className="border rounded-xl p-8 hover:shadow-lg transition-shadow"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="text-3xl font-bold my-4">{plan.price}</p>
              <p className="text-primary font-medium">
                {plan.credits} credits/month
              </p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            
            <PaymentButton 
              plan={plan.id as "BASIC" | "PREMIUM"} 
             
            />
          </div>
        ))}
      </div>
    </div>
  );
}