let username = document.getElementById('username');
let selectList = document.getElementById('search-by');
let gtin = document.querySelector('.gtin');
let brand = document.querySelector('.brand');
let icecat = document.querySelector('.icecat');
let button = document.querySelector('.button');

selectList.addEventListener('change', () => {
    if(button.classList.contains('hidden')) {
        button.classList.remove('hidden')
    }

    switch(selectList.value) {
        case 'brand': 
            setVisible(brand, gtin, icecat);
            break;
        case 'gtin':
            setVisible(gtin, brand, icecat);
            break;
        case 'icecat':
            setVisible(icecat, gtin, brand);
            break;
    }
})

button.addEventListener('click', () => {
    let url = `https://live.icecat.biz/api?username=${username.value}&lang=fr`;
    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    
    var raw = "";

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };


    switch(selectList.value) {
        case 'brand': 
            url += `&Brand=${document.getElementById('brand').value}&ProductCode=${document.getElementById('code').value}`;
            IcecatLive.getDatasheet('#IcecatLive',{
                'UserName': username.value,
                'Brand': document.getElementById('brand').value,
                'ProductCode': document.getElementById('code').value,
            },'fr');   
            break;
        case 'gtin':
            url += `&GTIN=${document.getElementById('gtin').value}`;
            IcecatLive.getDatasheet('#IcecatLive',{
                'UserName': username.value,
                'GTIN': document.getElementById('gtin').value,
            },'fr');   
            break;
        case 'icecat':
            url += `&icecat_id=${document.getElementById('icecat-id').value}`;
            IcecatLive.getDatasheet('#IcecatLive',{
                'UserName': username.value,
                'IcecatProductId': document.getElementById('icecat-id').value,
            },'fr');   
            break;
    }

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
})

function setVisible(visible, ...invisibles) {
    if(visible.classList.contains('hidden')) {
        visible.classList.remove('hidden');
    }

    invisibles.forEach(invisible => {
        if(!invisible.classList.contains('hidden')) {
            invisible.classList.add('hidden');
        }
    })
}

// setTimeout(function(){
//     IcecatLive.getDatasheet('#IcecatLive',{
//         'UserName': 'every-parts',
//         'Brand':'Beko',
//         'ProductCode':'bie26300xp'
//     },'fr');
// }, 200);