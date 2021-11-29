window.addEventListener('load', function() {
    
    
    function findNode() {
        var testContentOne = document.getElementsByClassName('CwaK9');

        if(testContentOne != undefined) {
            var testContentTwo = document.getElementsByClassName('RKLVef'); 
            for (var i = 0, l = testContentTwo.length; i < l; i++) {
                console.log(testContentTwo[i]);
                testContentTwo[i].innerHTML = "TEST";
            }
        } else {
            setTimeout(findNode(),1000)
        }
    }

    findNode();

}, false);


// https://www.smashingmagazine.com/2019/04/mutationobserver-api-guide/


// window.addEventListener('load', function() {

// const observer = new MutationObserver(() => {
//     sayHello();
//   });

// function sayHello() {
//     if(document.getElementsByClassName('RveJvd.snByac')) {
//         var testContent = document.getElementsByClassName('EfQccc')
//         testContent[0].insertAdjacentHTML('beforeend',"HELLO");
//         console.log("hello");
//     }
// }

// const config = {
//     childList: true,
//     subtree: true,
//   };
//   observer.observe(document.body, config);
  
// }, false);