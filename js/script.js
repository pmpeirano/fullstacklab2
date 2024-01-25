// console.log(users);

// {   LIST ITEM TEMPLATE
//   /* <li class="contact-item cf">
//   <div class="contact-details">
//     <img
//       class="avatar"
//       src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
//     />
//     <h3>aapo niskanen</h3>
//     <span class="email">aapo.niskanen@example.com</span>
//   </div>
//   <div class="joined-details">
//     <span class="date">Joined 06/15/12</span>
//   </div>
// </li>; */
// }

// console.log(users.length);
const softLimit = 22;
const paginationLimit = 10;
const contactList = document.getElementsByClassName("contact-list")[0];
for (let i = 0; i < softLimit; i++) {
  //create an object containing the information obtained from the JSON
  let person = users[i];

  //create a contact list item
  let newListItem = document.createElement("li");
  newListItem.classList.add("contact-item");
  newListItem.classList.add("cf");

  //create the contact-details div
  let contactDetails = document.createElement("div");
  contactDetails.classList.add("contact-details");

  //create all div child elements and append to div

  let contactDetailImg = document.createElement("img");
  contactDetailImg.classList.add("avatar");
  contactDetailImg.src = person.image;

  let contactDetailName = document.createElement("h3");
  contactDetailName.innerText = person.name;

  let contactDetailEmail = document.createElement("span");
  contactDetailEmail.classList.add("email");

  //get name elements
  let nameElements = person.name.split(" ");
  let email = nameElements[0] + "." + nameElements[1] + "@example.com";
  contactDetailEmail.innerText = email;

  contactDetails.appendChild(contactDetailImg);
  contactDetails.appendChild(contactDetailName);
  contactDetails.appendChild(contactDetailEmail);

  //create joined-details div

  let joinedDetails = document.createElement("div");
  joinedDetails.classList.add("joined-details");

  let joinedDetailsDate = document.createElement("span");
  joinedDetailsDate.classList.add("date");
  joinedDetailsDate.innerText = "Joined " + person.joined;

  joinedDetails.appendChild(joinedDetailsDate);

  //append both divs to list item

  newListItem.appendChild(contactDetails);
  newListItem.appendChild(joinedDetails);

  //don't show any list item that exceeds the number of elements that are allowed to be shown at once
  if (i >= paginationLimit) {
    newListItem.classList.add("hidden");
  }
  contactList.appendChild(newListItem);
}

//the following handles the pagination
//get the list of all the list items
const contactListItems = document.getElementsByClassName("contact-item");
const contactListItemsArray = Array.from(contactListItems);
console.log(contactListItemsArray);

//this value is hardcoded to meet the requirements but can be changed to be equal to the number of elements returned by the JSON
const totalElementsGathered = contactListItemsArray.length;

const pagesNeeded = Math.ceil(totalElementsGathered / paginationLimit);
console.log(pagesNeeded);

//get the value of the element to append the pagination links to
const pageDiv = document.getElementsByClassName("page")[0];

//create an unordered list for the pagination links
const paginationList = document.createElement("ul");
paginationList.classList.add("pagination");

//create the number of list items as specified earlier

for (let i = 0; i < pagesNeeded; i++) {
  let paginationListItem = document.createElement("li");
  let paginationListItemLink = document.createElement("a");
  paginationListItemLink.innerText = i + 1;

  //apply onclick listener to paginationListItemLink to display items based on index
  paginationListItemLink.addEventListener("click", function () {
    //can just apply hidden to all items?
    for (let i = 0; i < contactListItemsArray.length; i++) {
      contactListItemsArray[i].classList.add("hidden");
    }

    //use innerText value to figure out which items to show
    // let lowerLimit = (this.innerText - 1) * 10 - 1;
    // if (lowerLimit < 0) {
    //   lowerLimit = 0;
    // }
    // let upperLimit = lowerLimit + 10;

    //first button -> indices 0-9
    //second button -> indices 10 - 19
    //third button -> indices 20 - 29 and so on.....

    let upperLimitAdjustFlag = false;
    let upperLimit = this.innerText * paginationLimit - 1;
    if (upperLimit >= totalElementsGathered) {
      upperLimit = totalElementsGathered;
      upperLimitAdjustFlag = true;
    }

    let lowerLimit = upperLimit - 9;
    if (lowerLimit < 0) {
      lowerLimit = 0;
    } else if (upperLimitAdjustFlag) {
      //cannot just subtract 9 from upper limit - will show previously shown items
      let upperLimitAsString = upperLimit + "";
      let amntToSubtract = parseInt(
        upperLimitAsString.charAt(upperLimitAsString.length - 1)
      );
      lowerLimit = upperLimit - amntToSubtract;
    }

    //check to see if the upperLimit exceeds the total number of items
    if (upperLimit >= contactListItemsArray.length) {
      upperLimit = contactListItemsArray.length - 1;
    }

    //remove the hidden class from all the elements starting from lowerlimit to upperlimit, inclusive
    for (let i = lowerLimit; i <= upperLimit; i++) {
      contactListItemsArray[i].classList.remove("hidden");
    }
  });

  paginationListItem.appendChild(paginationListItemLink);
  paginationList.appendChild(paginationListItem);
}

document.getElementsByTagName("h3")[0].innerText = "Total: " + softLimit;

pageDiv.appendChild(paginationList);
