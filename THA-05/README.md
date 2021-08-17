
# CRUD with fs module
- Javascript language has only access our browsers.
- Node has access to our system.

## FS Module
fs: Filesystem System Module

## CRUD Commands
> get inside node 
>>`node;`

>importing fs module
>>`var fs = require("fs");`

## CRAEATE
> create folder in the directory named day5
> `fs.mkdirSync("day5");`

>creates file named hello.txt inside file
>with content Hello aliens
>arrow function for error check

```js
fs.writeFileSync('file/hello.txt','Hello aliens',(err)=> {
... if(err){
..... console.log(err)
..... }
... });
```

## READ
> reads the file and return the data
> must include utf-8 otherwise u'll get buffer
>> `fs.readFileSync("file/hello.txt","utf-8");`

## UPDATE
> Appends hello.txt with content (appended part)
>>`fs.appendFileSync("file/hello3.txt", " bro pdhaee kar (appended part) ");`

>Rename the file
>specifying the full path is important
>>`fs.renameSync("file/hemllo.txt", "file/hello3.txt");`

## DELETE 
- In order to delete the folder we have to delte the file in it 
> To delete the file
>> `fs.unlinkSync("file/hello3.txt");`

>To delete the folder
>>`fs.rmdirSync("file");`


