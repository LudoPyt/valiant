class ArrowMove {
  constructor() {
    this.directions = {
      forward: false,
      backward: false,
      left: false,
      right: false
    };
    this._setup();
  }

  _setup() {
    window.addEventListener('keydown', this._onKeyDown.bind(this), false);
    window.addEventListener('keyup', this._onKeyUp.bind(this), false);
  }

  _onKeyDown(e) {
    switch (e.keyCode) {
      case 37: // Left
      case 81: // Q
        this.directions.left = true;
        break;

      case 38: // Up
      case 90: // Z
        this.directions.forward = true;
        break;

      case 39: // Right
      case 68: // D
        this.directions.right = true;
        break;

      case 40: // Down
      case 83: // S
        this.directions.backward = true;
        break;
    }
  }

  _onKeyUp(e) {
    switch (e.keyCode) {
      case 37: // Left
      case 81: // Q
        this.directions.left = false;
        break;

      case 38: // Up
      case 90: // Z
        this.directions.forward = false;
        break;

      case 39: // Right
      case 68: // D
        this.directions.right = false;
        break;

      case 40: // Down
      case 83: // S
        this.directions.backward = false;
        break;
    }
  }
}

export default ArrowMove;
