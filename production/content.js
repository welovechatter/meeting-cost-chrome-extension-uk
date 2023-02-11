window.addEventListener(
  'load',
  function () {
    // observe every change to document.body
    const observer = new MutationObserver(() => {
      updateDOM();
    });

    // update DOM if the right element is found
    function updateDOM() {
      const guestsNumber = document.getElementsByClassName('smD7sb').length;
      const insertedElement = document.getElementById('meetingcostextension');

      // stop the function if the inserted element already exists OR guest element isn't found
      if (insertedElement || guestsNumber == 0) {
        return;
      }

      // get the length of the meeting
      const meetingTime = document.getElementById('xDetDlgWhen').getElementsByClassName('DN1TJ fX8Pqc CyPPBf');
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
      console.log(meetingLength);
      // retrieve the default/saved hourly rate AND insert DOM element
      chrome.storage.local.get(['hourlyRate'], function (obj) {
        let minuteRate = 1.666666666666667;
        if (obj.hourlyRate) {
          minuteRate = (obj.hourlyRate)/60;
        }
        if (document.getElementById('meetingcostextension')) {
          document.getElementById('meetingcostextension').remove();
        }
        const guestArea = document.getElementsByClassName('agOyMd');
        guestArea[0].insertAdjacentHTML(
          'beforeend',
          `<div id='meetingcostextension' class='DN1TJ fX8Pqc CyPPBf'>Meeting cost: <a style='text-decoration:underline;color:blue;' href='${chrome.runtime.getURL('options.html')}'>$` +
          Math.round(minuteRate * meetingLength * guestsNumber) +
          '</a></div>'
        );
      });
    }

    const config = {
      childList: true,
      subtree: true
    };
    observer.observe(document.body, config);
  },
  false
);
