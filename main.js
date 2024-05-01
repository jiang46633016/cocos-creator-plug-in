var fs = require('fs-extra');
var file = require('./util/file');

module.exports = {
    load() {
    },

    unload() {
    },

    replaceDirUuid: function (path, dbpath) {
        Editor.log('开始修改uuid 路径:' + path);
        file.findDirUuid(path);
        file.replaceDirUuid(path);

        Editor.log('开始刷新uuid:' + dbpath);
        Editor.assetdb.refresh(dbpath, function (err, results) {
            Editor.log('资源uuid刷新完成');
        });
    },

    messages: {
        'refresh'() {
            var uuids = Editor.Selection.curSelection('asset');
            uuids.forEach((uuid) => {
                var dir_path = Editor.assetdb._uuid2path[uuid];
                if (fs.existsSync(dir_path)) {
                    this.replaceDirUuid(dir_path, Editor.assetdb.uuidToUrl(uuid));
                }
            });
        },
        'refresh-path': function (event, dir_path, refresh_path) {
            if (fs.existsSync(dir_path)) {
                this.replaceDirUuid(dir_path, refresh_path); // Editor.assetdb.fspathToUrl(refresh_path)
                if (event.reply) {
                    event.reply(null, null);
                }
            }
        },
    },
}