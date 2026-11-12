import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';

const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://picsum.photos/v2/list?page=${index}&limit=10`,
          { signal: controller.signal }
        );
        setUserData(data);
      } catch (err) {
        if (err.name !== 'CanceledError') console.error(err);
      }
    };

    getData();
    return () => controller.abort();
  }, [index]);

  return (
    <div className="bg-black overflow-auto h-screen p-4 text-white">
      <div className="flex h-[82%] flex-wrap gap-4 p-2">
        {userData.length === 0 ? (
          <h3 className="text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
            Loading...
          </h3>
        ) : (
          userData.map((elem, idx) => (
            <div key={idx}>
              <Card elem={elem} />
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center gap-6 items-center p-4">
        <button
          disabled={index === 1}
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={() => setIndex((i) => i - 1)}
        >
          Prev
        </button>
        <h4>Page {index}</h4>
        <button
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold"
          onClick={() => setIndex((i) => i + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;   