import styles from "./navBar.module.css";

function AuthButtons({ variant }: { variant: "desktop" | "mobile" }) {
  if (variant === "desktop") {
    return (
      <div className={`${styles["desktop-buttons"]}`}>
        <button
          className={` btn-text-sm btn-glass-white  ${styles["btn-glass-auth"]} px-3.75 py-2.75 rounded-[50px] text-[16px] font-normal`}
        >
          Enroll Online
        </button>
        <button
          className={` btn-text-sm btn-white  ${styles["btn-auth"]} px-8.75 py-2.75  rounded-[50px] text-[16px] font-medium`}
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${styles["mobile-buttons"]}`}>
      <button className="btn btn-text-xl btn-glass-white">Enroll Online</button>
      <button className="btn btn-text-xl btn-white">Log In</button>
    </div>
  );
}

export default AuthButtons;
