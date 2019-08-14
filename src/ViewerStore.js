import { observable, computed } from 'mobx';

const STYLE_CONTAINER = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '200px',
  minWidth: '450px',
  margin: '0',
  padding: '0',
  top: '0',
  left: '0',
  overflow: 'hidden',
};

class ViewerStore {
    @observable.struct style = {
      backgroundColor: [0, 0, 0],
      containerStyle: STYLE_CONTAINER,
    };

    constructor() {
    }

    @computed get isBackgroundDark() {
      const backgroundColor = this.style.backgroundColor;
      return backgroundColor[0] +
          backgroundColor[1] +
          backgroundColor[2] <
        1.5;
    }
}

export default ViewerStore;
