const maxIMGs = 3;
const boxsArray = document.getElementsByClassName('imgBox');
let currentPic = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min) + min);
}

function replaceUrl(oldUrl, number){
    // Ex.Url : images/XZpic1FD/part_1_XXpic1FL.png
    // Replace pic1 in XZpic1FD && XXpic1FL
    let newUrl = oldUrl.replace(/XZ.*FD/, `XZpic${number}FD`);//folder
    newUrl = newUrl.replace(/XX.*FL/, `XXpic${number}FL`);//file

    return newUrl;
}

//check won
function checkWon(boxsArray, isFirst = false) {
    let dataPicArray = [];
    for (let i = 0; i < boxsArray.length; i++) {
        let btn = boxsArray[i].querySelector('a');
        dataPicArray.push(btn.getAttribute('data-pic'));
    }

    let isWon = dataPicArray.every((val, i, arr) => {
        currentPic = arr[0];
        return val === arr[0];
    });

    if (isWon) {

        if (isFirst) {
            location.reload();
        }else{
            //set green box-shadow
            for (let j = 0; j < boxsArray.length; j++) {
                let img = boxsArray[j].querySelector('img');
                img.style.boxShadow = '0px 0px 15px #60ff00';
            }            

            //change pic Url
            let winUrl = `images/base/pic_${currentPic}.png`;
            let Wrapper = document.getElementById('Wrapper');
            let winShow = document.getElementById('winShow');
            winShow.querySelector('a').href = winShow.querySelector('img').src = winUrl;

            //show/hide
            setTimeout(()=>{
                winShow.classList.remove('hidden');
                Wrapper.classList.add('hidden');
                document.getElementById('gameTitle').classList.add('win');
            },1000);
        }

    }
}

//click Pic here
function changePic(self) {
    number = self.getAttribute('data-pic');

    if(number++ >= maxIMGs){
        number = 1;
    }

    self.setAttribute('data-pic', number);

    checkWon(boxsArray, false);

    for (let i = 0; i < boxsArray.length; i++) {
        let btn = boxsArray[i].querySelector('a');
        if(parseInt(btn.getAttribute('data-pic')) == number){
            let img = boxsArray[i].querySelector('img');
            let imgSrcUrl = String(img.src);
            let newUrl = replaceUrl(imgSrcUrl, number);
            img.setAttribute('src', newUrl);
        }
    }
}

function init() {
    //set random number for data-pic && img:src
    for (let i = 0; i < boxsArray.length; i++) {
        let btn = boxsArray[i].querySelector('a');
        let img = boxsArray[i].querySelector('img');
        let imgSrcUrl = String(img.src);
        let random =  getRandomInt(1, maxIMGs);
        let newUrl = replaceUrl(imgSrcUrl, random);

        btn.setAttribute('data-pic', random);
        img.setAttribute('src', newUrl);
    }
    
    //check first time
    checkWon(boxsArray, true);
}
init();

