
export const saveState = (state:any) => {
    try {
      const serialState = JSON.stringify(state);
      localStorage.setItem('cart', serialState);
    } catch(err) {
        console.log(err);
    }
};

export const loadState = () => {
    try {
      const serialState = localStorage.getItem('cart');
      if (serialState === null) {
        return undefined;
      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
};