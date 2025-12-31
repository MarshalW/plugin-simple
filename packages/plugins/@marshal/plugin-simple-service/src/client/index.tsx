import { Plugin } from '@nocobase/client';
import { initSimpleBlock } from './components/simple';

export class PluginSimpleServiceClient extends Plugin {
  async afterAdd() {
  }

  async beforeLoad() { }

  async load() {
    initSimpleBlock(this.app)
  }
}

export default PluginSimpleServiceClient;
