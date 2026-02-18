export default function ServiceCard() {
  const services = [
    {
      title: "Property Buying",
      description:
        "Find your dream home with our comprehensive buying services. We guide you through every step, from property search to closing.",
      features: [
        "Market Analysis",
        "Property Tours",
        "Negotiation Support",
        "Closing Assistance",
      ],
    },
    {
      title: "Property Selling",
      description:
        "Sell your property quickly and at the best price. Our expert agents use proven strategies to market your home effectively.",
      features: [
        "Home Valuation",
        "Professional Photography",
        "Online Marketing",
        "Open Houses",
      ],
    },
    {
      title: "Property Rental",
      description:
        "Find the perfect rental property or rent out your property with our comprehensive rental services.",
      features: [
        "Tenant Matching",
        "Lease Agreement",
        "Rental Property Management",
        "Property Maintenance",
      ],
    },
    {
      title: "Property Management",
      description:
        "Let us take care of your investment property. We handle tenant screening, rent collection, maintenance, and more.",
      features: [
        "Tenant Screening",
        "Rent Collection",
        "Maintenance Coordination",
        "Financial Reporting",
      ],
    },
    {
      title: "Investment Consulting",
      description:
        "Get expert advice on real estate investments, market trends, and property development. We help you make informed decisions.",
      features: [
        "Investment Analysis",
        "Market Research",
        "Development Planning",
        "Risk Assessment",
      ],
    },
    {
      title: "Market Analysis",
      description:
        "Get detailed insights into local real estate market trends, pricing, and investment opportunities.",
      features: [
        "Trend Analysis",
        "Pricing Reports",
        "Investment Opportunities",
        "Competitor Analysis",
      ],
    },
    {
      title: "Legal Assistance",
      description:
        "Navigate the legal complexities of real estate transactions with our expert legal support and guidance.",
      features: [
        "Contract Review",
        "Title Search",
        "Legal Consultation",
        "Dispute Resolution",
      ],
    },
    {
      title: "Home Inspection",
      description:
        "Get a comprehensive inspection of your property to identify any issues and ensure everything is in good condition.",
      features: [
        "Structural Inspection",
        "Electrical Systems Check",
        "Plumbing Assessment",
        "Safety Compliance Review",
      ],
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
      {services.map((service, idx) => (
        <div key={idx} className='border border-gray-300 rounded-lg p-6 mb-6'>
          <h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
          <p className='text-gray-700 mb-4'>{service.description}</p>
          <ul className='list-disc mt-24 flex flex-col justify-end end list-inside text-gray-600  marker:text-[#619B7F]'>
            {service.features.map((feature, fidx) => (
              <li key={fidx}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
