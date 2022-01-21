

class Contact {
    constructor( id, name, address, email ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
    }

    addContact( contact ) {
        this.contact.push( contact );
    }

    deleteContact( contact ) {
        let index = this.contacts.indexOf( contact );
        this.contacts.splice( index, 1 );
    }
}

let contacts = [];
let contactId = 0;

onClick( "new-contact", () => {
    contacts.push( new Contact( contactId++, getValue( "new-contact-name" ), getValue( "new-contact-address" ), getValue( "new-contact-email" ) ) );
    drawDOM();
} );

function onClick( id, action ) {
    let element = document.getElementById( id );
    element.addEventListener( "click", action );
    return element;
}

function getValue( id ) {
    return document.getElementById( id ).value;
}

function clearElement( element ) {
    while( element.firstChild ){
        element.removeChild( element.firstChild );
    }
}

function drawDOM(){
    let contactDiv= document.getElementById( "contacts" );
    clearElement( contactDiv );
    for( const contact of contacts ) {
        let table = createContactTable( contact );
        let title = document.createElement( "h2" );
        title.innerHTML = "List of contacts";
        contactDiv.appendChild( title );
        contactDiv.appendChild( table );

        for( const contact of contacts ) {
            createContactRow( contact, table );
        }

    }
}

function createDeleteRowButton( contact ) {
    let btn = document.createElement( "button" );
    btn.className = "btn btn-primary";
    btn.innerHTML = "Delete Row";

    btn.onclick = () => {
        let index = contacts.indexOf( contact );
        contacts.splice( index, 1 );
        //drawDOM();
    }
    return btn;
}

function createNeweContactButton( contact ) {
    let btn = document.createElement( "button" );
    btn.className = "btn btn-primary";
    btn.innerHTML = "Create";
    btn.onClick = () => {
        contacts.push( new Contact( getValue( `name-input- ${contact.id}`, getValue( `address-input- ${contact.id}`, getValue( `email-input- ${contact.id}`) ) ) ) );
        //drawDOM();
    };
    return btn;
}

function createContactRow( contact, table ) {
    let row = table.insertRow( 2 );
    row.insertCell( 0 ).innerHTML = contact.name;
    row.insertCell( 1 ).innerHTML = contact.address;
    row.insertCell( 2 ).innerHTML = contact.email;

    let actions = row.insertCell( 3 );
    actions.appendChild( createDeleteRowButton( contact ) );
} 

function createContactTable( contact ) {
    let table = document.createElement( "table" );
    table.setAttribute( "class", "table table-dark" );
    let row = table.insertRow( 0 );
    let nameColumn = document.createElement( "th" );
    let addressColumn = document.createElement( "th" );
    let emailColumn = document.createElement( "th" );
    let deleteColumn = document.createElement( "th" );
    nameColumn.innerHTML = "Name";
    addressColumn.innerHTML = "Address";
    emailColumn.innerHTML = "Email";
    deleteColumn.innerHTML = "Delete row";
    row.appendChild( nameColumn );
    row.appendChild( addressColumn );
    row.appendChild( emailColumn );
    row.appendChild( deleteColumn );
    let formRow = table.insertRow( 1 );
    let nameTh = document.createElement( "th" );
    let addressTh = document.createElement( "th" );
    let emailTh = document.createElement( "th" );
    let createTh = document.createElement( "th" );
    let deleteTh = document.createElement( "th" );
    
    formRow.appendChild( nameTh );
    formRow.appendChild( addressTh );
    formRow.appendChild( emailTh );
    formRow.appendChild( deleteTh );
    return table;
}