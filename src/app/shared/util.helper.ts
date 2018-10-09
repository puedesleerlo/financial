import * as pe  from 'parse-error';
export class Util {
    static to(promise, parse?) {//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
        return promise.then(data => {
          return [null, data];
        }).catch(err => {
          if(parse===false) return [err];
          return [pe(err)]
        });
      }
    
      static TE = function(err_message:string, log?:boolean){ // TE stands for Throw Error
        if(log === true){
          console.error(err_message);
        }
    
        throw new Error(err_message);
      }
}