import title from "../../assets/title.png"

const Identify = () => {
  const handleChange = (e) => {

    console.log(`event`, e.target.value);
  },
    handleSubmit = (e) => {
      e.preventDefault();
    };

  return (
    <>
    <img src={title} alt="title" />
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-3 text-lg font-medium text-slate-200"
        >
          C'est quoi ton p'tit nom ?
        </label>
        <input
          id="name"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="un truc qui déchire"
          required
          onChange={handleChange}
        />
      </div>
    </form>
    </>
  );
};

export default Identify;
