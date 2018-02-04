var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

/* LEVEL */

router.get('/*', function(req, res, next){
    const url = req.url;
    const reqPath = path.join('/api', url);
    console.log(reqPath);

    if (url == 'folders'){
        return res.sendStatus(401);
    }

    if(!fs.existsSync(reqPath)){
        return res.send('path does not exists');
    };

    if(fs.statSync(reqPath).isFile()){
        return res.download(reqPath);
    } else {
        fs.readdir(reqPath, (err, files)=>{
            if(err){
                console.log('error');
                return console.log(err);
            }
            let fileArray = [];
            files.forEach((file)=> {
                fileArray.push({
                    name: file,
                    path: path.join('./folders', reqPath.split('/api')[1], file),
                    extension: path.extname(file),
                    className: fs.statSync(path.join(reqPath, file)).isDirectory() ? 'li-folder' : 'li-document'
                });
            });
            return res.render('./templates/dashboard/index', {hasFiles:files.length>0, files:fileArray});
        });        
    }






});

/*

router.get('/:folderName/:secondFolderName', function(req, res, next){
    const reqPath = path.join('/api', req.params.folderName, req.params.secondFolderName);

    console.log('reqPath', reqPath);

    if(!fs.statSync(req.path).isDirectory()){
        return res.download(req.path);
    } else {

    fs.readdir(reqPath, (err, files)=>{
        if(err){
            console.log('error');
            return console.log(err);
        }
        let fileArray = [];
        files.forEach((file)=> {
            fileArray.push({
                name: file,
                path: path.join('./folders', reqPath.split('/api')[1], file),
                extension: path.extname(file),
                className: fs.statSync(path.join(reqPath, file)).isDirectory() ? 'li-folder' : 'li-document'
            });
        });
        res.render('./templates/dashboard/index', {hasFiles:files.length>0, files:fileArray});
    });
}
});

*/

    module.exports = router;