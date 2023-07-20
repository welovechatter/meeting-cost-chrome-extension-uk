window.addEventListener(
  'load',
  function () {
    // observe every change to document.body
    const observer = new MutationObserver(() => {
      updateDOM();
    });

    // update DOM if the right element is found
    function updateDOM() {
      if(document.getElementById('xDetDlgAtt')) {
      
     // Original Guest Calculation
     // const guestsNumber = document.getElementsByClassName('nBzcnc OjZ2cc mnlZ7 ptjCCb')[0].innerText.match(/^(.*?)guest/)[1];

     // Revised to only count guests from @welovechatter.com
     let guestsNumber = 0;
     const guestsTmp = document.querySelector("div[jsname=MsyPn]");
    
        const regex = /data\-email\=[^\@]+@welovechatter.com/g;
        let guestTmp2 = guestsTmp.innerHTML.match(regex);       
        guestsNumber = (guestTmp2 || []).length;
      

      const insertedElement = document.getElementById('meetingcostextension');
      // stop the function if the inserted element already exists OR guest element isn't found
      if (insertedElement || guestsNumber == 0) {
        return;
      }
      // get the length of the meeting
      const meetingTime = document.getElementById('xDetDlgWhen').getElementsByClassName('AzuXid O2VjS CyPPBf');
      const [
        ,
        firstHours,
        firstMins,
        timezoneOne,
        secondHours,
        secondMins
      ] = meetingTime[0].outerHTML.match(
        /(\d+):(\d+)(am|pm|)\s[–]\s(\d+):(\d+)(am|pm|)/
      );
      let meetingLength;

      // TODO LATER: cover the cases when it starts pm and finish am BUT ALSO when it starts pm and finishes PM but >12 hours later
      if (timezoneOne == '' && firstHours != '12' || (timezoneOne == 'am' && secondHours == '12')) {
        meetingLength = secondHours * 60 + parseInt(secondMins) - firstHours * 60 - parseInt(firstMins);
      } else if (timezoneOne == '' && firstHours == '12') {
        meetingLength = secondHours * 60 + parseInt(secondMins);
      } else if (timezoneOne == 'am' && secondHours != '12') {
        meetingLength = (parseInt(secondHours) + 12 ) * 60 + parseInt(secondMins) - firstHours * 60 - parseInt(firstMins);
      }

      // retrieve the default/saved hourly rate AND insert DOM element
      chrome.storage.local.get(['hourlyRate'], function (obj) {
        let minuteRate = 0.5535;
        if (obj.hourlyRate) {
          minuteRate = (obj.hourlyRate)/60;
        }
        if (document.getElementById('meetingcostextension')) {
          document.getElementById('meetingcostextension').remove();
        }
        const guestArea = document.getElementsByClassName('agOyMd');
        // class='DN1TJ fX8Pqc CyPPBf'
        guestArea[0].insertAdjacentHTML(
          'beforeend',
          `<div id='meetingcostextension' style="margin-top:8px"><strong>Estimated meeting cost:</strong> <span style="color:blue; font-weight: bold;">£` +
          Math.round(minuteRate * meetingLength * guestsNumber) + ` (${guestsNumber} Chatterinos)` +
          '</span></div>'
        )
        console.log(`Meeting lasts ${meetingLength} minutes with ${guestsNumber} Chatterino(s), the hourly rate per Chatterino is £${minuteRate * 60}`);
      })
      }
    }

    const config = {
      childList: true,
      subtree: true
    };
    observer.observe(document.body, config);
  },
  false
);
