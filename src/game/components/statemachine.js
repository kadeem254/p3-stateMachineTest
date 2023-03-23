const stateConfig = {
  onEnter: () => void 1,
  onUpdate: () => void 1,
  onExit: () => void 1,
};

export default class StateMachine {
  constructor(context) {
    this.context = context;
    this.states = {};

    this.currentState;
  }

  /**Adds a new state to the state machine */
  addState(key, config = {}) {
    // if state exists return
    if (`${key}` in this.states) return;

    this.states[`${key}`] = config;

    return this;
  }

  setState(key) {
    if (key in this.states == false) {
      return;
    }

    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit();
    }

    this.currentState = this.states[key];

    if (this.currentState.onEnter) {
      this.currentState.onEnter();
    }

    return this;
  }

  update(delta) {
    if (!this.currentState) return;

    if (this.currentState.onUpdate) {
      this.currentState.onUpdate();
    }

    return this;
  }
}
