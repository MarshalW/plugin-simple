import { importData } from '@marshal/plugin-snapshot';
import Application from '@nocobase/server';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const install = async (app: Application) => {
    // data.sql 位于当前文件同级目录
    const sqlfile = resolve(__dirname, 'data.sql');

    // 文件不存在：记录警告并直接退出
    if (!existsSync(sqlfile)) {
        app.logger.warn(
            `[importData] SQL 文件不存在，已跳过导入: ${sqlfile}`
        );
        return;
    }

    const sec = await importData(sqlfile);
    if (sec > 0) {
        app.logger.info(`[importData] 完成，耗时 ${sec}s`);
    }
};

export default install;
