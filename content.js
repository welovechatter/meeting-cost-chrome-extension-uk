window.addEventListener('load', function() {

// observe every change to document.body
const observer = new MutationObserver(() => {
    updateDOM();
  });

// update DOM if the right element is found
function updateDOM() {

  const guestsNumber = document.getElementsByClassName('smD7sb').length;  
  const insertedElement = document.getElementById('meetingcostextension');
  
  // stop the function if the inserted is found or guest element isn't
  if(insertedElement || guestsNumber == 0) {
    return;
  }
    
  // get the element to insert HTML next to
  const guestArea = document.getElementById('xDetDlgAtt').getElementsByClassName('JAPzS');
  
  // // IN PROGRESS
  const meetingTime = document.getElementById('xDetDlgWhen').getElementsByClassName('DN1TJ fX8Pqc CyPPBf');
  console.log(meetingTime[0]);
  // regex on that string  - look for regex.match
  // https://jsfiddle.net/

  // retrieve the hourly rate + insert DOM element
  chrome.storage.local.get(["hourlyRate"], function(obj) {
    let hourlyRate = 100;
    if(obj.hourlyRate) { hourlyRate = obj.hourlyRate; }
    if(document.getElementById('meetingcostextension')) { document.getElementById('meetingcostextension').remove(); }
    guestArea[0].insertAdjacentHTML('beforeend',"<span id='meetingcostextension'> - this meeting will cost $"+hourlyRate*guestsNumber+"</div>");
  });
  
}

const config = {
    childList: true,
    subtree: true,
  };
  observer.observe(document.body, config);
  
}, false);