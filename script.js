const _0x139305=_0x673f;(function(_0x4c27e1,_0x15bf0b){const _0x902148=_0x673f,_0x1b1bf4=_0x4c27e1();while(!![]){try{const _0x4a721e=-parseInt(_0x902148(0xb1))/0x1*(parseInt(_0x902148(0x8b))/0x2)+-parseInt(_0x902148(0x97))/0x3+-parseInt(_0x902148(0xd5))/0x4*(-parseInt(_0x902148(0xd7))/0x5)+parseInt(_0x902148(0x86))/0x6*(-parseInt(_0x902148(0xc0))/0x7)+parseInt(_0x902148(0x95))/0x8+-parseInt(_0x902148(0x72))/0x9+parseInt(_0x902148(0xd3))/0xa*(-parseInt(_0x902148(0xbb))/0xb);if(_0x4a721e===_0x15bf0b)break;else _0x1b1bf4['push'](_0x1b1bf4['shift']());}catch(_0x1f6616){_0x1b1bf4['push'](_0x1b1bf4['shift']());}}}(_0x2ab9,0xa97ff));function _0x2ab9(){const _0x57fdfb=['Error:\x20The\x20car\x20number\x20','value','display','slice','length','addCar','carModal','button','disabled','car-number','replace','ref','19914pMPlOX','Waiting\x20for\x20Reindeer','Sent-To-Registration','status','log','502NXRLnC','input','trim','Change\x20Total\x20Parking\x20Slots','forEach','createElement','includes','In-Car','\x0a\x20\x20\x20\x20\x20\x20<strong\x20style=\x22font-size:\x20smaller;\x22>Spot\x20','Add\x20Car','11079744cqOzUm','1:398724226058:web:cfb4d70283c546944d13f3','1001973LCoCrH','carInput','english','once','parking-number','addEventListener','</strong><br>\x0a\x20\x20\x20\x20\x20\x20Status:\x20<span\x20style=\x22font-size:\x20smaller;\x22>','then','N/A','language','parkingSlots','Current\x20parkingSlots:','innerHTML','Shopping','398724226058','parkingMap','set','keypress','https://renewalparking-default-rtdb.firebaseio.com','status-','Please\x20enter\x20a\x20valid\x20number\x20of\x20parking\x20slots.','filter','occupied','find','searchInput','3478','702gSDBah','textContent','Wrapping','warningMessage','style','pathname','G-SGV7YXDJ8X','val','AIzaSyDbs6UgbaxuxKZyG3v464lkeEtMJQbZ6-4','none','11QnfkaK','</span><br>\x0a\x20\x20\x20\x20\x20\x20Car\x20#\x20<span\x20style=\x22font-size:\x20smaller;\x22>','toLowerCase','map','parking-slot\x20','119gynEFt','Database\x20updated\x20successfully.','slot-','Available','Change\x20Status','onclick','</span>\x0a\x20\x20\x20\x20','display-only.html','placeholder','modalTitle','slotCount','Please\x20enter\x20a\x20valid\x20car\x20number.','database','some','appendChild','catch','Enter','undoButton','languageSelect','830310yTHKsZ','Enter\x20Car\x20Number','8WlecCy','renewalparking.appspot.com','2539410PruRft','location','\x20is\x20already\x20parked\x20in\x20another\x20spot.','keyup','getElementById','9511326xBIYQe','initializeApp','exists','</span><br>\x0a\x20\x20\x20\x20\x20\x20<span\x20style=\x22font-size:\x20smaller\x22;>Language:</span>\x20<span\x20style=\x22font-size:\x20smaller;\x22>','block','Remove\x20Car','div','Fetch-to-shop'];_0x2ab9=function(){return _0x57fdfb;};return _0x2ab9();}const firebaseConfig={'apiKey':_0x139305(0xb9),'authDomain':'renewalparking.firebaseapp.com','databaseURL':_0x139305(0xa9),'projectId':'renewalparking','storageBucket':_0x139305(0xd6),'messagingSenderId':_0x139305(0xa5),'appId':_0x139305(0x96),'measurementId':_0x139305(0xb7)},app=firebase[_0x139305(0x73)](firebaseConfig),database=firebase[_0x139305(0xcc)]();console[_0x139305(0x8a)]('Firebase\x20initialized\x20successfully!');let totalSlots=0x18,parkingSlots=[],currentModalAction=null,currentSlotNumber=null;function initializeParkingSlots(){const _0x3ed191=_0x139305;parkingSlots=Array['from']({'length':totalSlots},(_0x415f2d,_0x417ab4)=>({'parking-number':(_0x417ab4+0x1)['toString'](),'car-number':'','language':_0x3ed191(0x9f),'status':_0x3ed191(0x9f)})),updateDatabase();}const changeSlotsPassword=_0x139305(0xb0);function confirmChangeSlots(){const _0x4286be=_0x139305,_0x4b2b34=prompt('Please\x20enter\x20the\x20password\x20to\x20change\x20the\x20number\x20of\x20slots:');if(_0x4b2b34!==changeSlotsPassword){alert('Incorrect\x20password.\x20Access\x20denied.');return;}else{const _0x52c966=parseInt(document[_0x4286be(0x71)](_0x4286be(0x98))['value']);if(isNaN(_0x52c966)||_0x52c966<=0x0){alert(_0x4286be(0xab));return;}const _0x2eefb1=confirm('Changing\x20the\x20total\x20number\x20of\x20parking\x20slots\x20will\x20remove\x20any\x20car\x20number\x20data\x20from\x20the\x20removed\x20slots.\x20Do\x20you\x20want\x20to\x20proceed?');_0x2eefb1&&(totalSlots=_0x52c966,initializeParkingSlots(),closeModal(),renderParkingMap(),removalCount=0x0);}}function updateDatabase(){const _0x542912=_0x139305;firebase['database']()['ref'](_0x542912(0xa1))[_0x542912(0xa7)](parkingSlots)['then'](()=>console[_0x542912(0x8a)](_0x542912(0xc1)))['catch'](_0x92b69a=>console['error']('Error\x20updating\x20database:',_0x92b69a));}const statuses=[_0x139305(0x92),_0x139305(0x79),_0x139305(0x88),_0x139305(0xa4),_0x139305(0xb3),_0x139305(0x87)];function addCar(_0x55c10b,_0x4f0edc,_0x5e6500){const _0x25381c=_0x139305;console[_0x25381c(0x8a)](_0x25381c(0xa2),parkingSlots);const _0x4e46bd=parkingSlots[_0x25381c(0xcd)](_0x1f432d=>_0x1f432d['car-number']===_0x4f0edc&&_0x1f432d[_0x25381c(0x9b)]!==_0x55c10b);if(_0x4e46bd){alert(_0x25381c(0x7a)+_0x4f0edc+_0x25381c(0x6f));return;}const _0x32b1f3=parkingSlots['find'](_0x2b8b35=>_0x2b8b35[_0x25381c(0x9b)]===_0x55c10b);_0x32b1f3&&!_0x32b1f3[_0x25381c(0x83)]?(_0x32b1f3['car-number']=_0x4f0edc,_0x32b1f3[_0x25381c(0xa0)]=_0x5e6500,_0x32b1f3['status']=_0x25381c(0x92),updateDatabase(),renderParkingMap()):alert('Error:\x20The\x20selected\x20parking\x20spot\x20is\x20already\x20occupied\x20or\x20does\x20not\x20exist.');}function refresh(){renderParkingMap();}function changeStatus(_0x25da86){const _0x582f06=_0x139305,_0xfb2eb4=parkingSlots['find'](_0x65a407=>_0x65a407['parking-number']===_0x25da86);if(_0xfb2eb4['car-number']){const _0x48a397=statuses['indexOf'](_0xfb2eb4[_0x582f06(0x89)]),_0x551362=(_0x48a397+0x1)%statuses[_0x582f06(0x7e)];_0xfb2eb4['status']=statuses[_0x551362],updateDatabase();}renderParkingMap();}document[_0x139305(0x71)]('searchInput')['addEventListener'](_0x139305(0x70),_0x301d1e=>{const _0x5e0016=_0x139305;if(_0x301d1e['key']===_0x5e0016(0xd0))searchCar(),_0x301d1e['target'][_0x5e0016(0x7b)]='';else _0x301d1e['target'][_0x5e0016(0x7b)]===''&&renderParkingMap();});function searchCar(){const _0xdef612=_0x139305,_0x3249db=document[_0xdef612(0x71)](_0xdef612(0xaf))[_0xdef612(0x7b)][_0xdef612(0x8d)](),_0x103f2=document['getElementById']('parkingMap');if(_0x3249db===''){renderParkingMap();return;}const _0x88b458=parkingSlots[_0xdef612(0xac)](_0x92cbc1=>_0x92cbc1[_0xdef612(0x83)]&&_0x92cbc1[_0xdef612(0x83)][_0xdef612(0x91)](_0x3249db)||_0x92cbc1['parking-number']['toString']()[_0xdef612(0x91)](_0x3249db));_0x103f2[_0xdef612(0xa3)]='',_0x88b458['forEach'](_0x2487ed=>{const _0x8530ba=_0xdef612,_0x471704=document[_0x8530ba(0x90)](_0x8530ba(0x78));_0x471704['className']=_0x8530ba(0xbf)+(_0x2487ed[_0x8530ba(0x83)]?_0x8530ba(0xad):'available')+'\x20'+(_0x2487ed[_0x8530ba(0x89)]?_0x8530ba(0xaa)+_0x2487ed[_0x8530ba(0x89)][_0x8530ba(0xbd)]()[_0x8530ba(0x84)](/ /g,'-'):''),_0x471704['id']=_0x8530ba(0xc2)+_0x2487ed[_0x8530ba(0x9b)],_0x471704[_0x8530ba(0xa3)]=_0x8530ba(0x93)+_0x2487ed['parking-number']+'</strong><br>\x0a\x20\x20\x20\x20\x20\x20Status:\x20<span\x20style=\x22font-size:\x20smaller;\x22>'+(_0x2487ed[_0x8530ba(0x83)]?_0x2487ed[_0x8530ba(0x89)]||_0x8530ba(0x9f):_0x8530ba(0x9f))+_0x8530ba(0xbc)+(_0x2487ed[_0x8530ba(0x83)]||_0x8530ba(0xc3))+'</span><br>\x0a\x20\x20\x20\x20\x20\x20<span\x20style=\x22font-size:\x20smaller;\x22>Language:</span>\x20<span\x20style=\x22font-size:\x20smaller;\x22>'+(_0x2487ed['language']||'N/A')+_0x8530ba(0xc6);const _0x10260d=document[_0x8530ba(0x90)](_0x8530ba(0x81));_0x10260d[_0x8530ba(0xb2)]='Remove\x20Car',_0x10260d[_0x8530ba(0xc5)]=()=>removeCar(_0x2487ed[_0x8530ba(0x9b)]),_0x10260d['disabled']=!_0x2487ed[_0x8530ba(0x83)];const _0x362c3f=document[_0x8530ba(0x90)](_0x8530ba(0x81));_0x362c3f['textContent']=_0x8530ba(0xc4),_0x362c3f['onclick']=()=>changeStatus(_0x2487ed['parking-number']),_0x362c3f['disabled']=!_0x2487ed[_0x8530ba(0x83)],_0x2487ed[_0x8530ba(0x83)]?(_0x471704[_0x8530ba(0xce)](_0x10260d),_0x471704[_0x8530ba(0xce)](_0x362c3f)):_0x471704[_0x8530ba(0xce)](addButton),_0x103f2[_0x8530ba(0xce)](_0x471704);}),_0x88b458[_0xdef612(0x7e)]===0x0&&(_0x103f2[_0xdef612(0xa3)]='<p>No\x20matching\x20car\x20or\x20parking\x20spot\x20found.</p>');}function _0x673f(_0x5dcb3e,_0x39f667){const _0x2ab946=_0x2ab9();return _0x673f=function(_0x673fe0,_0x3dcffe){_0x673fe0=_0x673fe0-0x6f;let _0x7ea775=_0x2ab946[_0x673fe0];return _0x7ea775;},_0x673f(_0x5dcb3e,_0x39f667);}document['getElementById'](_0x139305(0xaf))[_0x139305(0x9c)](_0x139305(0xa8),_0x529e5a=>{const _0x2c8d42=/^[\d-]*$/;!_0x2c8d42['test'](_0x529e5a['key'])&&_0x529e5a['preventDefault']();});let lastRemovedSlot=null,removalCount=0x0;function removeCar(_0x14bf84){const _0x3bce4a=_0x139305,_0x227a6d=parkingSlots[_0x3bce4a(0xae)](_0x1d6f28=>_0x1d6f28[_0x3bce4a(0x9b)]===_0x14bf84);_0x227a6d&&_0x227a6d[_0x3bce4a(0x83)]&&(lastRemovedSlot={..._0x227a6d},_0x227a6d['car-number']=null,_0x227a6d['language']=null,_0x227a6d[_0x3bce4a(0x89)]=_0x3bce4a(0x9f),document['getElementById'](_0x3bce4a(0xd1))[_0x3bce4a(0x82)]=![],removalCount++,console[_0x3bce4a(0x8a)](removalCount),updateDatabase(),renderParkingMap());}function addCount(){if(removalCount>0x1){}}function undoRemove(){const _0x5c90b6=_0x139305;if(lastRemovedSlot){const _0xffdd79=parkingSlots[_0x5c90b6(0xae)](_0x204e93=>_0x204e93[_0x5c90b6(0x9b)]===lastRemovedSlot[_0x5c90b6(0x9b)]);_0xffdd79&&(_0xffdd79[_0x5c90b6(0x83)]=lastRemovedSlot['car-number'],_0xffdd79['language']=lastRemovedSlot[_0x5c90b6(0xa0)],_0xffdd79[_0x5c90b6(0x89)]=lastRemovedSlot[_0x5c90b6(0x89)],lastRemovedSlot=null,document[_0x5c90b6(0x71)](_0x5c90b6(0xd1))[_0x5c90b6(0x82)]=!![],updateDatabase(),renderParkingMap(),removalCount--,console[_0x5c90b6(0x8a)](removalCount));}}function openModal(_0x2fe035,_0x4c2c7a=null){const _0x37d1e9=_0x139305;currentModalAction=_0x2fe035,currentSlotNumber=_0x4c2c7a;const _0x3766d5=document[_0x37d1e9(0x71)](_0x37d1e9(0xc9)),_0x54e655=document[_0x37d1e9(0x71)](_0x37d1e9(0x98)),_0x5776a5=document['getElementById'](_0x37d1e9(0xd2)),_0x4a74df=document[_0x37d1e9(0x71)](_0x37d1e9(0xb4));if(_0x2fe035===_0x37d1e9(0x7f))_0x3766d5[_0x37d1e9(0xb2)]=_0x37d1e9(0xd4),_0x54e655[_0x37d1e9(0xc8)]='Car\x20Number',_0x5776a5[_0x37d1e9(0xb5)][_0x37d1e9(0x7c)]=_0x37d1e9(0x76),_0x4a74df['style'][_0x37d1e9(0x7c)]=_0x37d1e9(0xba);else _0x2fe035===_0x37d1e9(0xca)&&(_0x3766d5[_0x37d1e9(0xb2)]=_0x37d1e9(0x8e),_0x54e655[_0x37d1e9(0xc8)]='Total\x20Slots',_0x5776a5['style'][_0x37d1e9(0x7c)]='none',_0x4a74df[_0x37d1e9(0xb5)][_0x37d1e9(0x7c)]=_0x37d1e9(0x76));_0x54e655['value']='',_0x5776a5[_0x37d1e9(0x7b)]=_0x37d1e9(0x99),document[_0x37d1e9(0x71)](_0x37d1e9(0x80))[_0x37d1e9(0xb5)]['display']=_0x37d1e9(0x76),_0x54e655['addEventListener'](_0x37d1e9(0x8c),()=>{const _0x2561b6=_0x37d1e9;_0x54e655[_0x2561b6(0x7b)]=_0x54e655['value']['replace'](/[^0-9-]/g,'')[_0x2561b6(0x7d)](0x0,0x9);});}function closeModal(){const _0x3580b1=_0x139305;document[_0x3580b1(0x71)]('carModal')[_0x3580b1(0xb5)][_0x3580b1(0x7c)]='none';}function confirmAction(){const _0x3ef563=_0x139305;if(currentModalAction==='addCar'){const _0x106434=document[_0x3ef563(0x71)]('carInput')['value'][_0x3ef563(0x8d)](),_0x36eef3=document[_0x3ef563(0x71)](_0x3ef563(0xd2))[_0x3ef563(0x7b)];_0x106434?(addCar(currentSlotNumber,_0x106434,_0x36eef3),closeModal()):alert(_0x3ef563(0xcb));}else currentModalAction===_0x3ef563(0xca)&&confirmChangeSlots();}function renderParkingMap(){const _0x20da12=_0x139305,_0x589323=document[_0x20da12(0x71)](_0x20da12(0xa6));_0x589323[_0x20da12(0xa3)]='';const _0x195002=window[_0x20da12(0xd8)][_0x20da12(0xb6)][_0x20da12(0x91)](_0x20da12(0xc7));parkingSlots[_0x20da12(0x8f)](_0x1c354d=>{const _0x356f46=_0x20da12,_0x325cb4=document[_0x356f46(0x90)]('div');_0x325cb4['className']='parking-slot\x20'+(_0x1c354d[_0x356f46(0x83)]?'occupied':'available')+'\x20'+(_0x1c354d[_0x356f46(0x89)]?'status-'+_0x1c354d[_0x356f46(0x89)][_0x356f46(0xbd)]()['replace'](/ /g,'-'):''),_0x325cb4['id']=_0x356f46(0xc2)+_0x1c354d[_0x356f46(0x9b)],_0x325cb4[_0x356f46(0xa3)]=_0x356f46(0x93)+_0x1c354d[_0x356f46(0x9b)]+_0x356f46(0x9d)+(_0x1c354d[_0x356f46(0x83)]?_0x1c354d[_0x356f46(0x89)]||_0x356f46(0x9f):_0x356f46(0x9f))+_0x356f46(0xbc)+(_0x1c354d[_0x356f46(0x83)]||_0x356f46(0xc3))+_0x356f46(0x75)+(_0x1c354d[_0x356f46(0xa0)]||_0x356f46(0x9f))+_0x356f46(0xc6);const _0x148c5d=document['createElement'](_0x356f46(0x81));_0x148c5d[_0x356f46(0xb2)]=_0x356f46(0x94),_0x148c5d[_0x356f46(0xc5)]=()=>openModal(_0x356f46(0x7f),_0x1c354d['parking-number']),_0x148c5d[_0x356f46(0x82)]=!!_0x1c354d['car-number'];const _0x496e66=document['createElement'](_0x356f46(0x81));_0x496e66[_0x356f46(0xb2)]=_0x356f46(0x77),_0x496e66[_0x356f46(0xc5)]=()=>removeCar(_0x1c354d[_0x356f46(0x9b)]),_0x496e66[_0x356f46(0x82)]=!_0x1c354d[_0x356f46(0x83)];const _0x29ff5a=document[_0x356f46(0x90)](_0x356f46(0x81));_0x29ff5a[_0x356f46(0xb2)]=_0x356f46(0xc4),_0x29ff5a[_0x356f46(0xc5)]=()=>changeStatus(_0x1c354d['parking-number']),_0x29ff5a['disabled']=!_0x1c354d[_0x356f46(0x83)],_0x1c354d[_0x356f46(0x83)]?(_0x325cb4['appendChild'](_0x496e66),_0x325cb4[_0x356f46(0xce)](_0x29ff5a)):_0x325cb4[_0x356f46(0xce)](_0x148c5d),_0x589323[_0x356f46(0xce)](_0x325cb4);});}function init(){const _0x24815d=_0x139305,_0xcf360f=firebase['database']()[_0x24815d(0x85)](_0x24815d(0xa1));_0xcf360f[_0x24815d(0x9a)](_0x24815d(0x7b))[_0x24815d(0x9e)](_0x3a662e=>{const _0x5ee714=_0x24815d;_0x3a662e[_0x5ee714(0x74)]()?parkingSlots=_0x3a662e[_0x5ee714(0xb8)]()[_0x5ee714(0xbe)]((_0x1c676c,_0x317beb)=>({'parking-number':(_0x317beb+0x1)['toString'](),..._0x1c676c})):initializeParkingSlots(),renderParkingMap();})[_0x24815d(0xcf)](_0x99c998=>{console['error']('Error\x20loading\x20data:',_0x99c998);}),_0xcf360f['on']('value',_0x193744=>{const _0x5ba8de=_0x24815d;parkingSlots=_0x193744[_0x5ba8de(0xb8)]()||[],renderParkingMap();});}init();
