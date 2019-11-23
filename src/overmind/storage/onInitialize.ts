import { OnInitialize } from 'overmind';

const onInitialize: OnInitialize = async ({ state, effects }, overmind) => {
  // save state
  // overmind.addMutationListener(mutation => {
  //   if (mutation.path.indexOf('logInState') !== -1) {
  //     console.log('m', mutation)
  //     effects.storage.saveToIdb(
  //       'logInState',
  //       Number(state.auth.logInState).toString()
  //     );
  //   }
  // });
};

export default onInitialize;
