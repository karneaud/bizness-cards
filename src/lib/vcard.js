import vCardsJS from 'vcards-js-updated'

//create a new vCard
const vCard = vCardsJS();

//set properties
export default (card) => {
     vCard.firstName = card.firstName;
    vCard.lastName = card.lastName;
    vCard.organization = card.organization;
    //vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
    vCard.workPhone = card.phone;
    vCard.title = card.job;
    vCard.url = card.website;
    return vCard.getFormattedString()
}