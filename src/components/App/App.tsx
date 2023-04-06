import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import apiData, { IContact } from "../../api/api";
import PersonInfo from "../PersonInfo";
import { FetchButton, IFetchState } from "../FetchButton";
import {
  getListContainerScrollValue,
  sortDataBasedOnId,
  sortDataBasedOnSelected,
} from "../../helpers/helpers";
import { IPersonInfoRef } from "./types";

function App() {
  const mounted = useRef(true);

  const listContainerRef = useRef<HTMLDivElement>(null);
  const listContainerScrollValue = useRef(0);

  const [data, setData] = useState<IContact[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [fetchState, setFetchState] = useState<IFetchState>({
    state: "loading",
  });

  const getData = async () => {
    setFetchState({ state: "loading" });
    try {
      const data = await apiData();
      if (data && mounted.current) {
        setFetchState({ state: "fetched", newId: data[0].id });
        setData((prev) => [...prev, ...data]);
      }
    } catch (e) {
      if (mounted.current) {
        setFetchState({ state: "error", error: e.message });
      }
    }
  };

  const triggerSelectedState = (id: string) => {
    setSelected((prev) => {
      const index = prev.indexOf(id);
      if (index === -1) return [...prev, id];
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
    listContainerScrollValue.current = getListContainerScrollValue(
      personInfoRefs[id].current
    );
  };

  useEffect(() => {
    mounted.current = true;
    getData();

    return () => {
      mounted.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = listContainerScrollValue.current;
    }
  }, [selected]);

  const dataSorted = useMemo(
    () =>
      data
        .sort(sortDataBasedOnId)
        .sort((c1, c2) => sortDataBasedOnSelected(c1, c2, selected)),
    [data, selected]
  );

  const personInfoRefs = useMemo(
    () =>
      dataSorted.reduce((acc, curr) => {
        acc[curr.id] = createRef<HTMLDivElement>();
        return acc;
      }, {} as IPersonInfoRef),
    [dataSorted]
  );

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list" ref={listContainerRef}>
        {dataSorted.map(({ id, ...data }) => (
          <PersonInfo
            key={id}
            ref={personInfoRefs[id]}
            selected={selected.includes(id)}
            data={data}
            triggerSelectedState={() => triggerSelectedState(id)}
          />
        ))}
        <FetchButton state={fetchState} fetchData={getData} />
      </div>
    </div>
  );
}

export default App;
