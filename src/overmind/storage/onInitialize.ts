import { OnInitialize } from 'overmind';

const onInitialize: OnInitialize = async ({ state, effects }, overmind) => {
  // restore state
  const favs = await effects.storage.getFromIdb('favs');
  if (favs !== undefined) {
    console.log('res favs', favs);
    state.quotes.favs = JSON.parse(favs);
  }

  // sync to store
  overmind.addMutationListener(mutation => {
    if (mutation.path.indexOf('favs') !== -1) {
      console.log('favs mutation', mutation);
      setTimeout(() => {
        effects.storage.saveToIdb('favs', JSON.stringify(state.quotes.favs));
      }, 100)
    }
  });
};

export default onInitialize;
