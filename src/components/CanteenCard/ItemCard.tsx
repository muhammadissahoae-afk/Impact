import styles from "./Card.module.css";
export default function ItemCard() {
  return (
    <div className={`${styles.cardItem}`}>
      <img
        src="/images/items/item1.png"
        className="px-[48px] pb-[37px]"
        alt=""
      />
      <p className="text-c-blue text-sm text-fw-500 mb-[10px]">Spaghetti</p>
      <p className="text-light-blue text-fw-300 text-[14px] pb-[20px]">
        Spaghetti, mixed vegetables (carrots, corn, broccoli, bell peppers)
      </p>
      <div className="flex  flex-center w-full justify-end ">
        <button
          className=" btn-white btn-padding"
          style={{ padding: "5px 29px", borderRadius: "19.5px" }}
        >
          25.00
        </button>
      </div>
    </div>
  );
}
