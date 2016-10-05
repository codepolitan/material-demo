

var contact = {
    components: ['contact', 'communication', 'address', 'user', 'images' ],
    focus: 'firstname',
    contact: {
        type: 'fieldset',
        text: 'Contact',
        fields: [{
            text: 'Prénom',
            name: 'firstname',
            klss: 'third'
        }, {
            text: 'Nom',
            name: 'lastname',
            klss: 'third'
        }, {
            text: 'Salutation',
            name: 'salutation',
            klss: 'third'
        }]
    },
    more: {
        type: 'fieldset',
        klss: 'inspector-head',
        fields: [{
            text: 'SelectLine ID',
            name: 'contact_id',
            klss: 'third'
        }, {
            text: 'Language',
            name: 'language',
            type: 'choice',
            list: ['F', 'D'],
            klss: 'third'
        }, {
            text: 'Company',
            name: 'company',
            klss: 'third'
        }]
    },
    /*communication: {
        text: 'Communication',
        type: 'fieldset',
        fields: [{
            text: 'Téléphone',
            name: 'phone1',
            klss: 'third'
        }, {
            text: 'Téléphone 2',
            name: 'phone2',
            klss: 'third'
        }, {
            text: 'Mobile',
            name: 'mobile',
            klss: 'third'
        }]
    },*/
    communication: {
        type: 'fieldset',
        text: 'Phone',
        field: {
            _list: ['phone'],
            phone: {
                text: "Phone",
                type: "list",
                name: "phone",
                //read: true,
                opts: {
                    type: "keys",
                    display: ["name", "number"],
                    remove: true,
                }
            }
        }
    },
    address: {
        type: 'fieldset',
        text: 'Address',
        fields: [{
            text: 'Address',
            name: 'place.address',
            klss: 'half'
        }, {
            text: 'Address 2',
            name: 'place.info',
            klss: 'half'
        }, {
            text: 'Lieu',
            name: 'place.name',
            klss: 'third'
        }, {
            text: 'NPA',
            name: 'place.zipcode',
            klss: 'third'
        }, {
            text: 'Pays',
            name: 'place.country',
            klss: 'third'
        }]
    },
    user: {
       type: "fieldset",
       name: "user",
       text: "User",
       fields: [{
            text: "Related",
            type: "unique",
            name: "related.user",
            opts: {
                type: 'user',
                //codeSelectedNode: 'contact:staff',
                keys: {
                    info: ['name'],
                    relation: [],
                    display: ['name', 'email'],
                    role: {
                        read: true,
                    }
                }
            }
       }]
    },
    images: {
        type: 'fieldset',
        text: 'Images',
        fields: [{
            text: 'Images',
            type: 'file',
            name: 'images'
        }]
    },
    comment: {
        type: 'fieldset',
        text: 'comment',
        fields: [{
            text: 'Commentaire',
            name: 'comment',
            type: 'textarea'
        }]
    },
    contacts: {
       type: "fieldset",
       text: "Contacts",
       fields: [{
            text: "Contacts",
            type: "related",
            name: "contacts",
            opts: {
                type: 'contact',
                keys: {
                    info: '*',
                    display: ['name'],
                }
            }
       }]
    }
    /*contacts: {
        type: 'fieldset',
        text: 'Contacts',
        fields: [{
            text: 'Contacts',
            type: 'contacts',
            name: 'contacts'
        }]
    }*/
};

module.exports = contact;
