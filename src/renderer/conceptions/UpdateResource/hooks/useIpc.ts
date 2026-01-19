import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import isEqual from "lodash.isequal";
import {
  useSetUpdateResourceNameDispatch,
  useSetUpdateResourceResultDispatch,
  useUpdateResourceResultSelector,
} from "../context";

export const useIpc = () => {
  const setResult = useSetUpdateResourceResultDispatch();
  const setName = useSetUpdateResourceNameDispatch();
  const result = useUpdateResourceResultSelector();
  const resultRef = useRef(result);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.electron.send.getResource({
      id: id || "",
    });
  }, [id]);

  useEffect(() => {
    window.electron.receive.subscribeGetResource(({ item }) => {
      if (!isEqual(resultRef.current, item)) {
        setResult(item);
      }
      if (item !== undefined) {
        setName(item.name);
      }
    });
  }, [setName, setResult]);
};
