import moment from "moment";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";

import initialData from "./normalized";

function useStoreData() {
  const store = useRef({
    ...initialData,
    setter: null,
  });

  const get = useCallback(() => store.current, []);

  const set = useCallback((value) => {
    store.current = { ...store.current, value };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setComment = useCallback((value) => {
    store.current = {
      ...store.current,
      entities: {
        ...store.current.entities,
        [value.id]: {
          id: value.id,
          date: moment().unix() * 1000,
          user: value.user,
          text: value.text,
          likes: 0,
          iLikedIt: false,
          replies: [],
        },
      },
      ids: [value.id, ...store.current.ids],
    };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setReply = useCallback((value) => {
    store.current = {
      ...store.current,
      entities: {
        ...store.current.entities,
        [value.commentId]: {
          ...store.current.entities[value.commentId],
          replies: [
            ...store.current.entities[value.commentId].replies,
            value.id,
          ],
        },
      },
      replies: {
        ...store.current.replies,
        [value.id]: {
          id: value.id,
          date: moment().unix() * 1000,
          user: value.user,
          text: value.text,
          likes: 0,
          iLikedIt: false,
          replies: [],
        },
      },
    };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const setLike = useCallback((value) => {
    if (value.isReply) {
      store.current = {
        ...store.current,
        replies: {
          ...store.current.replies,
          [value.id]: {
            ...store.current.replies[value.id],
            iLikedIt: !store.current.replies[value.id].iLikedIt,
            likes: store.current.replies[value.id].iLikedIt
              ? store.current.replies[value.id].likes-1
              : store.current.replies[value.id].likes+1,
          },
        },
      };
    } else {
      store.current = {
        ...store.current,
        entities: {
          ...store.current.entities,
          [value.id]: {
            ...store.current.entities[value.id],
            iLikedIt: !store.current.entities[value.id].iLikedIt,
            likes: store.current.entities[value.id].iLikedIt
              ? store.current.entities[value.id].likes-1
              : store.current.entities[value.id].likes+1,
          },
        },
      };
    }
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribers = useRef(new Set());

  const subscribe = useCallback((callback) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    setComment,
    setReply,
    setLike,
    subscribe,
  };
}

export const StoreContext = createContext(null);

export function useStore(selectore) {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("store not found");
  }

  const state = useSyncExternalStore(store.subscribe, () =>
    selectore(store.get())
  );

  return [state, store.set, store.setComment, store.setReply ,store.setLike];
}

export default function Provider({ children }) {
  return (
    <StoreContext.Provider value={useStoreData()}>
      {children}
    </StoreContext.Provider>
  );
}
