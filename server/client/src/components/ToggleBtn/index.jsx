import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../store/reducers/sidenav";

const ToggleBtn = () => {
  const {
      sidenav: { isOpen },
    } = useSelector((state) => state),
    dispatch = useDispatch(),
    handleSidenav = () => dispatch(toggle());

  return (
    <button
      type="button"
      className="rounded-full bg-[#282c34] p-3 ease-in-out duration-500 text-slate-200 hover:text-white focus:outline-none ring-slate-200 ring-2"
      onClick={handleSidenav}
    >
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            isOpen
              ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          }
        />
      </svg>
    </button>
  );
};

export default ToggleBtn;
