import ProductBox from "../ProductBox";

export default function AccessoriesSection() {
  const selectedItems = [
    {
      key: 1,
      title: "Wyze MicroSD Card (256GB)",
      variantDetail: [],
      image: "https://i.postimg.cc/KcCXJV5V/c.png",
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
