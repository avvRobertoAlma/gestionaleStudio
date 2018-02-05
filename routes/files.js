var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

/* LEVEL */

router.get('/*', function(req, res, next){
    const url = req.url;
    const reqPath = path.join('/api', '/files', url);
    console.log(reqPath);

    if (url == 'files'){
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
                    path: path.join('./files', reqPath.split('/api')[1], file),
                    extension: path.extname(file),
                    className: fs.statSync(path.join(reqPath, file)).isDirectory() ? 'li-folder' : 'li-document'
                });
            });
            return res.render('templates/dashboard/index', {hasFiles: true, files: fileArray})
        });        
    }






});

module.exports = router;
