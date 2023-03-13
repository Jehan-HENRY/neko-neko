import { useSelector } from "react-redux";
import title from "../../assets/title.png";

const Sidenav = () => {
  const {
    sidenav: { isOpen },
  } = useSelector((state) => state);

  return (
    <div
      className="relative ease-in-out duration-700"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="inset-0 overflow-hidden">
        <div className="inset-0 overflow-hidden">
          <div
            className={`pointer-events-none fixed inset-y-0 left-0 flex max-w-full transform transition ease-in-out duration-700 sm:duration-700 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="pointer-events-auto relative w-screen max-w-xs">
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
                            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-slate-200 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-700 ease-in-out"
                            href="#!"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="dark"
                          >
                            user link 1
                          </a>
                        </li>
                        <li className="relative">
                          <a
                            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-slate-200 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-700 ease-in-out"
                            href="#!"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="dark"
                          >
                            user link 2
                          </a>
                        </li>
                        <li className="relative">
                          <a
                            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-slate-200 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-700 ease-in-out"
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
