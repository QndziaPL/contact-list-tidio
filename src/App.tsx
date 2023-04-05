import React, { useEffect, useRef, useState } from "react";
import apiData, { IContact } from "./api/api";
import PersonInfo from "./components/PersonInfo";
import { FetchState, FetchStateButton } from "./components/FetchStateButton";
import { SingleLetterWithColor } from "./components/loader/SingleLetterWithColor";

function App() {
  const [data, setData] = useState<IContact[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const mountedRef = useRef<boolean>(true);

  const getData = async () => {
    setFetchState("loading");
    try {
      const data = await apiData();
      if (data) {
        setFetchState("fetched");
        setData((prev) => [...prev, ...data]);
      }
    } catch (e) {
      setFetchState("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const triggerSelectedState = (id: string) => {
    setSelected((prev) => {
      const index = prev.indexOf(id);
      if (index === -1) return [...prev, id];
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          <PersonInfo
            selected={selected.includes(personInfo.id)}
            key={personInfo.id}
            data={personInfo}
            triggerSelectedState={() => triggerSelectedState(personInfo.id)}
          />
        ))}
        {
          <FetchStateButton state={fetchState} fetchData={getData}>
            Load more
          </FetchStateButton>
        }
      </div>
    </div>
  );
}

export default App;
