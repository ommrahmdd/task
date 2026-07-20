import ProductBox from "../ProductBox";

export default function SensorSection() {
  const selectedItems = [
    {
      key: 1,
      title: "Wyze Sense Motion Sensor",
      variantDetail: [],
      image: "https://i.postimg.cc/yYNKbcqz/s-1.png",
      quantityName: "",
      unitPrice: 59.88,
      discount: null,
      stock: 15,
    },
    {
      key: 2,
      title: "Wyze Sense Hub (Required)",
      variantDetail: [],
      image: "https://i.postimg.cc/rmcXCtCp/s2.png",
      quantityName: "",
      unitPrice: 59.88,
      discount: null,
      stock: 15,
    },
  ];

  return (
    <div>
      <div className="space-y-[15px]">
        {selectedItems.map((item) => (
          <ProductBox
            key={item.key}
            title={item.title}
            variantDetail={item.variantDetail}
            image={item.image}
            quantityName={item.quantityName}
            unitPrice={item.unitPrice}
            discount={item.discount}
            stock={item.stock}
          />
        ))}
      </div>
    </div>
  );
}
