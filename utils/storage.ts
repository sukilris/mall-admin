const createStorage = (key: string) => {
  return {
    get() {
      return localStorage.getItem(key);
    },
    set(value: any) {
      localStorage.setItem(key, value);
    },
    remove() {
      localStorage.removeItem(key);
    },
  };
};

export const {
  get: getToken,
  set: setToken,
  remove: removeToken,
} = createStorage("token");
