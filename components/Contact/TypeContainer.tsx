export default function TypeContainer() {
  return (
    <div className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
      <input
        aria-placeholder="Type Here"
        placeholder="Type Here..."
        className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
        type="text"
        name="message"
        required
      />

      <button className="outline-none focus:outline-none" type="submit">
        <svg
          className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 
            15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </button>
    </div>
  );
}
