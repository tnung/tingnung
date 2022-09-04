'use babel';

import TingnungView from './tingnung-view';
import { CompositeDisposable } from 'atom';

export default {

  tingnungView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tingnungView = new TingnungView(state.tingnungViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tingnungView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tingnung:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tingnungView.destroy();
  },

  serialize() {
    return {
      tingnungViewState: this.tingnungView.serialize()
    };
  },

  toggle() {
    console.log('Tingnung was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
