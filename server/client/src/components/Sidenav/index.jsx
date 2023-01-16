import { useState } from "react";
import title from "../../assets/title.png";

const Sidenav = () => {
  const [isOpen, toggle] = useState(false),
    handleSidenav = () => toggle(!isOpen);

  return (
    <div
      className="relative ease-in-out duration-500"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  --> */}

      {/* <div className="fixed inset-0 transition-opacity"></div> */}

      <div className="inset-0 overflow-hidden">
        <div className="inset-0 overflow-hidden">
          <div
            className={`pointer-events-none fixed inset-y-0 left-0 flex max-w-full transform transition ease-in-out duration-500 sm:duration-700 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        --> */}
            <div className="pointer-events-auto relative w-screen max-w-xs">
              {/* <!--
            Close button, show/hide based on slide-over state.

            Entering: "ease-in-out duration-500"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-500"
              From: "opacity-100"
              To: "opacity-0"
          --> */}
              <div className="absolute inset-y-1/2 right-0 -mr-8">
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
              </div>
              <div className="flex h-full flex-col bg-[#282c34] py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <img src={title} alt="title" className="mx-auto mb-10 w-50" />
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {/* <!-- Replace with your content --> */}
                  <div className="absolute inset-0 px-4 sm:px-6">
                    <div
                      className="h-full border-2 border-dashed border-gray-200"
                      aria-hidden="true"
                    >
                      <ul className="relative">
                        <li className="relative">
                          <a
                            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-slate-200 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                            href="#!"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="dark"
                          >
                            user link 1
                          </a>
                        </li>
                        <li className="relative">
                          <a
                            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-slate-200 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                            href="#!"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="dark"
                          >
                            user link 2
                          </a>
                        </li>
                        <li className="relative">
                          <a
                            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-slate-200 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                            href="#!"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="dark"
                          >
                            user link 2
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <!-- /End replace --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
