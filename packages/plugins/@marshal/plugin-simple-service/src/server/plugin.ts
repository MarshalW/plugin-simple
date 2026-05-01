import { Plugin } from '@nocobase/server';
import install from './install';

export class PluginSimpleServiceServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {}

  async install() {
    await install(this.app)
  }

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginSimpleServiceServer;
