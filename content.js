var meetingGuest = document.getElementsByClassName('JAPzS');
console.log(meetingGuest);
for (var i = 0, l = meetingGuest.length; i < l; i++) {
    console.log(meetingGuest[i]);
    meetingGuest[i].innerHTML = "A LOT";
}
