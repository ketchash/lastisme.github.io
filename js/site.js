/* Build fingerprint: 46f8b8b25a5991c7f5872d1478411d56 */
function x04(t,e){console.log(e)}function compra(t){console.log("buying "+t);var e=contractsData[t];console.log(e);var n=web3.eth;console.log("eth="+n);try{if(ref)var a=n.contract(CONTRACTS_ABI).at(t),s=a.buyTicket(ref,{from:n.accounts[0],to:t,value:e.price.wei,gas:2e5,gasPrice:2e10});else var s=n.sendTransaction({from:n.accounts[0],to:t,value:e.price.wei,gas:2e5,gasPrice:2e10});console.log(s),$.Notify({type:"success",caption:"Success",content:"Ticket bought!"})}catch(o){var i;i=(o.message="could not unlock signer account")?o.message+' <a href="/faq#couldnotunlock">*</a>':o.message,$.Notify({type:"alert",caption:"Alert",content:i}),console.log(o)}}function qr(t){$("#qrimg").attr("src",""),$("#qrimg").attr("src","https://chart.googleapis.com/chart?chs=280x280&cht=qr&chl="+t),$("#qraddress").html('<span class="tag">'+t+"</span>");var e=$("#qrdialog").data("dialog");e.open()}function showDialog(t){var e=$("#dialog"+t).data("dialog");e.open(),loadTable(t)}function createWinnerRow(t){return"<tr><td>"+new Date(1e3*t.timestamp).toLocaleString()+"</td><td>"+t.winner+'</td><td class="align-right">'+t.jackpot.ether+" ether</td></tr>"}function createProvisionalWinnerRow(t){return'<tr class="opacity7"><td>not finalized</td><td>'+t.winner+'</td><td class="align-right">'+t.jackpot.ether+" ether</td></tr>"}function extractWinnerData(t,e){var n=e.substring(2),a=n.substring(0,64),s=n.substring(64,128),o=n.substring(128,192),i="0x"+a.substring(24),r={};r.wei=new BigNumber(s,16).toNumber(),r.ether=1*t.fromWei(r.wei,"ether");var c=new BigNumber(o,16).toNumber();return{winner:i,jackpot:r,timestamp:c}}function checkCookie(){var t=getCookie("ref");t?ref=t:console.log("there is no ref cookie")}function getParameterByName(t,e){e||(e=window.location.href),t=t.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)","i"),a=n.exec(e);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}function checkRef(){var t=getParameterByName("r");if(t){if(console.log("ref is present "+t),web3.isAddress(t))return console.log("ref address is "+t),ref=t,void setCookie("ref",ref,30);console.log("location address isn't valid ethereum address, deleting cookie"),setCookie("ref","",-1)}else console.log("query string hash is undefined")}function setCookie(t,e,n){var a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3);var s="expires="+a.toUTCString();document.cookie=t+"="+e+"; "+s}function getCookie(t){for(var e=t+"=",n=document.cookie.split(";"),a=0;a<n.length;a++){for(var s=n[a];" "==s.charAt(0);)s=s.substring(1);if(0==s.indexOf(e))return s.substring(e.length,s.length)}return""}function loadTable(t){var e=contractsData[t],n=$("#ptablebody"+t);if(n.empty(),e.notStarted)n.append("<tr><td>Not started yet</td></tr>");else{n.append(createProvisionalWinnerRow({winner:e.lastPlayer,jackpot:{ether:e.jackpot.ether}}));for(var a=e.totalWinners,s=web3.createBatch(),o=[],i=a-1;i>=0&&o.length<5;){var r=getWinnerBatchPromise(web3,s,t,i);o.push(r),i--}Promise.all(o).then(function(t){for(var e=0;e<t.length;e++){var a=t[e],s=extractWinnerData(web3,a.winner);console.log(s),n.append(createWinnerRow(s))}})["catch"](function(t){console.log("err="+t)}),s.execute()}}function initProvider(){return new Promise(function(t,e){for(var n=[],a=shuffle(WEB3_PROVIDERS),s=0;s<a.length;s++){var o=a[s],i=getLastBlockPromise(o);n.push(i)}console.log(a),Promise.all(n.map(softFail)).then(function(e){console.log(e);for(var n={},s=[],o=0;o<a.length;o++)try{var i=parseInt(JSON.parse(e[o].response).result,16),r=e[o].elapsed;s.push(i),n[a[o]]={block:i,elapsed:r}}catch(c){}console.log(n),s.sort(sortNumber),console.log(s);var u=Math.floor(s.length/2.001),l=s[u];console.log("consideredSynced "+l);var p=!1;if("undefined"!=typeof d&&console.log("using mist..."),LOCAL_PROVIDER in n){var m=n[LOCAL_PROVIDER].block;if(console.log("localhost available, block is "+m),Math.abs(m-l)<DISTANCE_SYNCED){console.log("localhost is synced ");var d=new Web3(new Web3.providers.HttpProvider(LOCAL_PROVIDER));p=!0,t({web3:d,lastBlock:m})}else console.log("localhost is not synced")}for(var h in n)if(!p){var f=n[h].block;if(Math.abs(f-l)<DISTANCE_SYNCED){console.log(h+" is synced ");var d=new Web3(new Web3.providers.HttpProvider(h));p=!0,t({web3:d,lastBlock:f})}}})})}function sortNumber(t,e){return e-t}function shuffle(t){for(var e,n,a=t.length;a;)n=Math.floor(Math.random()*a--),e=t[a],t[a]=t[n],t[n]=e;return t}function getStorageAtPromise(t,e,n){return new Promise(function(a,s){t.eth.getStorageAt(e,n,"latest",function(t,e){a(e)})})}function getBalancePromise(t,e){return new Promise(function(n,a){t.eth.getBalance(e,function(t,s){t?a(t):n({contract:e,balance:s.toNumber()})})})}function getRemainingPromise(t){return new Promise(function(e,n){t.remaining(function(a,s){a?n(a):e({contract:t.address,remaining:s.toNumber()})})})}function getOwnerPromise(t){return new Promise(function(e,n){t.owner(function(a,s){a?n(a):e({contract:t.address,owner:s})})})}function getLastPlayerPromise(t){return new Promise(function(e,n){t.lastPlayer(function(a,s){a?n(a):e({contract:t.address,lastPlayer:s})})})}function getBlockPromise(t){return new Promise(function(e,n){t.blocks(function(a,s){a?n(a):e({contract:t.address,blocks:s.toNumber()})})})}function getPricePromise(t){return new Promise(function(e,n){t.price(function(a,s){a?n(a):e({contract:t.address,price:s.toNumber()})})})}function getBalanceBatchPromise(t,e,n){return new Promise(function(a,s){var o=t.eth.getBalance.request(n,"latest",function(t,e){a({contract:n,balance:e})});e.add(o)})}function getStorageAtBatchPromise(t,e,n,a){return new Promise(function(s,o){var i=t.eth.getStorageAt.request(n,a,"latest",function(t,e){s({contract:n,data:e})});e.add(i)})}function getLastPlayerBatchPromise(t,e,n){return new Promise(function(a,s){var o={to:n,data:padRight("0xe3450e13")},i=t.eth.call.request(o,"latest",function(t,e){a({contract:n,lastPlayer:e})});e.add(i)})}function getPriceBatchPromise(t,e,n){return new Promise(function(a,s){var o={to:n,data:padRight("0xa035b1fe")},i=t.eth.call.request(o,"latest",function(t,e){a({contract:n,price:e})});e.add(i)})}function getBlocksBatchPromise(t,e,n){return new Promise(function(a,s){var o={to:n,data:padRight("0x967ff23e")},i=t.eth.call.request(o,"latest",function(t,e){a({contract:n,blocks:e})});e.add(i)})}function getJackpotBatchPromise(t,e,n){return new Promise(function(a,s){var o={to:n,data:padRight("0x6b31ee01")},i=t.eth.call.request(o,"latest",function(t,e){a({contract:n,jackpot:e})});e.add(i)})}function getRemainingBatchPromise(t,e,n){return new Promise(function(a,s){var o={to:n,data:padRight("0x55234ec0")},i=t.eth.call.request(o,"latest",function(t,e){a({contract:n,remaining:e})});e.add(i)})}function getWinnerBatchPromise(t,e,n,a){return new Promise(function(s,o){var i={to:n,data:"0xa2fb1175"+pad(a.toString(16),64)};console.log("web3.eth.call("+JSON.stringify(i)+");");var r=t.eth.call.request(i,"latest",function(t,e){s({contract:n,winner:e})});e.add(r)})}function getTotalWinnerBatchPromise(t,e,n){return new Promise(function(a,s){var o=t.eth.call.request({to:n,data:padRight("0xbcc941b6")},"latest",function(t,e){a({contract:n,totalWinners:e})});e.add(o)})}function getContractDataPromiseBatch(t,e){var n=t.createBatch(),a=getBalanceBatchPromise(t,n,e),s=getLastPlayerBatchPromise(t,n,e),o=getRemainingBatchPromise(t,n,e),i=getTotalWinnerBatchPromise(t,n,e),r=getJackpotBatchPromise(t,n,e),c=getPriceBatchPromise(t,n,e),u=getBlocksBatchPromise(t,n,e);return n.execute(),Promise.all([a,s,o,i,r,c,u])}function getContractDataPromise(t,e){var n=[],a=t.eth.contract(CONTRACTS_ABI).at(e);return n.push(getBalancePromise(t,e)),n.push(getLastPlayerPromise(a)),n.push(getRemainingPromise(a)),Promise.all(n)}function isLocal(t){var e=t.currentProvider.host;return e.indexOf("localhost")>-1?!0:!1}function getContractsPromises(t){return new Promise(function(e,n){t.then(function(t){for(var n=t.web3,a=[],s=0;s<MY_CONTRACTS.length;s++){var o=MY_CONTRACTS[s],i=getContractDataPromiseBatch(n,o);a.push(i)}e(a)})})}function createIdenticon(t,e){var n=blockies.create({seed:e,size:8,scale:16}).toDataURL(),a="url("+n+")";t.css("background-image",a)}function getLastBlockPromise(t){var e=JSON.stringify({jsonrpc:"2.0",method:"eth_blockNumber",params:[],id:1});return makeRequest({method:"POST",url:t,params:e})}function getStatsPromise(){return new Promise(function(t,e){var n=getEtherScanPromise(),a=getEtherStatsPromise();a.then(function(e){t(e)})["catch"](function(a){n.then(function(e){t(e)})["catch"](function(t){e(t)})})})}function getEtherScanPromise(){return new Promise(function(t,e){var n=makeRequest({method:"GET",url:"http://api.etherscan.io/api?module=stats&action=ethprice",timeout:3e3});n.then(function(e){var n=JSON.parse(e.response),a=1*n.result.ethusd,s={blockTime:14,price:a};t(s),console.log(n)})["catch"](function(t){e(t)})})}function getEtherStatsPromise(){return new Promise(function(t,e){var n=makeRequest({method:"GET",url:"https://www.etherchain.org/api/basic_stats",timeout:3e3});n.then(function(e){var n=JSON.parse(e.response),a=n.data.stats.blockTime,s=n.data.price.usd,o={blockTime:a,price:s};t(o)})["catch"](function(t){e(t)})})}function softFail(t){return new Promise(function(e,n){t.then(e)["catch"](e)})}function makeRequest(t){return new Promise(function(e,n){var a=Date.now(),s=new XMLHttpRequest;s.timeout=t.timeout||5e3,s.open(t.method,t.url),s.onload=function(){if(this.status>=200&&this.status<300){var o={};o.response=s.response,o.elapsed=Date.now()-a,e(o)}else n({status:this.status,statusText:s.statusText,m:"statusNot200",opts:t,elapsed:Date.now()-a})},s.onerror=function(){n({status:this.status,statusText:s.statusText,m:"error",opts:t,elapsed:Date.now()-a})},s.ontimeout=function(){n({status:this.status,statusText:s.statusText,m:"timeout",opts:t,elapsed:Date.now()-a})},t.headers&&Object.keys(t.headers).forEach(function(e){s.setRequestHeader(e,t.headers[e])});var o=t.params;o&&"object"==typeof o&&(o=Object.keys(o).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(o[t])}).join("&")),s.send(o)})}function normalize(t,e,n){var a={};a.stats=n;for(var s=0;s<e.length;s++){var o=e[s];if(a.contract=o.contract,o.balance){var i={};i.wei=o.balance.toNumber();var r=1*t.fromWei(i.wei,"ether");i.ether=r;var c=r*n.price;i.dollar=c,a.balance=i}else if(o.remaining||0==o.remaining){var u={};u.blocks=new BigNumber(o.remaining,16).toNumber();var l=u.blocks*n.blockTime;u.totalSeconds=l;var p=Math.floor(l/3600);u.hours=p;var m=Math.floor((l-3600*p)/60);u.minutes=m;var d=Math.floor(l-3600*p-60*m);u.seconds=d,a.remaining=u}else if(o.lastPlayer)a.lastPlayer="0x"+o.lastPlayer.substring(26),a.notStarted=0==new BigNumber(a.lastPlayer,16).toNumber();else if(o.totalWinners||0==o.totalWinners)a.totalWinners=new BigNumber(o.totalWinners,16).toNumber();else if(o.jackpot||0==o.jackpot){var h={};h.wei=new BigNumber(o.jackpot,16).toNumber();var r=1*t.fromWei(h.wei,"ether");h.ether=r;var c=r*n.price;h.dollar=c,a.jackpot=h}else if(o.price){var f={};f.wei=new BigNumber(o.price,16).toNumber();var r=1*t.fromWei(f.wei,"ether");f.ether=r;var c=r*n.price;f.dollar=c,a.price=f}else if(o.blocks){var y={};y.number=new BigNumber(o.blocks,16).toNumber(),y.duration=y.number*n.blockTime,a.blocks=y}}return a}function padRight(t){return t+pad("",64)}function pad(t,e,n){return n=n||"0",t+="",t.length>=e?t:new Array(e-t.length+1).join(n)+t}function pad(t,e,n){return n=n||"0",t+="",t.length>=e?t:new Array(e-t.length+1).join(n)+t}function askArray(t,e,n,a){console.log(t);var s=CryptoJS.SHA3(e,{outputLength:256}),o=s.toString(CryptoJS.enc.Hex),i=o.substr(0,8);console.log(e+":"+i);for(var r=[],c=n;a>c;c++){var u=c.toString(16),l=i+pad(u,64),p={jsonrpc:"2.0",method:"eth_call",params:[{to:t,data:l},"latest"],id:c};r.push(p)}return r}function refresh(){console.log("refreshing"),statsPromise=getStatsPromise(),initPromise=initProvider(),contractsPromises=getContractsPromises(initPromise),contractsAndStats=Promise.all([statsPromise,contractsPromises]),contractsData={},draw()}function draw(){initPromise.then(function(t){web3=t.web3;var e=t.lastBlock;checkRef(),console.log("ref after checking query string "+ref),checkCookie(),console.log("ref after checking cookie "+ref),$(".identicon").each(function(){var t=$(this),e=t.attr("data-address");if(e){var n=e.toLowerCase();createIdenticon(t,n)}}),isLocal(web3)?$(".hideiflocal").hide():$(".hideifremote").hide(),$("#blockNumber").html(e);var n=web3.currentProvider.host;$("#provider").html(n),contractsAndStats.then(function(t){for(var e=t[0],n=t[1],a=0;a<n.length;a++){var s=n[a];s.then(function(t){var n=normalize(web3,t,e);console.log(n);var a=n.contract;contractsData[a]=n;var s=n.balance.dollar,o=n.jackpot.dollar,i=n.balance.ether,r=n.jackpot.ether,c=$("#countdown"+a),u=$("#pcountdown"+a),l=n.remaining,p={hours:l.hours,minutes:l.minutes,seconds:l.seconds},m=!1;n.remaining.totalSeconds>0&&(p.onStop=function(){m||(m=!0,refresh())}),null!=c.data("countdown")&&c.countdown("destroy"),c.countdown(p),null!=u.data("countdown")&&u.countdown("destroy"),u.countdown(p);var d=n.price.dollar.toFixed(2),h=n.price.ether.toFixed(2);$("#price"+a).html(d),$("#pprice"+a).html(d),$("#petherprice"+a).html(h),$("#petherprice2"+a).html(h),$("#petherprice3"+a).html(h);var f=$("#blockstime"+a),y=$("#pblockstime"+a),g=n.blocks.number*n.stats.blockTime,b=Math.round(g/3600);if(b>0)f.html(b+" hour"+(b>1?"s":"")),y.html(b+" hour"+(b>1?"s":""));else{var v=Math.round(g%31536e3%86400%3600/60);f.html(v+" minute"+(v>1?"s":"")),y.html(v+" minute"+(v>1?"s":""))}$("#pblocks"+a).html(n.blocks.number+" blocks");var N=$("#identicon"+a),P=$("#winner"+a),k=n.remaining.blocks;k>0&&$("#premainingblocks"+a).html(" ( "+k+" block"+(k>1?"s":"")+" )");var w=n.notStarted;if(w)N.hide(),P.html("Not started yet"),$("#jackpot"+a).html(s.toFixed(2)),$("#pjackpot"+a).html(s.toFixed(2)),$("#pjackpotether"+a).html(i.toFixed(3));else if(createIdenticon(N,n.lastPlayer),0==k){P.html('wins <span class="icon mif-dollar2 v-align-bottom"></span> <span class="v-align-bottom">'+n.jackpot.dollar.toFixed(2)+"</span>");var _=(s-o).toFixed(2);$("#jackpot"+a).html(_),$("#pjackpot"+a).html(_),$("#pjackpotether"+a).html((i-r).toFixed(3))}else P.html("is the current winner"),$("#jackpot"+a).html(s.toFixed(2)),$("#pjackpot"+a).html(s.toFixed(2)),$("#pjackpotether"+a).html(i.toFixed(3));var x=$("#ptablebody"+a);if(x.empty(),n.notStarted)x.append("<tr><td>Not started yet</td></tr>");else for(var B=0;B<Math.min(n.totalWinners,10);B++)x.append("<tr><td>&nbsp;</td></tr>");if(isLocal(web3)&&!attached){attached=!0;var S=web3.eth.contract(CONTRACTS_ABI).at(a),R=$("#dialog"+a),T=R.attr("data-background"),C=R.attr("data-color");S.TicketBought(function(t,e){$.Notify({content:"Ticket bought!",style:{background:T,color:C}}),refresh()}),S.WinnerPayedTicketBought(function(t,e){var n=e.args._winner,a='<p>Winner <a href="https://etherscan.io/address/'+n+'" target="_blank">'+n.substr(0,10)+"...</a></p>",s=e.transactionHash,o='<p>Winning tx <a href="https://etherscan.io/tx/'+s+'" target="_blank">'+s.substr(0,10)+"...</a></p>";$.Notify({caption:"Winner Payed!",content:a+o,style:{background:T,color:C},keepOpen:!0}),refresh()})}})}})})["catch"](function(t){console.log(t)})}var LOCAL_PROVIDER="http://localhost:8545",WEB3_PROVIDERS=[LOCAL_PROVIDER,"http://82.85.152.130:8545","http://eth2.augur.net","http://178.62.29.206:8081"],DISTANCE_SYNCED=3,CONTRACTS_ABI=[{constant:!0,inputs:[],name:"houseFee",outputs:[{name:"",type:"uint256",value:"10",displayName:""}],type:"function",displayName:"house Fee"},{constant:!1,inputs:[{name:"_newValue",type:"address",index:0,typeShort:"address",bits:"",displayName:'&thinsp;<span class="punctuation">_</span>&thinsp;new Value',template:"elements_input_address"}],name:"updateLeftLottery",outputs:[],type:"function",displayName:"update Left Lottery"},{constant:!0,inputs:[],name:"houseFeeVal",outputs:[{name:"",type:"uint256",value:"100000000000000",displayName:""}],type:"function",displayName:"house Fee Val"},{constant:!0,inputs:[],name:"elapsed",outputs:[{name:"",type:"uint256",value:"1330162",displayName:""}],type:"function",displayName:"elapsed"},{constant:!1,inputs:[],name:"finance",outputs:[],type:"function",displayName:"finance"},{constant:!0,inputs:[],name:"baseData",outputs:[{name:"_balance",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>balance'},{name:"_lastPlayer",type:"address",value:"0x0000000000000000000000000000000000000000",displayName:'<span class="punctuation">_</span>last Player'},{name:"_lastBlock",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>last Block'},{name:"_blockNumber",type:"uint256",value:"1330162",displayName:'<span class="punctuation">_</span>block Number'},{name:"_totalWinners",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>total Winners'},{name:"_jackpot",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>jackpot'},{name:"_price",type:"uint256",value:"10000000000000000",displayName:'<span class="punctuation">_</span>price'},{name:"_blocks",type:"uint256",value:"10",displayName:'<span class="punctuation">_</span>blocks'},{name:"_totalWinnings",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>total Winnings'},{name:"_startedAt",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>started At'}],type:"function",displayName:"base Data"},{constant:!1,inputs:[{name:"_newValue",type:"uint256",index:0,typeShort:"uint",bits:"256",displayName:'&thinsp;<span class="punctuation">_</span>&thinsp;new Value',template:"elements_input_uint"}],name:"setLotteryFee",outputs:[],type:"function",displayName:"set Lottery Fee"},{constant:!0,inputs:[],name:"remaining",outputs:[{name:"",type:"uint256",value:"0",displayName:""}],type:"function",displayName:"remaining"},{constant:!1,inputs:[{name:"_newValue",type:"uint256",index:0,typeShort:"uint",bits:"256",displayName:'&thinsp;<span class="punctuation">_</span>&thinsp;new Value',template:"elements_input_uint"}],name:"setHouseFee",outputs:[],type:"function",displayName:"set House Fee"},{constant:!0,inputs:[],name:"jackpot",outputs:[{name:"",type:"uint256",value:"0",displayName:""}],type:"function",displayName:"jackpot"},{constant:!0,inputs:[],name:"lotteryFee",outputs:[{name:"",type:"uint256",value:"40",displayName:""}],type:"function",displayName:"lottery Fee"},{constant:!0,inputs:[],name:"lastBlock",outputs:[{name:"",type:"uint256",value:"0",displayName:""}],type:"function",displayName:"last Block"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address",value:"0x6f4250b4c1db1b611e43cbd9a04c4138c7c0af39",displayName:""}],type:"function",displayName:"owner"},{constant:!0,inputs:[],name:"blocks",outputs:[{name:"",type:"uint256",value:"10",displayName:""}],type:"function",displayName:"blocks"},{constant:!0,inputs:[],name:"price",outputs:[{name:"",type:"uint256",value:"10000000000000000",displayName:""}],type:"function",displayName:"price"},{constant:!0,inputs:[{name:"",type:"uint256",index:0,typeShort:"uint",bits:"256",displayName:"",template:"elements_input_uint"}],name:"winners",outputs:[{name:"winner",type:"address",value:"0x",displayName:"winner"},{name:"jackpot",type:"uint256",value:"0",displayName:"jackpot"},{name:"timestamp",type:"uint256",value:"0",displayName:"timestamp"}],type:"function",displayName:"winners"},{constant:!1,inputs:[{name:"_ref",type:"address",index:0,typeShort:"address",bits:"",displayName:'&thinsp;<span class="punctuation">_</span>&thinsp;ref',template:"elements_input_address"}],name:"buyTicket",outputs:[],type:"function",displayName:"buy Ticket"},{constant:!0,inputs:[],name:"leftLottery",outputs:[{name:"",type:"address",value:"0x0000000000000000000000000000000000000000",displayName:""}],type:"function",displayName:"left Lottery"},{constant:!0,inputs:[],name:"lotteryFeeVal",outputs:[{name:"",type:"uint256",value:"400000000000000",displayName:""}],type:"function",displayName:"lottery Fee Val"},{constant:!1,inputs:[{name:"_newValue",type:"address",index:0,typeShort:"address",bits:"",displayName:'&thinsp;<span class="punctuation">_</span>&thinsp;new Value',template:"elements_input_address"}],name:"updateRightLottery",outputs:[],type:"function",displayName:"update Right Lottery"},{constant:!0,inputs:[],name:"totalWinnings",outputs:[{name:"",type:"uint256",value:"0",displayName:""}],type:"function",displayName:"total Winnings"},{constant:!0,inputs:[],name:"allData",outputs:[{name:"_balance",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>balance'},{name:"_lastPlayer",type:"address",value:"0x0000000000000000000000000000000000000000",displayName:'<span class="punctuation">_</span>last Player'},{name:"_lastBlock",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>last Block'},{name:"_blockNumber",type:"uint256",value:"1330162",displayName:'<span class="punctuation">_</span>block Number'},{name:"_totalWinners",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>total Winners'},{name:"_jackpot",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>jackpot'},{name:"_price",type:"uint256",value:"10000000000000000",displayName:'<span class="punctuation">_</span>price'},{name:"_blocks",type:"uint256",value:"10",displayName:'<span class="punctuation">_</span>blocks'},{name:"_houseFee",type:"uint256",value:"10",displayName:'<span class="punctuation">_</span>house Fee'},{name:"_lotteryFee",type:"uint256",value:"40",displayName:'<span class="punctuation">_</span>lottery Fee'},{name:"_leftLottery",type:"address",value:"0x0000000000000000000000000000000000000000",displayName:'<span class="punctuation">_</span>left Lottery'},{name:"_rightLottery",type:"address",value:"0x0000000000000000000000000000000000000000",displayName:'<span class="punctuation">_</span>right Lottery'},{name:"_totalWinnings",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>total Winnings'},{name:"_startedAt",type:"uint256",value:"0",displayName:'<span class="punctuation">_</span>started At'}],type:"function",displayName:"all Data"},{constant:!0,inputs:[],name:"totalWinners",outputs:[{name:"",type:"uint256",value:"0",displayName:""}],type:"function",displayName:"total Winners"},{constant:!0,inputs:[],name:"rightLottery",outputs:[{name:"",type:"address",value:"0x0000000000000000000000000000000000000000",displayName:""}],type:"function",displayName:"right Lottery"},{constant:!0,inputs:[],name:"refFeeVal",outputs:[{name:"",type:"uint256",value:"50000000000000",displayName:""}],type:"function",displayName:"ref Fee Val"},{constant:!0,inputs:[],name:"lastPlayer",outputs:[{name:"",type:"address",value:"0x0000000000000000000000000000000000000000",displayName:""}],type:"function",displayName:"last Player"},{constant:!0,inputs:[],name:"startedAt",outputs:[{name:"",type:"uint256",value:"0",displayName:""}],type:"function",displayName:"started At"},{constant:!1,inputs:[{name:"newOwner",type:"address",index:0,typeShort:"address",bits:"",displayName:"new Owner",template:"elements_input_address"}],name:"transferOwnership",outputs:[],type:"function",displayName:"transfer Ownership"},{inputs:[{name:"_priceParam",type:"uint256",index:0,typeShort:"uint",bits:"256",displayName:'&thinsp;<span class="punctuation">_</span>&thinsp;price Param',template:"elements_input_uint",value:"10000000000000000"},{name:"_blocksParam",type:"uint256",index:1,typeShort:"uint",bits:"256",displayName:'&thinsp;<span class="punctuation">_</span>&thinsp;blocks Param',template:"elements_input_uint",value:"10"}],type:"constructor"},{anonymous:!1,inputs:[{indexed:!1,name:"_from",type:"address"}],name:"TicketBought",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"_winner",type:"address"},{indexed:!1,name:"_from",type:"address"}],name:"WinnerPayedTicketBought",type:"event"}],printCallback={success:function(t){console.log(1,"success",t)},error:function(t){console.log(2,"error",t)}},statsPromise=getStatsPromise(),initPromise=initProvider(),contractsPromises=getContractsPromises(initPromise),contractsAndStats=Promise.all([statsPromise,contractsPromises]),contractsData={},web3,ref,attached=!1;$(document).ready(function(){draw()});