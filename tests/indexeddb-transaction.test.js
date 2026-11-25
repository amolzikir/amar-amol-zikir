const vm=require("node:vm");
const {test}=require("node:test");
const assert=require("node:assert/strict");
const source=require("node:fs").readFileSync(require("node:path").join(__dirname,"..","index.html"),"utf8");
const start=source.indexOf("function putItem(");
const end=source.indexOf("\nfunction uid()",start);
if(start<0||end<0)throw new Error("IndexedDB write helpers were not found");
const context={STORE:"items",dbLocal:null,Promise,Error};
vm.runInNewContext(source.slice(start,end)+"\nglobalThis.writeHelpers={putItem,delLocal};",context);
class FakeTransaction{
 constructor(){this.operations=[]}
 objectStore(){return {put:value=>{this.operations.push(["put",value]);return {}},delete:id=>{this.operations.push(["delete",id]);return {}}}}
 complete(){this.oncomplete?.()}
 abort(){this.error=new Error("transaction aborted");this.onabort?.()}
}
function fakeDb(tx){return {transaction:(store,mode)=>{assert.equal(store,"items");assert.equal(mode,"readwrite");return tx}}}
test("putItem waits for the IndexedDB transaction to commit",async()=>{
 const tx=new FakeTransaction(),promise=context.writeHelpers.putItem({id:"n"},fakeDb(tx));
 let settled=false;promise.then(()=>{settled=true});
 await Promise.resolve();assert.equal(settled,false);assert.equal(tx.operations[0][0],"put");
 tx.complete();await promise;assert.equal(settled,true);
});
test("putItem rejects when the IndexedDB transaction aborts",async()=>{
 const tx=new FakeTransaction(),promise=context.writeHelpers.putItem({id:"n"},fakeDb(tx));
 tx.abort();await assert.rejects(promise,/transaction aborted/);
});
test("delLocal waits for transaction commit rather than request success",async()=>{
 const tx=new FakeTransaction();context.dbLocal=fakeDb(tx);
 const promise=context.writeHelpers.delLocal("n");let settled=false;promise.then(()=>{settled=true});
 await Promise.resolve();assert.equal(settled,false);assert.deepEqual(tx.operations[0],["delete","n"]);
 tx.complete();await promise;assert.equal(settled,true);
});
test("delLocal rejects when its transaction aborts",async()=>{
 const tx=new FakeTransaction();context.dbLocal=fakeDb(tx);
 const promise=context.writeHelpers.delLocal("n");tx.abort();
 await assert.rejects(promise,/transaction aborted/);
});
