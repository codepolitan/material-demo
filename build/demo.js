(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// import Container from 'material/lib/container';


// demo


var _emitter = require('material/lib/module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _component = require('material/lib/component');

var _component2 = _interopRequireDefault(_component);

var _item = require('material/lib/list/item');

var _item2 = _interopRequireDefault(_item);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _layout = require('material/lib/layout');

var _layout2 = _interopRequireDefault(_layout);

var _view = require('material/lib/view');

var _view2 = _interopRequireDefault(_view);

var _button = require('material/lib/control/button');

var _button2 = _interopRequireDefault(_button);

var _typography = require('./view/typography');

var _typography2 = _interopRequireDefault(_typography);

var _button3 = require('./view/button');

var _button4 = _interopRequireDefault(_button3);

var _button5 = require('./view/button2');

var _button6 = _interopRequireDefault(_button5);

var _checkbox = require('./view/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _switch = require('./view/switch');

var _switch2 = _interopRequireDefault(_switch);

var _field = require('./view/field');

var _field2 = _interopRequireDefault(_field);

var _slider = require('./view/slider');

var _slider2 = _interopRequireDefault(_slider);

var _list = require('./view/list');

var _list2 = _interopRequireDefault(_list);

var _form = require('./view/form');

var _form2 = _interopRequireDefault(_form);

var _tree = require('./view/tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var demos = {
  typography: _typography2.default,
  button: _button4.default,
  button2: _button6.default,
  checkbox: _checkbox2.default,
  switch: _switch2.default,
  field: _field2.default,
  slider: _slider2.default,
  list: _list2.default,
  form: _form2.default,
  tree: _tree2.default
};

/**
 * @class
 */

var Demo = function () {

  /**
   * @constructor
   * @param  {Object} options - The application options
   * @return {Object} this
   */

  function Demo(options) {
    _classCallCheck(this, Demo);

    this.options = [_options2.default, options].reduce(Object.assign, {});

    //console.log('ready', document.body);
    this.init(options);

    // this.initDemo(this.layout.component.main);
    // this.controller = new Controller();
  }

  _createClass(Demo, [{
    key: 'init',
    value: function init(options) {
      this.initLayout();
      this.initNaviView();
    }
  }, {
    key: 'initDemo',
    value: function initDemo(body) {

      demos.button(body);
    }
  }, {
    key: 'initLayout',
    value: function initLayout() {
      this.options.layout.element = document.body;
      this.layout = new _layout2.default(this.options.layout);

      console.log('layout', this.layout);
    }

    /**
     * [initNaviView description]
     * @return {Object} this - This class instance
     */

  }, {
    key: 'initNaviView',
    value: function initNaviView() {
      var navi = this.layout.component.navi;

      this.layout.component.mainmenu.on('press', function (e) {
        navi.toggle(e);
      });

      this.initNaviList();
    }

    /**
     * Init Navigation view
     * @return {Object} this - This class instance
     */

  }, {
    key: 'initNaviList',
    value: function initNaviList() {
      var _this = this;

      var listView = this.layout.component.navi;

      console.log('list object', listView);
      var object = {
        render: function render(info) {
          //console.log('render', info);
          var item;

          if (info.type === 'separator') {
            item = new _component2.default({
              class: 'ui-separator'
            });
          } else {
            var item = new _item2.default({
              name: info.name,
              text: info.name
            });
          }

          return item;
        },
        select: function select(item, ev) {
          console.log('select', item);
          var name = item.innerText.toLowerCase();
          _this.updateDemoView(name);
        }
      };

      Object.assign(listView, object);

      listView.set('list', this.options.components);

      return this;
    }

    /**
     * [initMapView description]
     * @return {instance} Map view instance
     */

  }, {
    key: 'initMapView',
    value: function initMapView() {
      var mapView = new Map({
        component: ['head', 'body'],
        container: this.layout.main.c.body
      });

      return mapView;
    }
  }, {
    key: 'updateDemoView',
    value: function updateDemoView(name) {
      //console.log('updateDemoView', name);
      this.layout.component.main.empty();

      if (demos[name]) {
        demos[name](this.layout.component.main);
      } else {
        console.info('demo view ' + name + ' not found!');
      }
    }
  }]);

  return Demo;
}();

module.exports = Demo;

},{"./options":5,"./view/button":6,"./view/button2":7,"./view/checkbox":8,"./view/field":9,"./view/form":10,"./view/list":11,"./view/slider":12,"./view/switch":13,"./view/tree":14,"./view/typography":15,"material/lib/component":18,"material/lib/control/button":33,"material/lib/layout":35,"material/lib/list/item":39,"material/lib/module/emitter":47,"material/lib/view":51}],2:[function(require,module,exports){
module.exports={
  "_id": "7783922916e5e1540ca94044ad0270cf",
  "_rev": "4-41a5eb67fb2b27d0fb32e9c701e53456",
  "created_date": "2014-05-11T13:26:27.606Z",
  "created_by": "jvial",
  "modified_date": "2014-05-11T13:26:38.245Z",
  "modified_by": "jvial",
  "type": "contact",
  "firstname": "Jerome",
  "lastname": "Vial",
  "salutation": "Monsieur",
  "email": "jerome@floor.ch",
  "name": "Vial Jerome",
  "place": {
    "address": "Cardinal Mermillod 9",
    "zipcode": "1700",
    "name": "Fribourg",
    "coord": {
      "lat": "3.13",
      "long": "4.22"
    }
  },
  "nodes": [
    "42d8640238b75593557e148f7845ec80"
  ],
  "language": "F",
  "kind": "individual",
  "active": true,
  "vip": 1
}

},{}],3:[function(require,module,exports){
module.exports=[{
  "name": "Afghanistan",
  "code": "AF"
}, {
  "name": "Åland Islands",
  "code": "AX"
}, {
  "name": "Albania",
  "code": "AL"
}, {
  "name": "Algeria",
  "code": "DZ"
}, {
  "name": "American Samoa",
  "code": "AS"
}, {
  "name": "AndorrA",
  "code": "AD"
}, {
  "name": "Angola",
  "code": "AO"
}, {
  "name": "Anguilla",
  "code": "AI"
}, {
  "name": "Antarctica",
  "code": "AQ"
}, {
  "name": "Antigua and Barbuda",
  "code": "AG"
}, {
  "name": "Argentina",
  "code": "AR"
}, {
  "name": "Armenia",
  "code": "AM"
}, {
  "name": "Aruba",
  "code": "AW"
}, {
  "name": "Australia",
  "code": "AU"
}, {
  "name": "Austria",
  "code": "AT"
}, {
  "name": "Azerbaijan",
  "code": "AZ"
}, {
  "name": "Bahamas",
  "code": "BS"
}, {
  "name": "Bahrain",
  "code": "BH"
}, {
  "name": "Bangladesh",
  "code": "BD"
}, {
  "name": "Barbados",
  "code": "BB"
}, {
  "name": "Belarus",
  "code": "BY"
}, {
  "name": "Belgium",
  "code": "BE"
}, {
  "name": "Belize",
  "code": "BZ"
}, {
  "name": "Benin",
  "code": "BJ"
}, {
  "name": "Bermuda",
  "code": "BM"
}, {
  "name": "Bhutan",
  "code": "BT"
}, {
  "name": "Bolivia",
  "code": "BO"
}, {
  "name": "Bosnia and Herzegovina",
  "code": "BA"
}, {
  "name": "Botswana",
  "code": "BW"
}, {
  "name": "Bouvet Island",
  "code": "BV"
}, {
  "name": "Brazil",
  "code": "BR"
}, {
  "name": "British Indian Ocean Territory",
  "code": "IO"
}, {
  "name": "Brunei Darussalam",
  "code": "BN"
}, {
  "name": "Bulgaria",
  "code": "BG"
}, {
  "name": "Burkina Faso",
  "code": "BF"
}, {
  "name": "Burundi",
  "code": "BI"
}, {
  "name": "Cambodia",
  "code": "KH"
}, {
  "name": "Cameroon",
  "code": "CM"
}, {
  "name": "Canada",
  "code": "CA"
}, {
  "name": "Cape Verde",
  "code": "CV"
}, {
  "name": "Cayman Islands",
  "code": "KY"
}, {
  "name": "Central African Republic",
  "code": "CF"
}, {
  "name": "Chad",
  "code": "TD"
}, {
  "name": "Chile",
  "code": "CL"
}, {
  "name": "China",
  "code": "CN"
}, {
  "name": "Christmas Island",
  "code": "CX"
}, {
  "name": "Cocos (Keeling) Islands",
  "code": "CC"
}, {
  "name": "Colombia",
  "code": "CO"
}, {
  "name": "Comoros",
  "code": "KM"
}, {
  "name": "Congo",
  "code": "CG"
}, {
  "name": "Congo, The Democratic Republic of the",
  "code": "CD"
}, {
  "name": "Cook Islands",
  "code": "CK"
}, {
  "name": "Costa Rica",
  "code": "CR"
}, {
  "name": "Cote D\"Ivoire",
  "code": "CI"
}, {
  "name": "Croatia",
  "code": "HR"
}, {
  "name": "Cuba",
  "code": "CU"
}, {
  "name": "Cyprus",
  "code": "CY"
}, {
  "name": "Czech Republic",
  "code": "CZ"
}, {
  "name": "Denmark",
  "code": "DK"
}, {
  "name": "Djibouti",
  "code": "DJ"
}, {
  "name": "Dominica",
  "code": "DM"
}, {
  "name": "Dominican Republic",
  "code": "DO"
}, {
  "name": "Ecuador",
  "code": "EC"
}, {
  "name": "Egypt",
  "code": "EG"
}, {
  "name": "El Salvador",
  "code": "SV"
}, {
  "name": "Equatorial Guinea",
  "code": "GQ"
}, {
  "name": "Eritrea",
  "code": "ER"
}, {
  "name": "Estonia",
  "code": "EE"
}, {
  "name": "Ethiopia",
  "code": "ET"
}, {
  "name": "Falkland Islands (Malvinas)",
  "code": "FK"
}, {
  "name": "Faroe Islands",
  "code": "FO"
}, {
  "name": "Fiji",
  "code": "FJ"
}, {
  "name": "Finland",
  "code": "FI"
}, {
  "name": "France",
  "code": "FR"
}, {
  "name": "French Guiana",
  "code": "GF"
}, {
  "name": "French Polynesia",
  "code": "PF"
}, {
  "name": "French Southern Territories",
  "code": "TF"
}, {
  "name": "Gabon",
  "code": "GA"
}, {
  "name": "Gambia",
  "code": "GM"
}, {
  "name": "Georgia",
  "code": "GE"
}, {
  "name": "Germany",
  "code": "DE"
}, {
  "name": "Ghana",
  "code": "GH"
}, {
  "name": "Gibraltar",
  "code": "GI"
}, {
  "name": "Greece",
  "code": "GR"
}, {
  "name": "Greenland",
  "code": "GL"
}, {
  "name": "Grenada",
  "code": "GD"
}, {
  "name": "Guadeloupe",
  "code": "GP"
}, {
  "name": "Guam",
  "code": "GU"
}, {
  "name": "Guatemala",
  "code": "GT"
}, {
  "name": "Guernsey",
  "code": "GG"
}, {
  "name": "Guinea",
  "code": "GN"
}, {
  "name": "Guinea-Bissau",
  "code": "GW"
}, {
  "name": "Guyana",
  "code": "GY"
}, {
  "name": "Haiti",
  "code": "HT"
}, {
  "name": "Heard Island and Mcdonald Islands",
  "code": "HM"
}, {
  "name": "Holy See (Vatican City State)",
  "code": "VA"
}, {
  "name": "Honduras",
  "code": "HN"
}, {
  "name": "Hong Kong",
  "code": "HK"
}, {
  "name": "Hungary",
  "code": "HU"
}, {
  "name": "Iceland",
  "code": "IS"
}, {
  "name": "India",
  "code": "IN"
}, {
  "name": "Indonesia",
  "code": "ID"
}, {
  "name": "Iran, Islamic Republic Of",
  "code": "IR"
}, {
  "name": "Iraq",
  "code": "IQ"
}, {
  "name": "Ireland",
  "code": "IE"
}, {
  "name": "Isle of Man",
  "code": "IM"
}, {
  "name": "Israel",
  "code": "IL"
}, {
  "name": "Italy",
  "code": "IT"
}, {
  "name": "Jamaica",
  "code": "JM"
}, {
  "name": "Japan",
  "code": "JP"
}, {
  "name": "Jersey",
  "code": "JE"
}, {
  "name": "Jordan",
  "code": "JO"
}, {
  "name": "Kazakhstan",
  "code": "KZ"
}, {
  "name": "Kenya",
  "code": "KE"
}, {
  "name": "Kiribati",
  "code": "KI"
}, {
  "name": "Korea, Democratic People\"S Republic of",
  "code": "KP"
}, {
  "name": "Korea, Republic of",
  "code": "KR"
}, {
  "name": "Kuwait",
  "code": "KW"
}, {
  "name": "Kyrgyzstan",
  "code": "KG"
}, {
  "name": "Lao People\"S Democratic Republic",
  "code": "LA"
}, {
  "name": "Latvia",
  "code": "LV"
}, {
  "name": "Lebanon",
  "code": "LB"
}, {
  "name": "Lesotho",
  "code": "LS"
}, {
  "name": "Liberia",
  "code": "LR"
}, {
  "name": "Libyan Arab Jamahiriya",
  "code": "LY"
}, {
  "name": "Liechtenstein",
  "code": "LI"
}, {
  "name": "Lithuania",
  "code": "LT"
}, {
  "name": "Luxembourg",
  "code": "LU"
}, {
  "name": "Macao",
  "code": "MO"
}, {
  "name": "Macedonia, The Former Yugoslav Republic of",
  "code": "MK"
}, {
  "name": "Madagascar",
  "code": "MG"
}, {
  "name": "Malawi",
  "code": "MW"
}, {
  "name": "Malaysia",
  "code": "MY"
}, {
  "name": "Maldives",
  "code": "MV"
}, {
  "name": "Mali",
  "code": "ML"
}, {
  "name": "Malta",
  "code": "MT"
}, {
  "name": "Marshall Islands",
  "code": "MH"
}, {
  "name": "Martinique",
  "code": "MQ"
}, {
  "name": "Mauritania",
  "code": "MR"
}, {
  "name": "Mauritius",
  "code": "MU"
}, {
  "name": "Mayotte",
  "code": "YT"
}, {
  "name": "Mexico",
  "code": "MX"
}, {
  "name": "Micronesia, Federated States of",
  "code": "FM"
}, {
  "name": "Moldova, Republic of",
  "code": "MD"
}, {
  "name": "Monaco",
  "code": "MC"
}, {
  "name": "Mongolia",
  "code": "MN"
}, {
  "name": "Montserrat",
  "code": "MS"
}, {
  "name": "Morocco",
  "code": "MA"
}, {
  "name": "Mozambique",
  "code": "MZ"
}, {
  "name": "Myanmar",
  "code": "MM"
}, {
  "name": "Namibia",
  "code": "NA"
}, {
  "name": "Nauru",
  "code": "NR"
}, {
  "name": "Nepal",
  "code": "NP"
}, {
  "name": "Netherlands",
  "code": "NL"
}, {
  "name": "Netherlands Antilles",
  "code": "AN"
}, {
  "name": "New Caledonia",
  "code": "NC"
}, {
  "name": "New Zealand",
  "code": "NZ"
}, {
  "name": "Nicaragua",
  "code": "NI"
}, {
  "name": "Niger",
  "code": "NE"
}, {
  "name": "Nigeria",
  "code": "NG"
}, {
  "name": "Niue",
  "code": "NU"
}, {
  "name": "Norfolk Island",
  "code": "NF"
}, {
  "name": "Northern Mariana Islands",
  "code": "MP"
}, {
  "name": "Norway",
  "code": "NO"
}, {
  "name": "Oman",
  "code": "OM"
}, {
  "name": "Pakistan",
  "code": "PK"
}, {
  "name": "Palau",
  "code": "PW"
}, {
  "name": "Palestinian Territory, Occupied",
  "code": "PS"
}, {
  "name": "Panama",
  "code": "PA"
}, {
  "name": "Papua New Guinea",
  "code": "PG"
}, {
  "name": "Paraguay",
  "code": "PY"
}, {
  "name": "Peru",
  "code": "PE"
}, {
  "name": "Philippines",
  "code": "PH"
}, {
  "name": "Pitcairn",
  "code": "PN"
}, {
  "name": "Poland",
  "code": "PL"
}, {
  "name": "Portugal",
  "code": "PT"
}, {
  "name": "Puerto Rico",
  "code": "PR"
}, {
  "name": "Qatar",
  "code": "QA"
}, {
  "name": "Reunion",
  "code": "RE"
}, {
  "name": "Romania",
  "code": "RO"
}, {
  "name": "Russian Federation",
  "code": "RU"
}, {
  "name": "RWANDA",
  "code": "RW"
}, {
  "name": "Saint Helena",
  "code": "SH"
}, {
  "name": "Saint Kitts and Nevis",
  "code": "KN"
}, {
  "name": "Saint Lucia",
  "code": "LC"
}, {
  "name": "Saint Pierre and Miquelon",
  "code": "PM"
}, {
  "name": "Saint Vincent and the Grenadines",
  "code": "VC"
}, {
  "name": "Samoa",
  "code": "WS"
}, {
  "name": "San Marino",
  "code": "SM"
}, {
  "name": "Sao Tome and Principe",
  "code": "ST"
}, {
  "name": "Saudi Arabia",
  "code": "SA"
}, {
  "name": "Senegal",
  "code": "SN"
}, {
  "name": "Serbia and Montenegro",
  "code": "CS"
}, {
  "name": "Seychelles",
  "code": "SC"
}, {
  "name": "Sierra Leone",
  "code": "SL"
}, {
  "name": "Singapore",
  "code": "SG"
}, {
  "name": "Slovakia",
  "code": "SK"
}, {
  "name": "Slovenia",
  "code": "SI"
}, {
  "name": "Solomon Islands",
  "code": "SB"
}, {
  "name": "Somalia",
  "code": "SO"
}, {
  "name": "South Africa",
  "code": "ZA"
}, {
  "name": "South Georgia and the South Sandwich Islands",
  "code": "GS"
}, {
  "name": "Spain",
  "code": "ES"
}, {
  "name": "Sri Lanka",
  "code": "LK"
}, {
  "name": "Sudan",
  "code": "SD"
}, {
  "name": "Suriname",
  "code": "SR"
}, {
  "name": "Svalbard and Jan Mayen",
  "code": "SJ"
}, {
  "name": "Swaziland",
  "code": "SZ"
}, {
  "name": "Sweden",
  "code": "SE"
}, {
  "name": "Switzerland",
  "code": "CH"
}, {
  "name": "Syrian Arab Republic",
  "code": "SY"
}, {
  "name": "Taiwan, Province of China",
  "code": "TW"
}, {
  "name": "Tajikistan",
  "code": "TJ"
}, {
  "name": "Tanzania, United Republic of",
  "code": "TZ"
}, {
  "name": "Thailand",
  "code": "TH"
}, {
  "name": "Timor-Leste",
  "code": "TL"
}, {
  "name": "Togo",
  "code": "TG"
}, {
  "name": "Tokelau",
  "code": "TK"
}, {
  "name": "Tonga",
  "code": "TO"
}, {
  "name": "Trinidad and Tobago",
  "code": "TT"
}, {
  "name": "Tunisia",
  "code": "TN"
}, {
  "name": "Turkey",
  "code": "TR"
}, {
  "name": "Turkmenistan",
  "code": "TM"
}, {
  "name": "Turks and Caicos Islands",
  "code": "TC"
}, {
  "name": "Tuvalu",
  "code": "TV"
}, {
  "name": "Uganda",
  "code": "UG"
}, {
  "name": "Ukraine",
  "code": "UA"
}, {
  "name": "United Arab Emirates",
  "code": "AE"
}, {
  "name": "United Kingdom",
  "code": "GB"
}, {
  "name": "United States",
  "code": "US"
}, {
  "name": "United States Minor Outlying Islands",
  "code": "UM"
}, {
  "name": "Uruguay",
  "code": "UY"
}, {
  "name": "Uzbekistan",
  "code": "UZ"
}, {
  "name": "Vanuatu",
  "code": "VU"
}, {
  "name": "Venezuela",
  "code": "VE"
}, {
  "name": "Viet Nam",
  "code": "VN"
}, {
  "name": "Virgin Islands, British",
  "code": "VG"
}, {
  "name": "Virgin Islands, U.S.",
  "code": "VI"
}, {
  "name": "Wallis and Futuna",
  "code": "WF"
}, {
  "name": "Western Sahara",
  "code": "EH"
}, {
  "name": "Yemen",
  "code": "YE"
}, {
  "name": "Zambia",
  "code": "ZM"
}, {
  "name": "Zimbabwe",
  "code": "ZW"
}]

},{}],4:[function(require,module,exports){
'use strict';

var domready = require('material/lib/module/domready');
var Demo = require('./app.js');

domready(function () {
	console.log('start demo');
	new Demo();
});

},{"./app.js":1,"material/lib/module/domready":45}],5:[function(require,module,exports){
'use strict';

var _component = require('material/src/component');

var _component2 = _interopRequireDefault(_component);

var _button = require('material/src/control/button');

var _button2 = _interopRequireDefault(_button);

var _list = require('material/src/list');

var _list2 = _interopRequireDefault(_list);

var _text = require('material/src/text');

var _text2 = _interopRequireDefault(_text);

var _switch = require('material/src/control/switch');

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// defaults options

/**
 * Element options
 * @type {Object} The Element default options
 */
var options = {
  layout: {
    component: _component2.default,
    name: 'demo',
    display: 'flex',
    direction: 'vertical',
    components: [{
      name: 'head',
      display: 'flex',

      components: [{
        flex: 1,
        display: 'flex',
        direction: 'horizontal',
        name: 'toolbar',
        component: _component2.default,
        options: {
          class: 'material-toolbar'
        },
        components: [{
          name: 'mainmenu',
          component: _button2.default,
          options: {
            icon: 'mdi-navigation-menu',
            type: 'action',
            label: null
          }
        }, {
          name: 'apptitle',
          component: _text2.default,
          text: 'Material Components'

        }]
      }, {
        name: 'desk',
        component: _component2.default,
        options: {
          class: 'material-toolbar'
        },
        components: [{
          name: 'apps',
          component: _button2.default,
          options: {
            icon: 'mdi-navigation-apps',
            type: 'action',
            label: null
          }
        }, {
          name: 'account',
          component: _button2.default,
          options: {
            icon: 'mdi-action-account',
            type: 'action',
            label: null
          }
        }]
      }]
    }, {
      name: 'body',
      display: 'flex',
      direction: 'horizontal',
      flex: '1',
      components: [{
        name: 'navi',
        component: _list2.default,
        size: 320
      }, {
        component: _component2.default,
        name: 'main',
        flex: '1'
      }, {
        component: _component2.default,
        name: 'side',
        //flex: '1',
        size: 320
      }]
    }]
  },
  components: [{ name: 'Typography', icon: 'mdi-content-inbox' }, { type: 'separator' }, { name: 'Button', icon: 'mdi-content-inbox' }, { name: 'Button2', icon: 'mdi-content-inbox' }, { name: 'Checkbox', icon: 'mdi-action-done' }, { name: 'Switch', icon: 'mdi-action-done' }, { name: 'Field', icon: 'mdi-action-query-builder' }, { name: 'Slider', icon: 'mdi-action-query-builder' }, { name: 'Menu', icon: 'mdi-action-query-builder' }, { type: 'separator' }, { name: 'List', icon: 'mdi-action-query-builder' }, { name: 'Form', icon: 'mdi-action-query-builder' }]
};

module.exports = options;

},{"material/src/component":55,"material/src/control/button":70,"material/src/control/switch":74,"material/src/list":84,"material/src/text":97}],6:[function(require,module,exports){
'use strict';

// controls

var _layout = require('material/src/layout.js');

var _layout2 = _interopRequireDefault(_layout);

var _container = require('material/src/container.js');

var _container2 = _interopRequireDefault(_container);

var _Component = require('material/src/Component.js');

var _Component2 = _interopRequireDefault(_Component);

var _text = require('material/src/text.js');

var _text2 = _interopRequireDefault(_text);

var _button = require('material/src/control/button.js');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Field from 'material/src/control/textfield';
// import Switch from 'material/src/control/switch.js';
// import Checkbox from 'material/src/control/checkbox.js';
// import Slider from 'material/src/control/slider.js';

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {

  console.log('container', body);

  var layout = new _layout2.default({
    name: 'demo-button',
    components: [{
      component: _container2.default,
      name: 'buttons',
      components: [{
        component: _text2.default,
        type: 'title',
        text: 'Button'
      }, {
        name: 'buttons-container',
        component: _container2.default,
        components: [{
          name: 'click',
          component: _button2.default,
          type: 'title',
          text: 'Default'
        }, {
          component: _button2.default,
          text: 'Raised',
          options: {
            type: 'raised'
          }
        }, {
          component: _button2.default,
          text: 'Dense Default'
        }]
      }]
    }, {
      component: _container2.default,
      name: 'buttons',
      components: [{
        component: _text2.default,
        type: 'title',
        text: 'Button'
      }, {
        name: 'buttons-container',
        component: _container2.default,
        components: [{
          component: _button2.default,
          type: 'title',
          text: 'Default'
        }, {
          component: _button2.default,
          text: 'Raised',
          options: {
            type: 'raised'
          }
        }, {
          component: _button2.default,
          text: 'Dense Default'
        }]
      }]
    }]
  }).insert(body);

  layout.component.click.on('press', function () {
    console.log('switch state', alert('hello'));
  });

  // var button1 = new Button({
  //   name: 'hello',
  //   //type: 'action',
  //   label: 'Flat'
  // }).insert(body);

  // console.log('button1', button1);

  // new Button({
  //   label: 'Raised',
  //   type: 'raised',
  //   primary: true
  // }).on('press', function(e) {
  //   console.log('press', e);
  //   // fieldIdx++;
  //   // new Field({
  //   //   label: 'field' + fieldIdx,
  //   //   name: 'field'
  //   // }).insert(body);

  // }).insert(body);

  // new Button({
  //   icon: 'mdi-content-inbox',
  //   label: 'Inbox',
  //   css: 'icon-text'
  // }).insert(body);

  // console.log('---', button1);

  // new Button({
  //   icon: 'mdi-content-send',
  //   type: 'action'
  // }).insert(body);
};

},{"material/src/Component.js":54,"material/src/container.js":66,"material/src/control/button.js":70,"material/src/layout.js":80,"material/src/text.js":97}],7:[function(require,module,exports){
'use strict';

// controls

var _button = require('material/src/control/button2.js');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {

  new _button2.default({
    //type: 'action',
    label: 'Button 2'
  }).insert(body);
};

},{"material/src/control/button2.js":71}],8:[function(require,module,exports){
'use strict';

var _component = require('material/src/component.js');

var _component2 = _interopRequireDefault(_component);

var _container = require('material/src/container.js');

var _container2 = _interopRequireDefault(_container);

var _checkbox = require('material/src/control/checkbox.js');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _button = require('material/src/control/button.js');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */

// controls
module.exports = function (body) {

  var container = new _container2.default().insert(body);

  new _component2.default({
    class: 'ui-separator'
  }).insert(body);

  var checkbox = new _checkbox2.default({
    label: 'Checkbox'
  }).on('change', function (value) {
    console.log('checked', value);
  }).insert(container);

  new _checkbox2.default({
    label: 'Checkbox checked',
    value: true
  }).on('change', function (value) {
    console.log('checked', value);
  }).insert(container);

  new _checkbox2.default({
    label: 'Checkbox disabled',
    disabled: true
  }).on('change', function (value) {
    console.log('checked', value);
  }).insert(container);

  new _button2.default({
    primary: true,
    type: 'raised',
    label: 'Toggle'
  }).on('press', function () {
    console.log('switch state', checkbox.toggle());
  }).insert(container);
};

},{"material/src/component.js":55,"material/src/container.js":66,"material/src/control/button.js":70,"material/src/control/checkbox.js":72}],9:[function(require,module,exports){
'use strict';

var _layout = require('material/src/layout.js');

var _layout2 = _interopRequireDefault(_layout);

var _component = require('material/src/component.js');

var _component2 = _interopRequireDefault(_component);

var _container = require('material/src/container.js');

var _container2 = _interopRequireDefault(_container);

var _textfield = require('material/src/control/textfield.js');

var _textfield2 = _interopRequireDefault(_textfield);

var _text = require('material/src/text.js');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */

// controls
module.exports = function (body) {
  new _layout2.default({
    container: body,
    component: _container2.default,
    display: 'flex',
    direction: 'vertical',
    components: [{
      name: 'header',
      direction: 'vertical',
      components: [{
        type: 'headline',
        component: _text2.default,
        text: 'Text fields'
      }]
    }, {
      component: _container2.default,
      name: 'TextFields',
      direction: 'vertical',
      components: [{
        name: 'title',
        component: _textfield2.default,
        text: 'Adresse'
      }, {
        text: 'Address',
        name: 'place.address',
        component: _textfield2.default
      }, {
        text: 'Address 2',
        name: 'place.info',
        component: _textfield2.default
      }]
    }]
  });
};

},{"material/src/component.js":55,"material/src/container.js":66,"material/src/control/textfield.js":75,"material/src/layout.js":80,"material/src/text.js":97}],10:[function(require,module,exports){
'use strict';

// controls

var _component = require('material/src/component.js');

var _component2 = _interopRequireDefault(_component);

var _form = require('material/src/form.js');

var _form2 = _interopRequireDefault(_form);

var _button = require('material/src/control/button.js');

var _button2 = _interopRequireDefault(_button);

var _contact = require('../data/contact.json');

var _contact2 = _interopRequireDefault(_contact);

var _textfield = require('material/src/control/textfield');

var _textfield2 = _interopRequireDefault(_textfield);

var _switch = require('material/src/control/switch.js');

var _switch2 = _interopRequireDefault(_switch);

var _checkbox = require('material/src/control/checkbox.js');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _slider = require('material/src/control/slider.js');

var _slider2 = _interopRequireDefault(_slider);

var _text = require('material/src/text.js');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */

// import schema from '../data/schema.json';
module.exports = function (body) {

  var form1 = new _form2.default({
    layout: {
      component: _component2.default,
      display: 'flex',
      direction: 'vertical',
      components: [{
        name: 'main',
        flex: 1,
        component: _component2.default,
        components: [{
          name: 'contact',
          direction: 'vertical',

          components: [{
            type: 'display1',
            component: _text2.default,
            text: 'Form Component'
          }, {
            type: 'subheading1',
            component: _text2.default,
            text: 'Text fields allow users to input text, select text, and lookup data via auto-completion.'
          }, {
            type: 'headline',
            component: _text2.default,
            text: 'Contact'
          }, {
            //name: 'fieldset',
            display: 'flex',
            direction: 'horizontal',
            components: [{
              flex: 1,
              name: 'firstname',
              component: _textfield2.default,
              text: 'Prénom'
            }, {
              flex: 1,
              name: 'lastname',
              component: _textfield2.default,
              options: {
                text: 'Nom'
              }
            }]
          }]
        }, {
          name: 'address',
          direction: 'vertical',
          components: [{
            type: 'headline',
            component: _text2.default,
            options: {
              text: 'Adresse'
            }
          }, {
            text: 'Address',
            name: 'place.address',
            component: _textfield2.default
          }, {
            text: 'Address 2',
            name: 'place.info',
            component: _textfield2.default
          }, {
            display: 'flex',
            direction: 'horizontal',
            components: [{
              text: 'NPA',
              name: 'place.zipcode',
              component: _textfield2.default,
              size: 75
            }, {
              flex: 1,
              text: 'Lieu',
              name: 'place.name',
              component: _textfield2.default
            }]
          }, {
            text: 'Pays',
            name: 'place.country',
            component: _textfield2.default
          }, {
            text: 'lat',
            name: 'place.coord.lat',
            component: _textfield2.default
          }, {
            text: 'long',
            name: 'place.coord.long',
            component: _textfield2.default
          }]
        }, {
          name: 'related',
          direction: 'vertical',
          components: [{
            label: "active",
            component: _switch2.default,
            name: "active",
            options: {
              label: "active"
            }
          }, {
            text: "vip",
            component: _checkbox2.default,
            name: "vip"
          }, {
            text: "rating",
            component: _slider2.default,
            name: "rating"
          }]
        }]
      }, {
        name: 'foot',

        //position: 'fixed',
        // styles: {
        //   bottom: '0px'
        // },

        components: [{
          name: 'toolbar',
          component: _component2.default,
          options: {
            class: 'ui-toolbar'
          },
          components: [{
            name: 'cancel',
            component: _button2.default,
            options: {
              label: 'Cancel'
            }
          }, {
            name: 'apply',
            component: _button2.default,
            options: {
              type: 'raised',
              label: 'Apply'
            }
          }]
        }]
      }]
    }
  });

  form1.insert(body);

  form1.set('info', _contact2.default);

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });

  console.log('form', form1);
};

},{"../data/contact.json":2,"material/src/component.js":55,"material/src/control/button.js":70,"material/src/control/checkbox.js":72,"material/src/control/slider.js":73,"material/src/control/switch.js":74,"material/src/control/textfield":75,"material/src/form.js":77,"material/src/text.js":97}],11:[function(require,module,exports){
'use strict';

var _list = require('material/src/list.js');

var _list2 = _interopRequireDefault(_list);

var _item = require('material/src/list/item.js');

var _item2 = _interopRequireDefault(_item);

var _component = require('material/src/component.js');

var _component2 = _interopRequireDefault(_component);

var _button = require('material/src/control/button.js');

var _button2 = _interopRequireDefault(_button);

var _countries = require('../data/countries.json');

var _countries2 = _interopRequireDefault(_countries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {
  var _this = this;

  console.log('countries', _countries2.default);

  var list1 = new _list2.default({
    //type: 'action',
    height: 600,
    label: 'Flat',
    render: function render(info) {
      //console.log('render', info);
      var item;

      if (info.type === 'separator') {
        item = new _component2.default({
          class: 'ui-separator'
        });
      } else {
        var item = new _item2.default({
          name: info.name,
          text: info.name
        });
      }

      return item;
    },
    select: function select(item) {
      console.log('item...', item);
      _this.selected = item;
    }
  }).insert(body);

  console.log('countries', _countries2.default);

  // var list = countries.concat(countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries, countries);
  var list = _countries2.default;
  console.log('row count', list.length);

  list1.set('list', list);

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });

  console.log('list', list1);
};

},{"../data/countries.json":3,"material/src/component.js":55,"material/src/control/button.js":70,"material/src/list.js":84,"material/src/list/item.js":85}],12:[function(require,module,exports){
'use strict';

var _layout = require('material/src/layout.js');

var _layout2 = _interopRequireDefault(_layout);

var _container = require('material/src/container.js');

var _container2 = _interopRequireDefault(_container);

var _slider = require('material/src/control/slider.js');

var _slider2 = _interopRequireDefault(_slider);

var _button = require('material/src/control/button.js');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */


// switch
module.exports = function (body) {

  console.log('slider init demo');

  var layout = new _layout2.default({
    components: [{
      name: 'container',
      component: _container2.default,
      components: [{
        name: 'default',
        component: _slider2.default,
        options: {
          label: 'Slider'
        }
      }, {
        name: 'disabled',
        component: _slider2.default,
        options: {
          label: 'Disabled',
          disabled: true
        }
      }]
    }]
  }).insert(body);
};

},{"material/src/container.js":66,"material/src/control/button.js":70,"material/src/control/slider.js":73,"material/src/layout.js":80}],13:[function(require,module,exports){
'use strict';

// switch

var _layout = require('material/src/layout.js');

var _layout2 = _interopRequireDefault(_layout);

var _container = require('material/src/container.js');

var _container2 = _interopRequireDefault(_container);

var _switch = require('material/src/control/switch.js');

var _switch2 = _interopRequireDefault(_switch);

var _button = require('material/src/control/button.js');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {

  var layout = new _layout2.default({
    components: [{
      name: 'container',
      component: _container2.default,
      components: [{
        name: 'default',
        component: _switch2.default,
        options: {
          label: 'Switch'
        }
      }, {
        name: 'disabled',
        component: _switch2.default,
        options: {
          label: 'Disabled',
          disabled: true
        }
      }]
    }]
  }).insert(body);

  console.log('layout', layout);
  new _button2.default({
    //primary: true,
    //type: 'raised',
    label: 'toggle'
  }).on('press', function () {
    layout.component.default.toggle();
    console.log('switch state', layout.component.default.get());
  }).insert(layout.component.container);

  new _button2.default({
    //primary: true,
    //type: 'raised',
    label: 'enable'
  }).on('press', function () {
    layout.component.disabled.enable();
  }).insert(layout.component.container);

  new _button2.default({
    //primary: true,
    //type: 'raised',
    label: 'disable'
  }).on('press', function () {
    layout.component.disabled.disable();
  }).insert(layout.component.container);
};

},{"material/src/container.js":66,"material/src/control/button.js":70,"material/src/control/switch.js":74,"material/src/layout.js":80}],14:[function(require,module,exports){
'use strict';

// controls

var _list = require('material/src/list.js');

var _list2 = _interopRequireDefault(_list);

var _button = require('material/src/control/button.js');

var _button2 = _interopRequireDefault(_button);

var _countries = require('../data/countries.json');

var _countries2 = _interopRequireDefault(_countries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {

  console.log('countries', _countries2.default);

  var list1 = new _list2.default({
    //type: 'action',
    height: 600,
    label: 'Flat',
    render: function render(info) {
      //console.log('render', info);
      var item;

      if (info.type === 'separator') {
        item = new Component({
          class: 'ui-separator'
        });
      } else {
        var item = new _button2.default({
          label: info.name
        });
      }

      return item;
    }
  }).insert(body);

  list1.set('list', _countries2.default);

  // list1.on('selected', function(item) {
  //   console.log('item selected', item);
  // });

  console.log('list', list1);
};

},{"../data/countries.json":3,"material/src/control/button.js":70,"material/src/list.js":84}],15:[function(require,module,exports){
'use strict';

var _container = require('material/src/container.js');

var _container2 = _interopRequireDefault(_container);

var _text = require('material/src/text.js');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [initTest description]
 * @return {[type]} [description]
 */
module.exports = function (body) {

  var container = new _container2.default({}).insert(body);

  new _text2.default({
    type: 'headline',
    text: 'Typography'
  }).insert(container);

  new _text2.default({
    type: 'subheading1',
    text: 'Too many type sizes and styles at once can wreck any layout. A typographic scale has a limited set of type sizes that work well together along with the layout grid.'
  }).insert(container);

  new _text2.default({
    type: 'subheading1',
    text: 'These sizes and styles were developed to balance content density and reading comfort under typical usage conditions. Type sizes are specified with sp (scaleable pixels) to enable large type modes for accessibility.'
  }).insert(container);

  new _text2.default({
    type: 'display4',
    text: 'Display 4'
  }).insert(container);

  new _text2.default({
    type: 'display3',
    text: 'Display 3'
  }).insert(container);

  new _text2.default({
    type: 'display2',
    text: 'Display 2'
  }).insert(container);

  new _text2.default({
    type: 'display1',
    text: 'Display 1'
  }).insert(container);

  new _text2.default({
    type: 'headline',
    text: 'Headline'
  }).insert(container);

  new _text2.default({
    type: 'title',
    text: 'Title'
  }).insert(container);

  new _text2.default({
    type: 'subheading2',
    text: 'Subheading 2'
  }).insert(container);

  new _text2.default({
    type: 'subheading1',
    text: 'Subheading 1'
  }).insert(container);

  new _text2.default({
    type: 'body2',
    text: 'Body 2'
  }).insert(container);

  new _text2.default({
    type: 'body1',
    text: 'Body 1'
  }).insert(container);

  new _text2.default({
    type: 'caption',
    text: 'Caption'
  }).insert(container);

  new _text2.default({
    type: 'button'
  }).insert(container);
};

},{"material/src/container.js":66,"material/src/text.js":97}],16:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],17:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * DragDrop.js
 *
 * A JavaScript micro-framework for adding drag-and-drop functionality
 * to elements for advanced UI development.
 *
 * @author     James Brumond
 * @version    0.3.0
 * @copyright  Copyright 2011 James Brumond
 * @license    Dual licensed under MIT and GPL
 */

/*jshint browser: true, bitwise: false, camelcase: false, eqnull: true, latedef: false,
  plusplus: false, jquery: true, shadow: true, smarttabs: true, loopfunc: true */

(function () {

	var

	// Is this a touch device?
	touchEvents = 'ontouchstart' in window,
	   

	// A class to add when an element is being dragged
	dragClass = 'drag',
	   

	/**
  * The DragDrop namespace
  *
  * Example:
  * 
  *   DragDrop.bind ( element[, options ]);
  *   DragDrop.unbind ( reference );
  *
  * @access  public
  */
	DragDrop = (function () {
		var self = {},
		   

		// Determine the events to bind to
		events = touchEvents ? {
			start: 'touchstart',
			move: 'touchmove',
			end: 'touchend'
		} : {
			start: 'mousedown',
			move: 'mousemove',
			end: 'mouseup'
		},
		   

		// Elements already bound
		bindings = [],
		   

		// Check if a given binding (element/anchor pair) already exists
		bindingExists = function bindingExists(element, anchor) {
			for (var i = 0, c = bindings.length; i < c; i++) {
				if (bindings[i] && bindings[i].element === element && bindings[i].anchor === anchor) {
					return true;
				}
			}
			return false;
		},
		   

		// Do something with a given binding's given event stack
		withBindingEvent = function withBindingEvent(reference, event, func) {
			if (bindings[reference._id] && bindings[reference._id].events[event]) {
				func(bindings[reference._id].events[event]);
			}
		},
		   

		// Parse the arguments of DragDrop.bind
		parseOptions = function parseOptions(element, options) {
			options = options || {};
			options.element = element;
			options.anchor = options.anchor || element;
			options.boundingBox = options.boundingBox || null;
			options.releaseAnchors = options.releaseAnchors || [];
			options.releaseAnchors.unshift(document);
			return options;
		},
		   

		// The next binding ID to use
		nextBinding = 1,
		   

		// ------------------------------------------------------------------
		//  A constructor for a resource type used in referencing bindings

		BindingReference = function BindingReference() {
			this._id = nextBinding++;
		};

		BindingReference.prototype.unbind = function () {
			return DragDrop.unbind(this);
		};

		BindingReference.prototype.bindEvent = function (event, func) {
			return DragDrop.bindEvent(this, event, func);
		};

		BindingReference.prototype.unbindEvent = function (event, func) {
			return DragDrop.unbindEvent(this, event, func);
		};

		BindingReference.prototype.invokeEvent = function (event, source) {
			return DragDrop.invokeEvent(this, event, source);
		};

		BindingReference.prototype.setBoundingBox = function (box) {
			bindings[this._id].boundingBox = box;
		};

		// ----------------------------------------------------------------------------
		//  Public Functions

		// Make an element draggable
		self.bind = function (element, options) {
			options = parseOptions(element, options);
			if (!isObject(options.element)) {
				throw new Error('Must give an element to drag');
			}
			if (getStyle(options.element, 'position') === 'static') {
				throw new Error('Cannot drag-drop an element with position:static');
			}
			// Check to make sure the elements aren't already bound
			if (!bindingExists(options.element, options.anchor)) {
				// Initialize the binding object
				var reference = new BindingReference();
				var binding = {
					element: options.element,
					anchor: options.anchor,
					releaseAnchors: options.releaseAnchors,
					dragging: false,
					event: null,
					shouldUnbind: false,
					boundingBox: options.boundingBox,
					events: {
						beforedrag: Callstack(options.beforedrag),
						dragstart: Callstack(options.dragstart),
						dragend: Callstack(options.dragend),
						drag: Callstack(options.drag),
						unbind: Callstack(options.unbind)
					}
				};
				// Bind the first event
				binding.event = Events.bind(binding.anchor, events.start, function (e) {
					// Make sure it's a left click or touch event
					if (window.event && e.button === 1 || e.button === 0 || touchEvents) {
						stopEvent(e);
						// Call any "beforedrag" events before calculations begin
						binding.events.beforedrag.call(binding.element, new DragEvent('beforedrag', e, binding));
						// Make sure everyone knows the element is being dragged
						binding.dragging = true;
						addClass(binding.element, dragClass);
						// Start calculating movement
						var startX = getPos(binding.element, 'left');
						var startY = getPos(binding.element, 'top');
						// These are used in some bounding box calculations
						var startOffsetLeft = binding.element.offsetLeft;
						var startOffsetTop = binding.element.offsetTop;
						var startTotalOffset = getOffset(binding.element);
						// A place to hold on to event functions we are going to unbind later
						var tempEvents = [];
						// The target for the move and end events is dependent on the input type
						var target = touchEvents ? binding.anchor : document;
						// Bind the movement event
						tempEvents.push(Events.bind(target, events.move, function (e2) {
							// Find all needed offsets
							var offsetX = e2.clientX - e.clientX;
							var offsetY = e2.clientY - e.clientY;
							var offsetWidth = binding.element.offsetWidth;
							var offsetHeight = binding.element.offsetHeight;
							// Find the new positions
							var posX = startX + offsetX;
							var posY = startY + offsetY;
							// Enforce any bounding box
							if (binding.boundingBox) {
								var box = binding.boundingBox;
								var minX, maxX, minY, maxY;
								// Bound inside offset parent
								if (box === 'offsetParent') {
									var parent = binding.element.offsetParent;
									if (getStyle(binding.element, 'position') === 'relative') {
										minX = -startOffsetLeft;
										minY = -startOffsetTop;
									} else {
										minX = minY = 0;
									}
									maxX = parent.clientWidth + minX;
									maxY = parent.clientHeight + minY;
								}
								// Bound to the dimensions of the window
								else if (box === 'windowSize') {
										var dimensions = getWindowSize();
										if (getStyle(binding.element, 'position') === 'relative') {
											minX = -startTotalOffset.x;
											minY = -startTotalOffset.y;
										} else {
											minX = minY = 0;
										}
										maxX = dimensions.x + minX;
										maxY = dimensions.y + minY;
									}
									// Manual bounding box
									else {
											minX = box.x.min;
											maxX = box.x.max;
											minY = box.y.min;
											maxY = box.y.max;
										}
								posX = Math.max(minX, Math.min(maxX - offsetWidth, posX));
								posY = Math.max(minY, Math.min(maxY - offsetHeight, posY));
							}
							// Move the element
							binding.element.style.left = posX + 'px';
							binding.element.style.top = posY + 'px';
							// Call any "drag" events
							binding.events.drag.call(binding.element, new DragEvent('drag', e2, binding));
							return stopEvent(e2);
						}));
						// Bind the release events
						for (var i = 0, c = binding.releaseAnchors.length; i < c; i++) {
							var elem = binding.releaseAnchors[i];
							tempEvents.push(Events.bind(elem, events.end, onRelease(elem)));
						}
						// Avoid text selection problems
						document.body.focus();
						tempEvents.push(Events.bind(document, 'selectstart', false));
						tempEvents.push(Events.bind(binding.anchor, 'dragstart', false));
						// Call any "dragstart" events
						binding.events.dragstart.call(binding.element, new DragEvent('dragstart', e, binding));
						return false;
					}
					function onRelease(elem) {
						return function (e2) {
							// Unbind move and end events
							for (var i = 0, c = tempEvents.length; i < c; i++) {
								Events.unbind(tempEvents[i]);
							}
							// Clean up...
							binding.dragging = false;
							removeClass(binding.element, dragClass);
							if (binding.shouldUnbind) {
								DragDrop.unbind(binding.element, binding.anchor);
							}
							// Call any "dragend" events
							binding.events.dragend.call(binding.element, new DragEvent('dragend', e2, binding, {
								releaseAnchor: elem
							}));
							return stopEvent(e2);
						};
					}
				});
				// Add the binding to the list
				bindings[reference._id] = binding;
				return reference;
			}
		};

		// Remove an element's draggableness
		self.unbind = function (reference) {
			if (reference instanceof BindingReference) {
				var id = reference._id;
				if (bindings[id]) {
					var binding = bindings[id];

					if (binding.dragging) {
						binding.shouldUnbind = true;
					} else {
						Events.unbind(binding.event);
						bindings[id] = null;
					}
					// Call any "unbind" events
					binding.events.unbind.call(binding.element, new DragEvent('unbind', { target: true }, binding));
				}
			}
		};

		// Bind a drag event
		self.bindEvent = function (reference, event, func) {
			withBindingEvent(reference, event, function (stack) {
				stack.push(func);
			});
		};

		// Unbind a drag event
		self.unbindEvent = function (reference, event, func) {
			withBindingEvent(reference, event, function (stack) {
				stack.remove(func);
			});
		};

		// Manually invoke a drag event
		self.invokeEvent = function (reference, event, source) {
			withBindingEvent(reference, event, function (stack) {
				stack.call(bindings[reference._id].element, new DragEvent(event, source, reference));
			});
		};

		return self;
	})(),
	   

	// ----------------------------------------------------------------------------
	//  Helper Functions

	// Array Remove - By John Resig (MIT Licensed)
	arrayRemove = function arrayRemove(array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	},
	   

	// Get the position of an element
	getPos = function getPos(elem, from) {
		var pos = parseFloat(getStyle(elem, from));
		return isNaN(pos) ? 0 : pos;
	},
	   

	// Get a style property from an element
	getStyle = function getStyle(elem, prop) {
		if (elem.currentStyle) {
			return elem.currentStyle[prop];
		} else if (window.getComputedStyle) {
			return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
		} else if (elem.style) {
			return elem.style[prop];
		}
	},
	   

	// Get the dimensions of the window
	getWindowSize = function getWindowSize() {
		return {
			x: window.innerWidth || document.documentElement.clientWidth || body().clientWidth,
			y: window.innerHeight || document.documentElement.clientHeight || body().clientHeight
		};
	},
	   

	// Get the total offset position of an element in the document
	getOffset = function getOffset(elem) {
		var x = 0;
		var y = 0;
		if (elem.offsetParent) {
			do {
				x += elem.offsetLeft;
				y += elem.offsetTop;
			} while (elem = elem.offsetParent);
		}
		return { x: x, y: y };
	},
	   

	// Stop an event
	stopEvent = function stopEvent(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		if (evt.stopPropagation) {
			evt.stopPropagation();
		}
		evt.returnValue = false;
		return false;
	},
	   

	// Regular expressions for matching classnames
	cnRegexes = {},
	   

	// Remove a class from an element
	removeClass = function removeClass(elem, cn) {
		if (!cnRegexes[cn]) {
			cnRegexes[cn] = new RegExp('(^|\\s)+' + cn + '(\\s|$)+');
		}
		elem.className = elem.className.replace(cnRegexes[cn], ' ');
	},
	   

	// Add a class to an element
	addClass = function addClass(elem, cn) {
		removeClass(elem, cn);
		elem.className += ' ' + cn;
	},
	   

	// Check for a non-null object
	isObject = function isObject(value) {
		return !!(value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object');
	},
	   

	// Gets the target property of an event
	getEventTarget = function getEventTarget(evt) {
		var target;
		if (evt.target) {
			target = evt.target;
		} else if (evt.srcElement) {
			target = evt.srcElement;
		}
		if (target.nodeType === 3) {
			target = target.parentNode;
		}
		return target;
	},
	   

	/**
  * A stackable function
  *
  * @access  private
  * @param   function  an initial function
  * @return  function
  */
	Callstack = function Callstack(func) {
		var stack = [];
		var result = function result() {
			var ret;
			for (var i = 0, c = stack.length; i < c; i++) {
				ret = stack[i].apply(this, arguments);
			}
			return ret;
		};
		result.push = function () {
			stack.push.apply(stack, arguments);
		};
		result.remove = function () {
			var args = Array.prototype.slice.call(arguments);
			var result = [];
			OUTER: for (var i = 0, c1 = stack.length; i < c1; i++) {
				for (var j = 0, c2 = args.length; j < c2; j++) {
					if (stack[i] === args[j]) {
						continue OUTER;
					}
				}
				result.push(stack[i]);
			}
			stack = result;
		};
		if (typeof func === 'function') {
			stack.push(func);
		}
		return result;
	},
	   

	/**
  * Custom event constructor
  *
  * @access  private
  * @param   string    type
  * @param   object    original event object
  */
	DragEvent = function DragEvent(type, original, binding, extras) {
		this.type = type;
		this.originalEvent = original;
		this.altKey = original.altKey || false;
		this.ctrlKey = original.ctrlKey || false;
		this.shiftKey = original.shiftKey || false;
		this.timestamp = original.timestamp || +new Date();
		this.pos = getPosition(original);
		this.binding = binding;
		this.target = getEventTarget(original);

		if (extras) {
			for (var i in extras) {
				if (extras.hasOwnProperty(i)) {
					this[i] = extras[i];
				}
			}
		}
	},
	   

	/**
  * A namespace with functions for event binding
  *
  * Example:
  *
  *   Bind
  *    var evt = Events.bind(obj, 'event', function() { ... });
  *
  *   Unbind
  *    Events.unbind(evt);
  *     -OR-
  *    evt.unbind();
  *
  * @access  private
  */
	Events = (function () {

		var

		// Bind an event
		bindEvent = (function () {
			if (document.addEventListener) {
				return function (obj, event, func) {
					obj.addEventListener(event, func, false);
				};
			} else if (document.attachEvent) {
				return function (obj, event, func) {
					obj.attachEvent('on' + event, func);
				};
			} else {
				return function () {};
			}
		})(),
		   

		// Unbind an event
		unbindEvent = (function () {
			if (document.removeEventListener) {
				return function (obj, event, func) {
					obj.removeEventListener(event, func, false);
				};
			} else if (document.detachEvent) {
				return function (obj, event, func) {
					obj.detachEvent('on' + event, func);
				};
			} else {
				return function () {};
			}
		})();

		// Build the return value
		return {
			bind: function bind(obj, event, func) {
				var oldFunc = func === false ? function (e) {
					return stopEvent(e);
				} : func;
				func = function (e) {
					return oldFunc.call(obj, e || window.event);
				};
				bindEvent(obj, event, func);
				var ret = function ret() {
					unbindEvent(obj, event, func);
				};
				ret.unbind = function () {
					ret();
				};
				return ret;
			},
			unbind: function unbind(unbinder) {
				unbinder();
			}
		};
	})();

	function getPosition(evt) {
		var posX = 0;
		var posY = 0;
		if (evt.targetTouches) {
			posX = evt.targetTouches[0].pageX;
			posY = evt.targetTouches[0].pageY;
		} else if (evt.pageX || evt.pageY) {
			posX = evt.pageX;
			posY = evt.pageY;
		} else if (evt.clientX || evt.clientY) {
			posX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x: posX, y: posY };
	}

	module.exports = DragDrop;
})();

},{}],18:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
// element related modules

// dependencies

var _emitter = require('./module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _controller = require('./component/controller');

var _controller2 = _interopRequireDefault(_controller);

var _bind = require('./module/bind');

var _bind2 = _interopRequireDefault(_bind);

var _merge = require('./module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _element = require('./component/element');

var _element2 = _interopRequireDefault(_element);

var _attribute = require('./component/attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _classify = require('./component/classify');

var _classify2 = _interopRequireDefault(_classify);

var _events = require('./component/events');

var _events2 = _interopRequireDefault(_events);

var _style = require('./component/style');

var _style2 = _interopRequireDefault(_style);

var _dom = require('./module/dom');

var _dom2 = _interopRequireDefault(_dom);

var _storage = require('./component/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// options
var defaults = require('./component/options');

/**
 * Base class for all ui components
 * @class
 * @namespace Material
 * @param {Object} options - The component options
 * @return {Object} The class Instance
 */
module.exports = (function () {

  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance 
   */

  function Component(options) {
    _classCallCheck(this, Component);

    //super();

    //this.emit('init');
    //this.options = merge(defaults, options);

    this.init(options);
    this.build();

    if (this.options.bind) {
      this.bind(this.options.bind);
    }

    return this;
  }

  /**
   * Initialized component
   * @return {Object} The class instance
   */

  _createClass(Component, [{
    key: 'init',
    value: function init(options) {
      this._name = this.constructor.name.toLowerCase();

      options = options || this.options;
      //this.options = [defaults, options].reduce(Object.assign, {});
      //
      options = options || {};
      this.options = (0, _merge2.default)(defaults, options);

      this.name = this.options.name;

      // merge options

      // implement module
      Object.assign(this, _emitter2.default, _storage2.default, _events2.default, _classify2.default, _style2.default, _attribute2.default, _bind2.default);

      this.document = window.document;

      this.controller = new _controller2.default();

      return this;
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {

      console.log(this.options, options);

      Object.assign(this.options, [defaults, options].reduce(Object.assign, {}));
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {

      return this.options;
    }

    /**
     * Build Method
     * @return {Object} This class instance
     */

  }, {
    key: 'build',
    value: function build() {
      var opts = this.options;

      this.emit('create');

      var tag = opts.tag || 'div';
      this.element = _element2.default.createElement(tag);

      this.initAttributes();
      this.setState(this.options.state);
      this.classify(this._name, this.options);

      this.emit('created');

      if (this.options.layout) {
        console.log('layout', this.options.layout);
        this.options.layout.container = this.element;

        this.layout = new _layout2.default(this.options.layout);
      } else if (this.options.components) {
        this.buildComponents();
      }

      this.content = _element2.default;

      // insert if container options is given
      if (opts.container) {
        //console.log(this.name, opts.container);
        this.insert(opts.container);
      }

      this.controller.register(this);

      return this;
    }

    /**
     * build component inner components
     * @return {[type]} [description]
     */

  }, {
    key: 'buildComponents',
    value: function buildComponents() {

      //console.log('buildComponents', this._name);

      this.component = {};
      this.components = [];

      var opts = this.options.components;

      for (var i = 0; i < opts.length; i++) {
        var options = opts[i];
        this.addComponent(options);
      }
    }
    /**
     * Add inner component
     * @param {optios} options Inner compoonent options
     */

  }, {
    key: 'addComponent',
    value: function addComponent(options) {
      var idx = this.identifyComponent(options);
      var properties = options.props || options.properties || {};

      properties.tag = options.tag;

      //console.log('prop', idx, properties, this.element);

      var component = this.component[idx] = new Component(properties);
      component.insert(this.element);

      this.components.push(component);
    }

    /**
     * Give the inner comenent a unique identifier based on the tag
     * if it already existe, it add an index. For example input, input2
     * this can be overrided using idx or ident
     * @param  {options} options [description]
     * @return {idx}         The given idx
     */

  }, {
    key: 'identifyComponent',
    value: function identifyComponent(options) {
      var tags = options.tag.split(/\./);
      var tag = tags[0];

      var identity = options.idx || options.ident || options.identity || tag;

      var index = 0;
      var idx = identity;

      while (this.component[idx]) {
        index++;
        idx = identity + index;
      }

      return idx;
    }

    /**
     * Inject method insert element to the domtree using Dom methods
     * @param {HTMLElement} container [description]
     * @param  {string} context - Injection context
     * @return {Object} This class intance
     */

  }, {
    key: 'insert',
    value: function insert(container, context) {

      this.emit('insert');
      this.container = container;

      if (container && container.element) {
        container = container.element;
      } else if (container instanceof HTMLElement) {
        container = container;
      } else {
        throw new Error("Can't insert " + container + " is not a HTMLElement object");
      }

      context = context || 'bottom';

      var contexts = ['top', 'bottom', 'after', 'before'];
      var methods = ['prepend', 'append', 'after', 'before'];

      var index = contexts.indexOf(context);
      if (index === -1) {
        return;
      }

      var method = methods[index];

      this.emit('insert');

      // insert component element to the dom tree using Dom
      _dom2.default[method](container, this.element);

      this.isInjected = true;
      this.emit('injected');
      return this;
    }

    /**
     * [show description]
     * @return {Object} The class instance
     */

  }, {
    key: 'show',
    value: function show() {
      this.emit('show');
      this.element.show();

      return this;
    }

    /**
     * [hide description]
     * @return {Object} The class instance
     */

  }, {
    key: 'hide',
    value: function hide() {
      this.emit('hide');
      this.element.hide();

      return this;
    }

    /**
     * [dispose description]
     * @return {Object} The class instance
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      var el = this.element;
      return el.parentNode ? el.parentNode.removeChild(el) : el;
    }

    /**
     * empty
     * @return {void}
     */

  }, {
    key: 'empty',
    value: function empty() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }

    /**
     * [destroy description]
     * @return {Object} this class
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.element.parentNode.removeChild(this.element);

      return this;
    }
  }]);

  return Component;
})();

},{"./component/attribute":19,"./component/classify":20,"./component/controller":21,"./component/element":22,"./component/events":23,"./component/options":25,"./component/storage":27,"./component/style":28,"./layout":35,"./module/bind":40,"./module/dom":44,"./module/emitter":47,"./module/merge":49}],19:[function(require,module,exports){
'use strict';

/**
 * Module fieldset
 * @module component/
 */

module.exports = {

  /**
   * Set atrributes
   * @return {Object} this
   */

  initAttributes: function initAttributes() {
    var opts = this.options;

    if (!opts.attr) {
      return;
    }

    var attr = opts.attr;

    for (var i = 0, len = attr.length; i < len; i++) {
      var name = attr[i];
      var value = opts[name];

      if (value) {
        this.setAttribute(name, value);
      }
    }

    return this;
  },

  /**
   * Set element
   * @param  {string} name The  name
   * @param  {string} value The  value
   * @return {Object} This class instance
   */
  setAttribute: function setAttribute(name, value) {
    if (value !== null) {
      this.element.setAttribute(name, '' + value);
    } else {
      this.element.removeAttribute(name);
    }
  },

  /**
   * Get element
   * @param  {string} name The  name
   * @param  {string} value The  value
   * @return {Object} This class instance
   */
  getAttribute: function getAttribute(name) {
    return this.element.getAttribute(name) || null;
  },

  /**
   * Setter for the state of the component
   * @param {string} state active/disable etc...
   */
  setState: function setState(state) {
    if (this.state) {
      this.removeClass('state-' + this.state);
    }

    if (state) {
      this.addClass('state-' + state);
    }

    this.state = state;
    this.emit('state', state);

    return this;
  },

  /**
   * Get or set text value of the element
   * @param {string} value The text to set
   * @returns {*}
   */
  text: function text(value) {
    //console.log('text', value);
    if (value) {
      if (this.element.innerText) {
        this.element.innerText = value;
      } else {
        this.element.textContent = value;
      }

      return this;
    }

    return this.element.textContent;
  }
};

},{}],20:[function(require,module,exports){
'use strict';

module.exports = {

  /**
   * Init component class
   * @return {Object} This Class instance
   *
   */

  classify: function classify(name, options) {

    var classes = ['type', 'state'];

    //if (name !== 'component') {
    this.addClass(options.prefix + '-' + this._name);
    //}

    if (options.base) {
      this.addClass(options.prefix + '-' + options.base);
    }

    if (this.options.class) {
      this.addClass(this.options.class);
    }

    for (var i = 0; i < classes.length; i++) {
      var name = classes[i];
      if (options[name]) {
        this.addClass(name + '-' + options[name]);
      }
    }

    if (this.options.primary) {
      this.addClass('is-primary');
    }
  },

  /**
   * Check if the element className passed in parameters
   * @param  {string}  className
   * @return {boolean} The result
   */
  hasClass: function hasClass(className) {
    return !!this.element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  },

  /**
   * [addClass description]
   * @param {string} className [description]
   */
  addClass: function addClass(className) {

    if (!this.hasClass(className)) {
      if (this.element.classList) {
        this.element.classList.add(className);
      } else {
        if (this.element.className === '') {
          this.element.className = className;
        } else {
          this.element.className += ' ' + className;
        }
      }
    }

    return this;
  },

  /**
   * Remove tghe give className from the element
   * @param  {HTMLElement} element [description]
   * @param  {string} className [description]
   * @return {object} This object
   */
  removeClass: function removeClass(className) {
    if (!this.element || !className) {
      return;
    }

    if (this.element.classList) {
      this.element.classList.remove(className);
    } else {
      if (this.has(this.element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        this.element.className = this.element.className.replace(reg, ' ');
      }
    }

    return this;
  }
};

},{}],21:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _mediator = require('../module/mediator');

var _mediator2 = _interopRequireDefault(_mediator);

var _merge = require('../module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _cookies = require('../module/cookies');

var _cookies2 = _interopRequireDefault(_cookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

/**
 * 
 */

var Controller = (function () {

  /** 
   * Setting up block level variable to store class state
   * , set's to null by default.
   * credits: http://amanvirk.me/singleton-classes-in-es6/
   */

  function Controller() {
    _classCallCheck(this, Controller);

    if (!instance) {
      instance = this;
    };

    this.components = this.components || [];
    this.component = this.component || {};

    Object.assign(this, _mediator2.default);

    this.init();

    return instance;
  }

  _createClass(Controller, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.subscribe('settings', function (message) {
        //console.log('settings', message);
        _this.setSettings(message.key, message.value);
      });
    }
  }, {
    key: 'setSettings',
    value: function setSettings(key, value) {
      var text = _cookies2.default.get(key);

      var current = {};

      if (text) {
        current = JSON.parse(text);
      }

      console.log('settings value', current, value);
      //settings = [settings, value].reduce(Object.assign, {});
      var settings = (0, _merge2.default)(current, value);

      console.log('settings ' + key, settings);

      _cookies2.default.set(key, JSON.stringify(settings));
    }
  }, {
    key: 'getSettings',
    value: function getSettings(key) {
      var json = _cookies2.default.get(key);

      if (!json) {
        return null;
      }
      var value = JSON.parse(json);

      console.log('settings' + key, value);

      return value;
    }

    /**
     * [register description]
     * @param  {component} component [description]
     * @return {Object} The class instance
     */

  }, {
    key: 'register',
    value: function register(component) {
      //console.log('register', component._name);
      this.components.push(component);

      this.component[component.name] = this.component[component.name] || [];

      this.component[component.name].push(component);

      return this;
    }

    /**
     * [focus description]
     * @param  {component} component [description]
     * @return {Object} The class instance
     */

  }, {
    key: 'focus',
    value: function focus(component) {
      if (component === null) {
        return;
      }

      if (this.active !== component) {
        if (this.active) this.blur(this.active);

        this.active = component;
        component.emit('focus');
      }

      return;
    }

    /**
     * [blur description]
     * @param  {component} component [description]
     * @return {Object} The class instance
     */

  }, {
    key: 'blur',
    value: function blur(component) {
      component.emit('blur', component);

      return;
    }
  }]);

  return Controller;
})();

module.exports = Controller;

},{"../module/cookies":41,"../module/mediator":48,"../module/merge":49}],22:[function(require,module,exports){
'use strict';

/**
 * Element related methods
 * @module component/element
 */

module.exports = {

  /**
   * create dom element
   * @param  {string} string A simple selector string
   * @return {HTMLElement} The dom element
   */

  createElement: function createElement(string, document) {
    document = document || window.document;

    var s = this._selectorFragment(string)[0];
    var tag = s.uTag;

    if (!tag) {
      return null;
    }

    var element = document.createElement(tag);
    var id = s.id;
    var classes = s.classes;

    if (id) {
      element.id = id;
    }

    if (classes) {
      element.className = classes.join(" ");
    }

    return element;
  },

  /**
   * an array of simple selector fragment objects from the passed complex selector string
   * @param  {string} selector The complex selector
   * @return {Array} returns an array of simple selector fragment objects
   */
  _selectorFragment: function _selectorFragment(selector) {
    var fragment;
    var result = [];
    var regex = /^\s*([>+~])?\s*([*\w-]+)?(?:#([\w-]+))?(?:\.([\w.-]+))?\s*/;

    if (typeof selector === "string") {
      while (selector) {
        fragment = selector.match(regex);
        if (fragment[0] === "") {
          // matched no selector
          break;
        }
        result.push({
          rel: fragment[1],
          uTag: (fragment[2] || "").toUpperCase(),
          id: fragment[3],
          classes: fragment[4] ? fragment[4].split(".") : undefined
        });
        selector = selector.substring(fragment[0].length);
      }
    }

    return result;
  }
};

},{}],23:[function(require,module,exports){
'use strict';

module.exports = {

  /**
   * cross browser addEvent
   * @param {string}   event The event to add
   * @param {Function} fn    [description]
   */

  addEvent: function addEvent(event, fn) {
    var self = this;
    var element = this.element;
    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions
    function listenHandler(e) {
      var ret = fn.apply(this, arguments);
      if (ret === false) {
        e.stopPropagation();
        e.preventDefault();
      }
      return ret;
    }

    function attachHandler() {
      // set the this pointer same as addEventListener when fn is called
      // and make sure the event is passed to the fn also so that works the same too
      var ret = fn.call(self.element, window.event);
      if (ret === false) {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
      }
      return ret;
    }

    if (element.addEventListener) {
      element.addEventListener(event, listenHandler, false);
    } else {
      element.attachEvent("on" + event, attachHandler);
    }

    return this;
  },

  /**
   * cross browser removeEvent
   * @param  {string}   event The event to remove
   * @param  {Function} fn    [description]
   * @return {Object}         [description]
   */
  removeEvent: function removeEvent(event, fn) {
    var element = this.element;

    if (element.removeEventListener) {
      element.removeEventListener(event, fn, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + event, element[fn.toString() + event]);
      element[fn.toString() + event] = null;
    } else {
      element['on' + event] = function () {};
    }

    return this;
  }
};

},{}],24:[function(require,module,exports){
'use strict';

var _dom = require('../module/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Inject method insert element to the domtree using Dom methods
 * @param {HTMLElement} container [description]
 * @param  {string} context - Injection context
 * @return {Object} This class intance
 */
module.exports = {

  /**
   * [insert description]
   * @param  {[type]} container [description]
   * @param  {[type]} context   [description]
   * @param  {[type]} debug     [description]
   * @return {[type]}           [description]
   */

  insert: function insert(container, context) {
    this.insertElement(this.element, container, context);

    return this;
  },

  /**
   * [insertElement description]
    * @param  {[type]} element   [description]
   * @param  {[type]} container [description]
   * @param  {[type]} context   [description]
   * @param  {[type]} debug     [description]
   * @return {[type]}           [description]
   */
  insertElement: function insertElement(element, container, context) {
    if (container && container.element) {
      container = container.element;
    }

    this.container = container;

    // if (debug) {
    // console.log('insert', container);
    // }

    //this.emit('insert');

    if (container instanceof HTMLElement) {
      container = container;
    } else {
      throw new Error("Can't insert " + container + " is not a HTMLElement object");
    }

    context = context || 'bottom';

    var contexts = ['top', 'bottom', 'after', 'before'];
    var methods = ['prepend', 'append', 'after', 'before'];

    var index = contexts.indexOf(context);
    if (index === -1) {
      return;
    }

    var method = methods[index];

    //this.emit('insert');

    // insert component element to the dom tree using Dom
    _dom2.default[method](container, element);
    //this.emit('injected');
    //
    return element;
  }
};

},{"../module/dom":44}],25:[function(require,module,exports){
'use strict';

/**
 * Component options
 */

var options = {
  prefix: 'material',
  tag: 'div',
  attr: ['accesskey', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate', 'type']
};

module.exports = options;

},{}],26:[function(require,module,exports){
'use strict';

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

var _morpheus = require('morpheus');

var _morpheus2 = _interopRequireDefault(_morpheus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module fieldset
 * @module component/
 */

module.exports = {
  /**
   * _showRipple methosd
   * @param  {string} ripple
   * @param  {string} x
   * @param  {string} y
   * @param  {Object} coord
   * @return {void}
   */

  _showRipple: function _showRipple(e) {
    var _this = this;

    if (!this.size) {
      this.size = this.offset();
    }

    if (!this.ripple) {
      this.ripple = new _component2.default({
        tag: 'span.ui-ripple'
      }).insert(this, 'top');
    }

    var rippleCoord = this._rippleCoord(this.size);
    var options = this.options.ripple;

    var startLeft = e.offsetX || this.size.width / 2;
    var startTop = e.offsetY || this.size.height / 2;

    this.ripple.style({
      left: startLeft + 'px',
      top: startTop + 'px',
      width: '5px',
      height: '5px',
      opacity: 1
    });

    this.rippleActive = true;

    // stop animation if exists
    if (this.animation) {
      this.animation.stop();
    }

    this.animation = (0, _morpheus2.default)(this.ripple.element, {
      width: rippleCoord.size,
      height: rippleCoord.size,
      left: rippleCoord.left,
      top: rippleCoord.top,
      opacity: 0.2,
      duration: options.duration,
      easing: options.equation,
      complete: function complete() {
        _this.rippleActive = false;
        if (!_this.hasClass('is-active')) _this._hideRipple();
      }
    });
  },

  /**
   * [_hideRipple description]
   */
  _hideRipple: function _hideRipple() {
    var _this2 = this;

    if (!this.ripple || this.rippleActive) {
      return;
    }

    if (this.animation) {
      this.animation.stop();
    }

    this.animation = (0, _morpheus2.default)(this.ripple.element, {
      opacity: 0,
      duration: '200',
      easing: this.options.equation,
      complete: function complete() {
        if (_this2.ripple) {
          _this2.ripple.destroy();
          _this2.ripple = null;
        }
      }
    });
  },

  /**
   * Get ripple final coordiantes
   * @return {Object} Size and top
   */
  _rippleCoord: function _rippleCoord(offset) {
    var size = offset.width;
    var top = -offset.height / 2;

    if (offset.width > offset.height) {
      size = offset.width;
      top = -(offset.width - offset.height / 2);
    } else if (offset.width < offset.height) {
      size = offset.height;
      top = (offset.width - offset.height) / 2;
    }

    return {
      size: size * 2,
      top: top,
      left: size / -2
    };
  }
};

},{"../component":18,"morpheus":53}],27:[function(require,module,exports){
'use strict';

/**
 * Element storage related methods
 * @module component/storage
 */

module.exports = {
  /**
   * [store description]
   * @param  {string} key   [description]
   * @param  {value} value [description]
   * @return {Object} The class instance
   */

  store: function store(key, value) {
    this.storage = this.storage || {};

    this.storage[key] = value;

    return this;
  },

  /**
   * [retrieve description]
   * @param  {string} key The key
   * @return {Object} The value or the requested key
   */
  retrieve: function retrieve(key) {
    this.storage = this.storage || {};

    return this.storage[key];
  }
};

},{}],28:[function(require,module,exports){
'use strict';

/**
 * Element style related methods
 * @module component/style
 */

var _utils = require('../module/utils');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports = {

  /**
   * Returns current coordinates of the element,
   * relative to the document
   *
   * @param {HTMLElement} element
   * @returns {*}
   */

  offset: function offset(prop) {

    var rect = this.element.getBoundingClientRect();

    var offs = {
      top: Math.round(rect.top),
      right: Math.round(rect.right),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left),
      width: rect.width ? Math.round(rect.width) : Math.round(this.element.offsWidth),
      height: rect.height ? Math.round(rect.height) : Math.round(this.element.offsHeight)
    };

    //fallback to css width and height
    if (offs.width <= 0) {
      offs.width = parseFloat(this._getComputedStyle('width'));
    }
    if (offs.height <= 0) {
      offs.height = parseFloat(this._getComputedStyle('height'));
    }

    if (prop) {
      return offs[prop];
    } else {
      return offs;
    }
  },

  /**
   * Gets element's computed style
   * @param {string} prop
   * @returns {*}
   * @private
   */
  _getComputedStyle: function _getComputedStyle(prop) {

    var computedStyle;

    if (typeof window.getComputedStyle === 'function') {
      //normal browsers
      computedStyle = window.getComputedStyle(this.element);
    } else if (_typeof(document.currentStyle) !== undefined) {
      //other browsers
      computedStyle = this.element.currentStyle;
    } else {
      computedStyle = this.element.style;
    }

    if (prop) {
      return computedStyle[prop];
    } else {
      return computedStyle;
    }
  },

  /**
   * Sets or gets HTMLElement's style
   *
   * @param {HTMLElement} element
   * @param {Object} style key value pair object
   * @returns {Object|false}
   */
  style: function style(_style) {
    //console.log('sytle', style);

    if ((0, _utils._isIterable)(this.element) && (0, _utils._isLiteralObject)(_style)) {
      (0, _utils._each)(this.element, function (e) {
        this.style(e, _style);
      });
      return this;
    }

    //get one this.element
    if (typeof _style === "string") {
      return this._getComputedStyle(_style);
    }

    //get array of this.elements
    if ((0, _utils._isArray)(_style)) {
      var css = {};
      for (var i in _style) {
        css[_style[i]] = this._getComputedStyle(_style[i]);
      }
      return css;
    }

    if ((0, _utils._isLiteralObject)(_style)) {
      //set csses
      for (var j in _style) {
        this.element.style[j] = _style[j];
      }
      return _style;
    }

    return false;
  }
};

},{"../module/utils":50}],29:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _options = require('./container/options');

var _options2 = _interopRequireDefault(_options);

var _display = require('./container/display');

var _display2 = _interopRequireDefault(_display);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a UI Container. Can add components.
 *
 * @extends Component
 * @return {parent} The class instance
 * @example new Container({
 *   container: document.body
 * });
 */

var Container = (function (_Component) {
  _inherits(Container, _Component);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Container).apply(this, arguments));
  }

  _createClass(Container, [{
    key: 'init',

    /**
     * Init class
     * @params {Object} options The instance options
     * @return {Object} This class instance
     */
    value: function init(options) {
      _get(Object.getPrototypeOf(Container.prototype), 'init', this).call(this, options);
      this.name = 'container';

      // merge options
      this.options = [_options2.default, options].reduce(Object.assign, {});

      Object.assign(this, _display2.default);

      return this;
    }

    /**
     * [build description]
     * @return {Object} This class  instance
     */

  }, {
    key: 'build',
    value: function build(props) {
      _get(Object.getPrototypeOf(Container.prototype), 'build', this).call(this, props);

      var component = this.options.component;

      if (component) {
        this._initComponent(component);
      }

      return this;
    }

    /**
     * Initialize internal container components
     * @param  {Mixin} component Compenent description
     * @return {void}
     */

  }, {
    key: '_initComponent',
    value: function _initComponent(component) {

      this.component = this.c = {};
      this.components = [];

      if (typeof component === 'string') {
        this.add(component);
      } else {
        for (var i = 0; i < component.length; i++) {
          this.add(component[i]);
        }
      }
    }

    /**
     * [_initComp description]
     * @param  {string} name
     * @param  {string} position
     * @param  {DOMElement} element
     * @return {DOMElement|void}
     */

  }, {
    key: 'add',
    value: function add(name, position, element) {
      //console.log(name, position, element);
      position = position || 'bottom';
      element = element || this.element;

      if (!element) {
        return;
      }

      this.component[name] = new _component2.default().addClass(this.name + '-' + name).insert(element);

      return this.component[name];
    }
  }]);

  return Container;
})(_component2.default);

module.exports = Container;

},{"./component":18,"./container/display":30,"./container/options":31}],30:[function(require,module,exports){
'use strict';

var _morpheus = require('morpheus');

var _morpheus2 = _interopRequireDefault(_morpheus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * display container class
 */
module.exports = {

  /**
   * [_initDisplay description]
   * @return {Object} The class instance
   */

  _initDisplay: function _initDisplay() {
    this._modifier = 'width';

    var direction = '';

    //var direction = this.container.element.style('flex-direction');

    if (direction === 'column') this._modifier = 'height';

    var modifier = this._modifier;

    if (!this[modifier]) this[modifier] = 220;

    this.device = this.device || 'desktop';
    //this.underlay.hide();
    this.display = {};

    return this.display;
  },

  /**
   * [getDisplay description]
   * @return {Object} The class instance
   */
  getDisplay: function getDisplay() {

    return this._display;
  },

  /**
   * [getDisplay description]
   * @return {Object} The class instance
   */
  setDisplay: function setDisplay(display) {

    this._display = display;

    return this;
  },

  /**
   * [toggle description]
   * @return {Object} The class instance
   */
  toggle: function toggle() {
    console.log('toggle');
    if (this._display === 'normalized') {
      this.minimize();
    } else {
      this.normalize();
    }

    return this._display;
  },

  /**
   * [minimize description]
   * @return {Object} The class instance
   */
  minimize: function minimize() {
    var _this = this;

    console.log('minimize');
    if (!this.display) {
      this._initDisplay();
    }

    this.emit('minimize');

    var prop = {
      //stop: () => {},
      duration: 200,
      easing: 'ease-in',
      complete: function complete() {
        _this.emit('display', 'minimized');
      }
    };

    prop[this._modifier] = 0;

    if (this.animation) this.animation.stop();

    this.animation = (0, _morpheus2.default)(this.element, prop);

    this._display = 'minimized';

    this.emit('display', 'minimized');

    return this;
  },

  /**
   * [normalize description]
   * @return {Object} The class instance
   */
  normalize: function normalize() {
    var _this2 = this;

    console.log('normalize');
    if (!this.display) {
      this._initDisplay();
    }

    this.emit('normalize');

    var size = this[this._modifier];

    var property = {
      //stop: () => {},
      duration: 200,
      easing: 'ease-in',
      complete: function complete() {
        _this2.emit('display', 'normalized');
      }
    };

    property[this._modifier] = size;

    if (this.animation) {
      this.animation.stop();
    }

    this.animation = (0, _morpheus2.default)(this.element, property);
    this._display = 'normalized';
    this.emit('display', this._display);

    return this;
  },

  /**
   * [normalize description]
   * @return {Object} The class instance
   */
  maximize: function maximize() {

    this.style('display', null);
    this.addClass('state-focus');

    this._display = 'normalized';

    this.emit('display', this._display);

    return this;
  }
};

},{"morpheus":53}],31:[function(require,module,exports){
'use strict';

/**
 * Container class options
 */
module.exports = {
  name: 'container',
  prefix: 'material',

  type: null,

  element: {
    tag: 'span',
    type: null
  }
};

},{}],32:[function(require,module,exports){
'use strict';

var defaults = {
  //prefix: 'ui',
  //disabled: false
  error: false
};

/**
 * control class
 *
 * @class
 */
module.exports = {

  /**
   * Setter
   * @param {string} prop
   * @param {string} value
   */
  set: function set(prop, value) {

    switch (prop) {
      case 'value':
        this.setValue(value);
        break;
      default:
        this.setValue(prop);

    }

    return this;
  },

  /**
   * Getter
   * @param {string} prop
   * @param {string} value
   */
  get: function get(prop) {
    var value;

    switch (prop) {
      case 'value':
        value = this.getValue();
        break;
      case 'name':
        value = this.name;
        break;
      default:
        return this.getValue();
    }

    return value;
  },

  /**
   * [getValue description]
   * @return {Object} The class instance
   */
  getValue: function getValue() {
    console.log('getValue', this);
    return this.component.input.element.value;
  },

  /**
   * [setValue description]
   * @param {string} value [description]
   */
  setValue: function setValue(value) {
    //console.log('setValue', value, this.component.input);
    this.component.input.element.value = value;
    this.emit('change', value);
  },

  /**
   * [isEnable description]
   * @return {boolean}
   */
  isEnable: function isEnable() {
    if (this.state === 'disabled') {
      return false;
    } else {
      return true;
    }
  },

  /**
   * build checkbox label
   * @param  {[type]} label [description]
   * @return {[type]}       [description]
   */
  setLabel: function setLabel(text) {
    //console.log('setLabel', this.options);
    text = text || this.options.label || this.options.text;

    if (text !== null && this.component.label) {
      this.component.label.text(text);
    }
  },
  focus: function focus() {
    this.element.focus();
  }
};

},{}],33:[function(require,module,exports){
'use strict';

// base class

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

var _ripple = require('../component/ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// modules

var defaults = {
  prefix: 'material',
  type: 'control', // push, file
  tag: 'button',
  // components: [{
  //   tag: 'label.ui-text'
  // }],
  ripple: {
    duration: '500',
    equation: 'ease-out'
  },
  bind: {
    'click': ['_onClick', '_showRipple'],
    'mousedown': ['_onMouseDown'],
    'mouseup': ['_onMouseUp'],
    'mouseout': ['_onMouseOut', '_hideRipple']
  }
};

/**
 * Button control class
 * @class
 * @extends Control
 * @since 0.0.1
 * @example
 * var button = new Button({
 *   label: 'Primary raised button',
 *   type: 'raised',
 *   primary: true
 * }).on('press', function(e) {
 *   console.log('button press', e);
 * }).insert(document.body);
 */

var Button = (function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'init',

    /**
     * The init method of the Button class
     * @param  {Object} options [description]
     * @private
     * @return {Object} The class instance
     */
    value: function init(options) {
      _get(Object.getPrototypeOf(Button.prototype), 'init', this).call(this, defaults);

      this.options = [this.options, options].reduce(Object.assign, {});

      Object.assign(this, _control2.default);
      Object.assign(this, _ripple2.default);

      this.component = {};

      return this;
    }

    /**
     * Build button's method
     * @override
     * @return {void}
     */

  }, {
    key: 'build',
    value: function build(props) {
      _get(Object.getPrototypeOf(Button.prototype), 'build', this).call(this, props);

      var opts = this.options;
      var type = opts.type;

      opts.label = opts.label || opts.text;

      //if (opts.text) {
      this._initLabel(type, opts.icon || opts.name);
      //}

      if (type === null) {
        type = 'icon-text';
      }

      if (opts.name) {
        this.setAttribute('data-name', opts.name);
      }

      if (opts.text) {
        this.setAttribute('title', opts.text);
      }
      if (opts.icon) {
        this._initIcon(type, opts.icon || opts.name);
      }

      this.setLabel();

      //this._initLabel(type);
      this.sensor = this.element;
    }

    /**
     * [_onElementMouseDown description]
     * @param  {event} e
     * @return {void}
     */

  }, {
    key: 'press',
    value: function press(e) {
      e.preventDefault();

      if (this.state === 'disabled') return;

      this.emit('press', e);

      return this;
    }

    /**
     * [_initIcon description]
     * @param  {string} type
     * @return {string}
     */

  }, {
    key: '_initLabel',
    value: function _initLabel(type, name) {

      var code = name;

      var position = 'top';
      if (this.options.type === 'text-icon') {
        position = 'bottom';
      }

      var prop = {
        'tag': 'label.ui-text'
      };

      this.component.label = new _component2.default(prop).insert(this.element, position);
    }

    /**
     * [_initIcon description]
     * @param  {string} type
     * @return {string}
     */

  }, {
    key: '_initIcon',
    value: function _initIcon(type, name) {

      var code = name;

      var position = 'top';
      if (this.options.type === 'text-icon') {
        position = 'bottom';
      }

      var prop = {
        'tag': 'span.ui-icon'
      };

      this.icon = new _component2.default(prop).insert(this.element, position);

      // prepare use of svg
      // this.iconsvg = new Element('svg', prop).insert(this.element);
      // this.svguse = new Element('use').insert(this.iconsvg);

      // this.iconsvg.setAttribute('viewBox', '0 0 24 24');
      // this.svguse.setAttribute('xlripple:href','/vendor/icon/content-send.svg');

      if (code) {
        this.icon.addClass(code);
      }
    }

    /**
     * _onClick
     * @param  {Event} e The related event
     */

  }, {
    key: '_onClick',
    value: function _onClick(e) {
      // e.preventDefault();
      // e.stopPropagation();

      this.press(e);
    }

    // /**
    //  * _onMouseDown description
    //  * @param  {Event} e The related event
    //  */
    // _onMouseDown(e) {
    //   //console.log('_onMouseDown');
    //   e.preventDefault();
    //   e.stopPropagation();
    //   this.addClass('is-active');
    // }

    /**
     * _onMouseDown description
     * @param  {Event} e The related event
     */

  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(e) {
      //console.log('_onMouseUp');
      // e.preventDefault();
      // e.stopPropagation();

      this.removeClass('is-active');
    }

    /**
     * _onMouseDown description
     * @param  {Event} e The related event
     */

  }, {
    key: '_onMouseOut',
    value: function _onMouseOut(e) {
      e.preventDefault();
      e.stopPropagation();
      this.removeClass('is-active');
    }
  }]);

  return Button;
})(_component2.default);

module.exports = Button;

},{"../component":18,"../component/ripple":26,"../control":32}],34:[function(require,module,exports){
'use strict';

/**
 * Element style related methods
 * @module component/style
 */

var _utils = require('../module/utils');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports = {

  /**
   * Gets element's computed style
   * @param {string} prop
   * @returns {*}
   * @private
   */

  get: function get(element, style) {

    //get array of elements
    if ((0, _utils._isArray)(style)) {
      var css = {};
      for (var i in list) {
        css[list[i]] = this.get(element, list[i]);
      }
      return css;
    } else {

      var computedStyle;

      if (typeof window.getComputedStyle === 'function') {
        //normal browsers
        computedStyle = window.getComputedStyle(element);
      } else if (_typeof(document.currentStyle) !== undefined) {
        //other browsers
        computedStyle = element.currentStyle;
      } else {
        computedStyle = element.style;
      }

      if (style) {
        return computedStyle[style];
      } else {
        return computedStyle;
      }
    }
  },

  /**
   * set element style
   * @param {[type]} element [description]
   * @param {[type]} style   [description]
   */
  set: function set(element, style) {
    //console.log('sytle set', element, style);

    if ((0, _utils._isIterable)(element) && (0, _utils._isLiteralObject)(style)) {
      (0, _utils._each)(element, function (e) {
        this.set(e, style);
      });
      return this;
    }

    if ((0, _utils._isLiteralObject)(style)) {
      //console.log('style', element, style);
      for (var i in style) {
        element.style[i] = style[i];
      }
      return style;
    }

    return false;
  }
};

},{"../module/utils":50}],35:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

//import container from './layout/container';

var _emitter = require('./module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _controller = require('./component/controller');

var _controller2 = _interopRequireDefault(_controller);

var _insert = require('./component/insert');

var _insert2 = _interopRequireDefault(_insert);

var _css = require('./module/css');

var _css2 = _interopRequireDefault(_css);

var _merge = require('./module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _bind = require('./module/bind');

var _bind2 = _interopRequireDefault(_bind);

var _style = require('./element/style');

var _style2 = _interopRequireDefault(_style);

var _component = require('./layout/component');

var _component2 = _interopRequireDefault(_component);

var _resizer = require('./layout/resizer');

var _resizer2 = _interopRequireDefault(_resizer);

var _options = require('./layout/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Layout view
 * @class
 */
module.exports = (function () {

  /**
   * The init method of the Button class
   * @param  {Object} options [description]
   * @private
   * @return {Object} The class instance
   */

  function Layout(options) {
    _classCallCheck(this, Layout);

    this.options = (0, _merge2.default)(_options2.default, options);

    this.init();
    this.build();

    // if (this.options.bind) {
    //   this.bind(this.options.bind);
    // }

    return this;
  }

  /**
   * initiate class
   * @param  {Object} options The class options
   * @return {Object} The class instance
   */

  _createClass(Layout, [{
    key: 'init',
    value: function init(options) {
      var _this = this;

      options = options || this.options;

      Object.assign(this, _emitter2.default, _component2.default, _resizer2.default, _insert2.default);

      this._name = this.constructor.name.toLowerCase();
      this.element = this.options.element;
      this.container = this.options.container;

      this.component = {};
      this.components = [];
      this.settings = this.options.settings || {};

      // this.settings = this.controller.getSettings('app-' + this.options.appname);
      // //console.log('settings', this.settings);

      this.controller = new _controller2.default();

      window.addEventListener('resize', function () {
        _this.emit('resize');
      });

      return this;
    }

    /**
     * Build
     * @return {Object} [description]
     */

  }, {
    key: 'build',
    value: function build(options) {
      options = options || this.options;

      if (!this.element) {
        this.element = document.createElement(options.tag);
      }

      console.log('build', this.element);

      _css2.default.add(this.element, 'material' + '-' + this._name);
      _css2.default.add(this.element, this._name + '-' + options.name);
      //component.addClass(component._name + '-' + component.name);
      //console.log('build', options, this.element);

      this.resizer = {};

      options.container = this.element;

      if (this.container) {
        this.insert(this.container, this.context);
      }

      this._render(options);

      return this;
    }

    /**
     * [_process description]
     * @param  {Object} node Layout structure
     * @return {string} type type of node e. tab
     */

  }, {
    key: '_render',
    value: function _render(component, level) {
      level = level++ || 1;

      var options = component.options;

      this._initPosition(component.container, component.position);
      this._initStyles(component.container, component.styles);
      this._initDisplay(component.container, component.display, component.direction);

      if (component.components) {
        this._renderComponents(component, level);
      }

      return this;
    }

    /**
     * [renderSection description]
     * @param  {[type]} component [description]
     * @param  {[type]} type    [description]
     * @param  {[type]} level   [description]
     * @return {[type]}         [description]
     */

  }, {
    key: '_renderComponents',
    value: function _renderComponents(component, level) {
      var components = component.components;
      var container = component.container;
      //console.log('_renderComponents', components, type, level);
      for (var i = 0, len = components.length; i < len; i++) {
        var property = components[i];

        //console.log('property', property.name);

        var options = property.options || {};

        options.container = container;
        // manage shortcut

        options.flex = options.flex || property.flex;
        options.hide = options.hide || property.hide;
        options.theme = options.theme || property.theme;
        options.size = options.size || property.size;

        if (component.direction == 'vertical' && options.size) {
          options.height = options.size;
        } else if (options.size) {
          options.width = options.size;
        }

        if (!property.component) {
          //console.log('property component', this.options.component);
        }

        options.component = property.component || this.options.component;

        //options.type = property.type || options.type;
        options.name = options.name || property.name;
        options.text = options.text || property.text;
        options.type = options.type || property.type;
        options.position = i + 1;
        options.nComp = components.length;

        if (i === components.length - 1) {
          options.last = true;
        }

        // options.flex = options.flex || comp.flex;
        // options.hide = options.hide || comp.hide;
        // options.theme = options.theme || comp.theme;

        //console.log('_initComponent', options);
        var component = this._initComponent(options);

        if (component.options.name) {
          _css2.default.add(component.element, component._name + '-' + component.options.name);
        }
        // component.addClass(this._name + '-' + 'component');
        // component.addClass('component-' + property.name);

        property.container = component.element;

        //console.log('property.components', options.name, property);

        if (property.components) {
          this._render(property, level);
        }
      }
    }

    /**
     * [_resize description]
     * @return {[type]} [description]
     */

  }, {
    key: '_resize',
    value: function _resize() {
      console.log('resize');
    }
  }, {
    key: '_initPosition',
    value: function _initPosition(element, position) {
      if (!position) return;
      //console.log('_initPosition', element, position);
      _style2.default.set(element, {
        position: position
      });
    }
  }, {
    key: '_initStyles',
    value: function _initStyles(element, styles) {
      if (!styles) return;
      //console.log('_initStyles', element, styles);
      _style2.default.set(element, styles);
    }

    /**
     * [_initFlexDirection description]
     * @param  {Element} container Init direction for the given container
     * @param  {string} direction (horizontal,vertical)
     */

  }, {
    key: '_initDisplay',
    value: function _initDisplay(element, display, direction) {
      if (!element || !display) return;
      //console.log('_initFlex', element, direction);

      var modifier;
      direction = direction || this.options.direction;

      if (direction === 'horizontal') {
        element.className += ' ' + 'flex-raw';
      } else if (direction === 'vertical') {
        element.className += ' ' + 'flex-column';
      }
    }
  }]);

  return Layout;
})();

},{"./component/controller":21,"./component/insert":24,"./element/style":34,"./layout/component":36,"./layout/options":37,"./layout/resizer":38,"./module/bind":40,"./module/css":42,"./module/emitter":47,"./module/merge":49}],36:[function(require,module,exports){
'use strict';

var _style = require('../element/style');

var _style2 = _interopRequireDefault(_style);

var _css = require('../module/css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  /**
   * Instanciate the given object comp
   * @param  {Object} comp list component
   * @return {component}
   */

  _initComponent: function _initComponent(options) {
    //console.log('_initComponent', options.name, options);
    options = options || {};

    // shortcuts
    // options.flex = options.flex || comp.flex;
    // options.hide = options.hide || comp.hide;
    // options.theme = options.theme || comp.theme;

    var name = options.name || 'main';

    //options.container = comp.container;
    var component = this.component[name] = new options.component(options);

    this.components.push(component);

    //console.log('component instance', component);

    // register component

    this._componentRegister(name, component);

    //settings
    //this._initComponentSettings(component);

    // style, size and event
    this._setComponentStyles(component);
    this._setComponentDisplay(component);

    return component;
  },

  /**
   * [_componentRegister description]
   * @param  {string} name      [description]
   * @param  {component} component [description]
   */
  _componentRegister: function _componentRegister(name, component) {
    //console.log('_componentRegister', name, component._name);
    this.components = this.components || [];
    this.components.push(component);
    var _name = component._name;

    this.controls = this.controls || [];

    var controls = this.options.controls;

    //console.log('control', component.name, _name, controls);

    if (controls && controls.indexOf(_name) >= 0) {
      this.controls.push(component);
    }
  },

  /**
   * [_initComponentSettings description]
   * @param  {component} component [description]
   */
  // _initComponentSettings(component) {
  //
  //  var name = component.getName();
  //  var element = component.element;
  // },

  /**
   * [_initComponentSettings description]
   * @param  {component} component [description]
   */
  _setComponentStyles: function _setComponentStyles(component) {

    if (component.options.flex) {
      _css2.default.add(component.element, 'flex-' + component.options.flex);
    } else {

      //console.log('not flex', component.options.name, component.options);

      if (component.options.size && component.options.width) {
        var size = component.options.size;
        if (this.settings && this.settings.layout && this.settings.layout.section && this.settings.layout.section[component.name] && this.settings.layout.section[component.name].width) {

          size = this.settings.layout.section[component.name].width;

          _style2.default.set(component.element, {
            'width': size + 'px'
          });
        }
      } else {
        _style2.default.set(component.element, {
          height: component.options.size + 'px'
        });
      }
    }

    if (component.options.hide) {
      _style2.default.set(component.element, {
        display: 'none'
      });
    }

    if (component.options.theme) {
      _css2.default.add(component.element, 'theme' + '-' + component.options.theme);
    }
  },

  /**
   * [_initSize description]
   * @param  {component} component [description]
   */
  _setComponentDisplay: function _setComponentDisplay(component) {
    var display = 'normalized';

    // var name = component.getName();
    // if (this.settings[name] && this.settings[name].display) {
    //  display = this.settings[name].display;
    // }

    if (!component.setDisplay) return;
    component.setDisplay(display, 'width');

    if (component.options.flex) return;

    //this._initResizer(component);
    this.emit('drag');

    this._attachComponentEvents(component);
  },

  /**
   * _setComponentSettings description
   * @param {Object} component Component object
   */
  // _setComponentSettings(component) {
  //  var display = 'normalized';

  //  var name = component.getName();
  //  var element = component.element;

  //  if (component.options.flex) {

  //    if (this.settings[name] && this.settings[name].width) {
  //      //style('flex', 'none');
  //      element.addClass('flex-none');
  //      if (display === 'minimized') {

  //        style('width', 0);
  //      } else {

  //        if (this.settings[name].width < 32)
  //          this.settings[name].width = 32;

  //        element.style('width', this.settings[name].width || 160);
  //      }

  //      component.width = this.settings[name].width || 200;
  //      component._modifier = 'width';
  //    } else if (this.settings[name] && this.settings[name].height) {
  //      element.style('flex', 'none');
  //      element.style('height', this.settings[name].height);
  //      component.height = this.settings[name].height || 160;
  //      component._modifier = 'height';
  //    }
  //  }
  // },

  /**
   * [_attachComponentEvents description]
   * @param  {component} component [description]
   */
  _attachComponentEvents: function _attachComponentEvents(component) {
    var _this = this;

    var name = component.name || component.options.name;

    /**
     *  toggled
     */
    component.on('toggled', function () {
      _this.emit('resize');
    }).on('resizing', function () {
      _this.emit('resize');
    }).on('display', function (state) {
      _this.emit('resize');
      _this.emit('display', [name, state]);
    });

    this.on('resize', function () {
      component.emit('resize');
    }).on('drag:', function () {
      component.emit('resize');
    }).on('normalize', function () {
      component.emit('resize');
    }).on('maximize', function () {
      component.emit('resize');
    }).on('minimize', function () {
      component.emit('resize');
    });
  }
};

},{"../element/style":34,"../module/css":42}],37:[function(require,module,exports){
'use strict';

/**
 * Element options
 */
module.exports = {
  prefix: 'material',
  tag: 'div',
  settings: {
    list: {
      width: 320
    },
    navi: {
      width: 230,
      display: "normalized"
    }
  },
  direction: 'horizontal',
  position: 'flex',
  resizer: {
    modifier: {
      row: {
        size: 'width',
        from: 'left',
        mode: {
          y: false
        }
      },
      column: {
        size: 'height',
        from: 'top',
        mode: {
          x: false
        }
      }
    }
  }
};

},{}],38:[function(require,module,exports){
'use strict';

var Component = require("../component");
var element = require("../module/element");
var DragDrop = require("material/dist/vendor/dragdrop");

var resize = {

  /**
   * _initResizeBorder description
   * @param  {component} component [description]
   */

  _initResizer: function _initResizer(component) {
    var name = component.options.name;

    var container = component.container || component.options.container;
    var direction = this._initResizerDirection(container);
    var modifier = this.options.resizer.modifier[direction];

    if (!direction || !modifier || !container) {
      return;
    }

    var resizer = this.resizer[name] = new Component({
      tag: 'div.ui-resizer'
    }).insert(container);

    resizer.setAttribute('data-name', name);

    if (modifier.size) {
      resizer.addClass('resizer-' + modifier.size);
    }

    this._initResizerDrag(resizer, modifier, component);
    this._initResizerEvent(component, resizer, modifier);
  },

  /**
   * _initResizerDirection - description
   *
   * @param  {type} container description
   * @return {type}           description
   */
  _initResizerDirection: function _initResizerDirection(container) {
    var direction;

    var isColumn = container.className.match(new RegExp('(\\s|^)flex-column(\\s|$)'));
    var isRaw = container.className.match(new RegExp('(\\s|^)flex-raw(\\s|$)'));

    if (isColumn) {
      direction = 'column';
    } else if (isRaw) {
      direction = 'row';
    }

    return direction;
  },

  /**
   * _initResizerDrag
   */
  _initResizerDrag: function _initResizerDrag(resizer, modifier, component) {
    var _this = this;

    // the last statement is temporary before i fix the component correctly

    var draggable = DragDrop.bind(resizer.element, {
      //anchor: anotherElement,
      boundingBox: 'offsetParent',
      dragstart: function dragstart(ev) {
        //console.log('dragstart', ev);
        //this.emit('resizeStart', component);
        //self.mask.style('display', 'block');
      },
      dragend: function dragend(ev) {
        _this.emit('drag', ev);
        _this._onDrag(resizer, modifier, component, true);
      },
      drag: function drag() {
        _this._onDrag(resizer, modifier, component);
      }
    });

    return draggable;
  },

  /**
   * [_onDrag description]
   */
  _onDrag: function _onDrag(resizer, modifier, component, end) {
    //self.mask.style('display', 'block');
    var from = modifier.from;
    var size = modifier.size;
    var container = component.container;
    var last = component.options.last;
    var style = {};
    var coord = {};

    var c = {};
    c[from] = resizer.offset(from);
    coord[from] = component.offset(from);

    var value;

    if (last) {
      var csize = element.offset(container, size);
      value = csize - c[from];
      style[size] = csize - c[from] + 'px';
      //console.log('resize', component, style);
      component.style(style);
    } else {
      value = c[from] - coord[from];
      style[size] = c[from] - coord[from] + 'px';
      component.style(style);
    }

    // console.log('settings', component.name, size, value, this.options.appname, this.options.name, component.name);

    if (end) {

      var settings = {
        key: 'app-' + this.options.appname,
        value: {},
        layout: {
          section: {}
        }
      };

      settings.value.layout.section[component.name] = {};
      settings.value.layout.section[component.name][size] = value;

      this.controller.publish('settings', settings);
    }
    //this._updateSize(component, resizer, modifier);
    this.emit('drag');
  },

  /**
   * [_onDrag description]
   */
  _onDrag: function _onDrag(resizer, modifier, component) {
    //self.mask.style('display', 'block');
    var from = modifier.from;
    var size = modifier.size;
    var container = component.container;
    var last = component.options.last;
    var style = {};
    var coord = {};

    var c = {};
    c[from] = resizer.offset(from);
    coord[from] = component.offset(from);

    var value;

    if (last) {
      var csize = element.offset(container, size);
      value = csize - c[from];
      style[size] = csize - c[from] + 'px';
      //console.log('resize', component, style);
      component.style(style);
    } else {
      value = c[from] - coord[from];
      style[size] = c[from] - coord[from] + 'px';
      component.style(style);
    }

    // console.log('settings', component.name, size, value, this.options.appname, this.options.name, component.name);
    var name = this.options;

    var settings = {};
    settings = {
      key: 'app-' + this.options.appname
    };

    settings.value = {
      layout: {
        section: {}
      }
    };

    settings.value.layout.section[component.name] = {};
    settings.value.layout.section[component.name][size] = value;

    this.controller.publish('settings', settings);

    //this._updateSize(component, resizer, modifier);
    this.emit('drag');
  },

  /**
   * [_initResizerEvent description]
   * @param  {component} component [description]
   * @param  {element} resizer   [description]
   * @param  {string} modifier  [description]
   */
  _initResizerEvent: function _initResizerEvent(component, resizer, modifier) {
    var _this2 = this;

    resizer.on('click', function (e) {
      e.stopPropagation();
    });
    resizer.on('mousedown', function (e) {
      e.stopPropagation();
    });
    resizer.on('mouseup', function (e) {
      e.stopPropagation();
    });

    this.on('drag', function () {
      _this2._updateSize(component, resizer, modifier);
    });
    this.on('maximize', function () {
      _this2._updateSize(component, resizer, modifier);
    });
    this.on('normalize', function () {
      _this2._updateSize(component, resizer, modifier);
    });
    this.on('resize', function () {
      _this2._updateSize(component, resizer, modifier);
    });
  },

  /**
   * _updateSize
   * @param  {component} component [description]
   * @param  {element} resizer   [description]
   * @param  {string} modifier  [description]
   */
  _updateSize: function _updateSize(component, resizer, modifier) {
    var container = component.container;
    var from = modifier.from;
    var size = modifier.size;
    var style = {};
    var coord = {};

    coord[from] = component.offset(from);
    coord[size] = component.offset(size);

    // for the last component
    // the resizer is on the left or on the top
    if (component.options.last) {
      var csize = element.offset(container, size);
      style[from] = csize - coord[size] - 3 + 'px';
      resizer.style(style);
    } else {
      style[from] = coord[from] + coord[size] - 3 + 'px';
      resizer.style(style);
    }

    this.emit('size');
  }
};

module.exports = resize;

},{"../component":18,"../module/element":46,"material/dist/vendor/dragdrop":17}],39:[function(require,module,exports){
'use strict';

//import Component from './component';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _merge = require('../module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _insert = require('../component/insert');

var _insert2 = _interopRequireDefault(_insert);

var _css = require('../module/css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import bind from '../module/bind';

var defaults = {
  prefix: 'material',
  tag: {
    default: 'span',
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading2: 'h3',
    subheading1: 'h4',
    body: 'p',
    body2: 'aside',
    caption: 'span'
  }
};

/**
 * The item class is used for example as item list
 *
 * @class
 * @extends {Component}
 * @return {Object} The class instance
 * @example new Item(object);
 */
module.exports = (function () {

  /**
   * init
   * @return {Object} The class options
   */

  function Item(options) {
    _classCallCheck(this, Item);

    this.init(options);
    this.build();

    return this;
  }

  /**
   * [init description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */

  _createClass(Item, [{
    key: 'init',
    value: function init(options) {

      // merge options
      this.options = (0, _merge2.default)(defaults, options);

      // define _name
      this._name = this.constructor.name.toLowerCase();

      // assign modules
      Object.assign(this, _insert2.default);
    }

    /**
     * Build function for item
     * @return {Object} This class instance
     */

  }, {
    key: 'build',
    value: function build(options) {
      options = options || this.options;

      // define main tag
      var tag = options.tag[options.type] || options.tag.default;

      this.element = document.createElement(tag);

      if (options.text) {
        this.set(options.text);
      }

      _css2.default.add(this.element, this.options.prefix + '-' + this._name);

      if (options.type) {
        _css2.default.add(this.element, this._name + '-' + options.type);
      }

      if (this.options.container) {
        this.insert(this.options.container);
      }
    }

    /**
     * Get or set text value of the element
     * @param {string} value The text to set
     * @returns {*}
     */

  }, {
    key: 'set',
    value: function set(value) {
      if (value) {
        if (this.element.innerText) {
          this.element.innerText = value;
        } else {
          this.element.textContent = value;
        }

        return this;
      }

      return this;
    }
  }]);

  return Item;
})();

},{"../component/insert":24,"../module/css":42,"../module/merge":49}],40:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var standardNativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'mousemultiwheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'message', 'error', 'abort', 'scroll'];

/**
 * Bind module
 * @module module/bind
 * @example
 * ```
 * var bind = {
 * 	'button.click': 'press'
 * }
 *
 * this.bind(bind);
 * ```
 */
module.exports = {

  /**
   * Iterate and bind passed Object
   * @param {Object} options
   * @return {Object}      this.bind
   */
  bind: function bind(options) {
    options = options || this.options.bind;

    if (!options) return;

    if (!options._list) {
      this._bindObject(options);
    } else {
      var list = options._list;

      for (var i = 0; list.length > i; i++) {
        var bind = binding[list[i]];
        this.binding = this.binding || {};

        this._bindObject(bind);
      }
    }

    return this;
  },

  /**
   * Bind an object
   * @param  {Object} obj obj whit key and value to be bound
   * @return {void}
   */
  _bindObject: function _bindObject(obj) {

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var value = obj[key];

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
          this._bindKey(key, value);
        } else {
          this._bindList(key, value);
        }
      }
    }
  },

  /**
   * Bind a list of events to a specific object
   * @param  {string} key Object path that will listen
   * @param  {Array} values List if values to bind
   * @return {void}
   */
  _bindList: function _bindList(key, values) {

    for (var i = 0; i < values.length; i++) {
      this._bindKey(key, values[i]);
    }
  },

  /**
   * Bind to object path
   * get the event,
   * get the reference to the last key of the first object,
   * check if there is a event or a mehtod to bind
   * @param  {string} key Object path that will listen
   * @param  {string} val Object path to be bound
   * @return {void}
   */
  _bindKey: function _bindKey(key, val) {
    var eventKeys = key.split('.');
    var ev = eventKeys[eventKeys.length - 1];

    eventKeys.pop();
    var listener = this._path(eventKeys.join('.'));

    var valKeys = val.split('.');

    //Check if it's an event
    if (valKeys[valKeys.length - 2] === 'emit') {
      var emit = valKeys[valKeys.length - 1];
      this._bindEvent(listener, ev, emit, val);
    } else {
      this._bindMethod(listener, ev, val);
    }
  },

  /**
   * Listen to the given event and trigger another
   * @param  {Object} listener Object to listen
   * @param  {string} ev Event that will be listened
   * @param  {string} emit Event that will be emitted
   * @param  {string} val Method path to be bound
   * @return {void}
   */
  _bindEvent: function _bindEvent(listener, ev, emit, val) {

    var valKeys = val.split('.');
    valKeys.splice(-2, 2);

    var bound = this._path(valKeys.join('.'));

    if (listener && listener.on && bound && bound.emit) {
      listener.on(ev, bound.emit.bind(bound, emit));
    } else {
      //console.log('--', listener, bound.emit);
    }
  },

  /**
   * Listen to the given event and bind to the given method
   * @param  {Object} listener Object to listen
   * @param  {string} ev Event that will be listened
   * @param  {string} val Method path to be bound
   * @return {void}
   */
  _bindMethod: function _bindMethod(listener, ev, val) {
    var method = this._path(val);

    var valKeys = val.split('.');
    valKeys.pop();
    var bound = this._path(valKeys.join('.'));

    if (method && method.bind && bound) {
      if (standardNativeEvents.indexOf(ev) < 0) {
        // attach event to the instance
        listener.on(ev, method.bind(bound));
      } else {
        // attach event to the element
        listener.addEvent(ev, method.bind(bound));
      }
    }
  },

  /**
   * Return the last reference from an object
   * @param  {string} str Object path for example key1.key2.key3
   * @return {value} The value of the last reference
   */
  _path: function _path(str) {
    if (!str) return this;else if (!str.match(/\./)) return this[str];
    var last;

    var keys = str.split('.');
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];

      last = last || this;
      last = last[key];
    }

    return last;
  }

};

},{}],41:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/*
 * Cookies.js - 1.2.4-pre
 * https://github.com/ScottHamper/Cookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
  'use strict';

  var factory = function factory(window) {
    if (_typeof(window.document) !== 'object') {
      throw new Error('Cookies.js requires a `window` with a `document` object');
    }

    var Cookies = function Cookies(key, value, options) {
      return arguments.length === 1 ? Cookies.get(key) : Cookies.set(key, value, options);
    };

    // Allows for setter injection in unit tests
    Cookies._document = window.document;

    // Used to ensure cookie keys do not collide with
    // built-in `Object` properties
    Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)

    Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

    Cookies.defaults = {
      path: '/',
      secure: false
    };

    Cookies.get = function (key) {
      if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
        Cookies._renewCache();
      }

      var value = Cookies._cache[Cookies._cacheKeyPrefix + key];

      return value === undefined ? undefined : decodeURIComponent(value);
    };

    Cookies.set = function (key, value, options) {
      options = Cookies._getExtendedOptions(options);
      options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

      Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

      return Cookies;
    };

    Cookies.expire = function (key, options) {
      return Cookies.set(key, undefined, options);
    };

    Cookies._getExtendedOptions = function (options) {
      return {
        path: options && options.path || Cookies.defaults.path,
        domain: options && options.domain || Cookies.defaults.domain,
        expires: options && options.expires || Cookies.defaults.expires,
        secure: options && options.secure !== undefined ? options.secure : Cookies.defaults.secure
      };
    };

    Cookies._isValidDate = function (date) {
      return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
    };

    Cookies._getExpiresDate = function (expires, now) {
      now = now || new Date();

      if (typeof expires === 'number') {
        expires = expires === Infinity ? Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
      } else if (typeof expires === 'string') {
        expires = new Date(expires);
      }

      if (expires && !Cookies._isValidDate(expires)) {
        throw new Error('`expires` parameter cannot be converted to a valid Date instance');
      }

      return expires;
    };

    Cookies._generateCookieString = function (key, value, options) {
      key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
      key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
      value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
      options = options || {};

      var cookieString = key + '=' + value;
      cookieString += options.path ? ';path=' + options.path : '';
      cookieString += options.domain ? ';domain=' + options.domain : '';
      cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
      cookieString += options.secure ? ';secure' : '';

      return cookieString;
    };

    Cookies._getCacheFromString = function (documentCookie) {
      var cookieCache = {};
      var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

      for (var i = 0; i < cookiesArray.length; i++) {
        var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

        if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
          cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
        }
      }

      return cookieCache;
    };

    Cookies._getKeyValuePairFromCookieString = function (cookieString) {
      // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
      var separatorIndex = cookieString.indexOf('=');

      // IE omits the "=" when the cookie value is an empty string
      separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

      var key = cookieString.substr(0, separatorIndex);
      var decodedKey;
      try {
        decodedKey = decodeURIComponent(key);
      } catch (e) {
        if (console && typeof console.error === 'function') {
          console.error('Could not decode cookie with key "' + key + '"', e);
        }
      }

      return {
        key: decodedKey,
        value: cookieString.substr(separatorIndex + 1) // Defer decoding value until accessed
      };
    };

    Cookies._renewCache = function () {
      Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
      Cookies._cachedDocumentCookie = Cookies._document.cookie;
    };

    Cookies._areEnabled = function () {
      var testKey = 'cookies.js';
      var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
      Cookies.expire(testKey);
      return areEnabled;
    };

    Cookies.enabled = Cookies._areEnabled();

    return Cookies;
  };
  var cookiesExport = global && _typeof(global.document) === 'object' ? factory(global) : factory;

  // AMD support
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return cookiesExport;
    });
    // CommonJS/Node.js support
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
      // Support Node.js specific `module.exports` (which can be a function)
      if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
        exports = module.exports = cookiesExport;
      }
      // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
      exports.Cookies = cookiesExport;
    } else {
      global.Cookies = cookiesExport;
    }
})(typeof window === 'undefined' ? undefined : window);

},{}],42:[function(require,module,exports){
'use strict';

module.exports = {

  /**
   * Check if the element className passed in parameters
   * @param  {string}  className
   * @return {boolean} The result
   */

  has: function has(element, className) {
    if (!element || !className) {
      return;
    }

    return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  },

  /**
   * [addClass description]
   * @param  {HTMLElement} element [description]
   * @param {string} className [description]
   * @return {object} This object
   */
  add: function add(element, className) {
    if (!element || !className) {
      return;
    }

    if (!this.has(element, className)) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        if (element.className === '') {
          element.className = className;
        } else {
          element.className += ' ' + className;
        }
      }
    }

    return this;
  },

  /**
   * Remove tghe give className from the element
   * @param  {HTMLElement} element [description]
   * @param  {string} className [description]
   * @return {object} This object
   */
  remove: function remove(element, className) {
    if (!element || !className) {
      return;
    }

    if (element.classList) {
      element.classList.remove(className);
    } else {
      if (this.has(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
      }
    }

    return this;
  }
};

},{}],43:[function(require,module,exports){
(function (process,global){
'use strict';

/**
 * Module defer
 * @module module/defer
 */

// function kindOf from mout

var _rKind = /^\[object (.*)\]$/;
var _toString = Object.prototype.toString;
var UNDEF;

/**
 * Gets the "kind" of value. (e.g. "String", "Number", etc)
 */
function kindOf(val) {
  if (val === null) {
    return 'Null';
  } else if (val === UNDEF) {
    return 'Undefined';
  } else {
    return _rKind.exec(_toString.call(val))[1];
  }
}

var callbacks = {
  timeout: {},
  frame: [],
  immediate: []
};

/**
 * defer
 * @class
 * @author https://github.com/kamicane
 */
var push = function push(collection, callback, context, defer) {

  var iterator = function iterator() {
    iterate(collection);
  };

  if (!collection.length) defer(iterator);

  var entry = {
    callback: callback,
    context: context
  };

  collection.push(entry);

  return function () {
    var io = collection.indexOf(entry);
    if (io > -1) collection.splice(io, 1);
  };
};

/**
 * [iterate description]
 * @return {void}            [description]
 */
var iterate = function iterate(collection) {
  var time = Date.now();

  //console.log('!!', collection);

  collection.splice(0).forEach(function (entry) {
    entry.callback.call(entry.context, time);
  });
};

var defer = function defer(callback, argument, context) {
  return kindOf(argument) === "Number" ? defer.timeout(callback, argument, context) : defer.immediate(callback, argument);
};

if (global.process && process.nextTick) {

  defer.immediate = function (callback, context) {
    return push(callbacks.immediate, callback, context, process.nextTick);
  };
} else if (global.setImmediate) {

  defer.immediate = function (callback, context) {
    return push(callbacks.immediate, callback, context, setImmediate);
  };
} else if (global.postMessage && global.addEventListener) {

  addEventListener("message", function (event) {
    if (event.source === global && event.data === "@deferred") {
      event.stopPropagation();
      iterate(callbacks.immediate);
    }
  }, true);

  defer.immediate = function (callback, context) {
    return push(callbacks.immediate, callback, context, function () {
      postMessage("@deferred", "*");
    });
  };
} else {

  defer.immediate = function (callback, context) {
    return push(callbacks.immediate, callback, context, function (iterator) {
      setTimeout(iterator, 0);
    });
  };
}

var requestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame || function (callback) {
  setTimeout(callback, 1e3 / 60);
};

/**
 * [frame description]
 * @param  {Function} callback [description]
 * @return {Array}            [description]
 */
defer.frame = function (callback, context) {
  return push(callbacks.frame, callback, context, requestAnimationFrame);
};

var clear;

/**
 * [timeout description]
 * @param  {Function} callback [description]
 * @return {Array}            [description]
 */
defer.timeout = function (callback, ms, context) {
  var ct = callbacks.timeout;

  if (!clear) clear = defer.immediate(function () {
    clear = null;
    callbacks.timeout = {};
  });

  return push(ct[ms] || (ct[ms] = []), callback, context, function (iterator) {
    setTimeout(iterator, ms);
  });
};

module.exports = defer;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":16}],44:[function(require,module,exports){
'use strict';

/**
 * Element insertion related methods
 * @module module/insertion
 */

module.exports = {

  /**
   * Inserts content specified by the container argument at the end of HTMLElement
   *
   * @param {HTMLElement} container
   * @param {String|HTMLElement} html
   * @return {HTMLElement} inserted element
   */

  append: function append(container, element) {

    container.appendChild(element);
    return element;
  },

  /**
   * Inserts content specified by the html argument at the beginning of HTMLElement
   *
   * @param {HTMLElement} container
   * @param {string|HTMLElement} html
   * @returns {HTMLElement} inserted container
   */
  prepend: function prepend(container, element) {

    container.insertBefore(element, container.firstChild);
    return element;
  },

  /**
   * Inserts content specified by the html argument after the HTMLElement
   *
   * @param {HTMLElement} container
   * @returns {HTMLElement} inserted container
   */
  after: function after(container, element) {

    container.parentNode.insertBefore(element, container.nextSibling);
    return element;
  },

  /**
   * Inserts content specified by the html argument before the HTMLElement
   *
   * @param {HTMLElement} container
   * @returns {HTMLElement} inserted container
   */
  before: function before(container, element) {

    container.insertBefore(element, container);
    return element;
  },

  /**
   * Replaces given html container with content specified in html parameter
   *
   * @param {HTMLElement} container
   * @param {string|HTMLElement} html
   * @returns {HTMLElement} inserted container
   */
  replace: function replace(container, element) {

    container.parentNode.replaceChild(element, container);
    return element;
  },

  /**
   * Removes HTMLElement from dom tree
   *
   * @param {HTMLElement} container
   * @returns {HTMLElement} removed container
   */
  remove: function remove(element) {

    var parent = element.parentNode;
    return parent.removeChild(element);
  }
};

},{}],45:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/*!
 * domready (c) Dustin Diaz 2014 - License MIT
 */
!(function (name, definition) {

  if (typeof module !== 'undefined') module.exports = definition();else if (typeof define === 'function' && _typeof(define.amd) === 'object') define(definition);else this[name] = definition();
})('domready', function () {

  var fns = [];
  var listener;
  var doc = document;
  var hack = doc.documentElement.doScroll;
  var domContentLoaded = 'DOMContentLoaded';
  var loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded) doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener);
    loaded = 1;
    while (listener = fns.shift()) {
      listener();
    }
  });

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  };
});

},{}],46:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports = {
  /**
   * Returns current coordinates of the element,
   * relative to the document
   *
   * @param {HTMLElement} element
   * @returns {*}
   */

  offset: function offset(element, prop) {

    var rect = element.getBoundingClientRect();

    var offs = {
      top: Math.round(rect.top),
      right: Math.round(rect.right),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left),
      width: rect.width ? Math.round(rect.width) : Math.round(element.offsWidth),
      height: rect.height ? Math.round(rect.height) : Math.round(element.offsHeight)
    };

    //fallback to css width and height
    if (offs.width <= 0) {
      offs.width = parseFloat(this._getComputedStyle(element, 'width'));
    }
    if (offs.height <= 0) {
      offs.height = parseFloat(this._getComputedStyle(element, 'height'));
    }

    if (prop) {
      return offs[prop];
    } else {
      return offs;
    }
  },

  /**
   * Gets element's computed style
   * @param {string} prop
   * @returns {*}
   * @private
   */
  _getComputedStyle: function _getComputedStyle(element, prop) {

    var computedStyle;

    if (typeof window.getComputedStyle === 'function') {
      //normal browsers
      computedStyle = window.getComputedStyle(element);
    } else if (_typeof(document.currentStyle) !== undefined) {
      //other browsers
      computedStyle = element.currentStyle;
    } else {
      computedStyle = element.style;
    }

    if (prop) {
      return computedStyle[prop];
    } else {
      return computedStyle;
    }
  }
};

},{}],47:[function(require,module,exports){
'use strict';

var _defer = require('./defer');

var _defer2 = _interopRequireDefault(_defer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slice = Array.prototype.slice;

/**
 * Emitter abstract class for managing and emitting events.
 * @class
 * @credits Valerio Proietti
 * @see https://github.com/kamicane/prime/blob/master/emitter.js
 */
var Emitter = {

  // constructor(stoppable) {
  //   //if (new.target === Emitter) throw TypeError("new of abstract class Emitter");

  //   this._stoppable = stoppable;

  //   return this;
  // },

  /**
   * [on description]
   * @param  {string}   event [description]
   * @param  {Function} fn    [description]
   * @return {Object} Thia class instance
   */

  on: function on(event, fn) {
    var listeners = this._listeners || (this._listeners = {});
    var events = listeners[event] || (listeners[event] = []);

    if (events.indexOf(fn) === -1) events.push(fn);

    return this;
  },

  /**
   * [off description]
   * @param  {string}   event [description]
   * @param  {Function} fn    [description]
   * @return {}         [description]
   */
  off: function off(event, fn) {
    var listeners = this._listeners,
        events = undefined;

    if (listeners && (events = listeners[event])) {

      var io = events.indexOf(fn);
      if (io > -1) events.splice(io, 1);
      if (!events.length) delete listeners[event];
      for (var l in listeners) {
        return this;
      }
      delete this._listeners;
    }
    return this;
  },

  /**
   * [emit description]
   * @param  {string} event The event name
   * @return {Object} this
   */
  emit: function emit(event) {
    var self = this;
    var args = slice.call(arguments, 1);

    //console.log('emit', event);

    var fire = function fire() {
      //console.log('self', self);
      var listeners = self._listeners;
      var events;
      if (listeners && (events = listeners[event])) {
        events.slice(0).forEach(function (event) {
          var result = event.apply(self, args);
          if (self._stoppable) return result;
        });
      }
    };

    if (args[args.length - 1] === Emitter.EMIT_SYNC) {
      args.pop();
      fire();
    } else {
      (0, _defer2.default)(fire);
    }

    return this;
  }
};

Emitter.EMIT_SYNC = {};

module.exports = Emitter;

},{"./defer":43}],48:[function(require,module,exports){
'use strict';
/**
 * Mediator Object
 * @module mediator
 * @author Jerome Vial, Bruno Santos
 * @see heavily inspired https://carldanley.com/js-mediator-pattern/
 */

module.exports = {

  /**
   * [sunscribe description]
   * @param  {[type]}   topic    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */

  subscribe: function subscribe(topic, callback) {
    this._topics = this._topics || {};

    //_log.debug('subscribe', topic);
    if (!this._topics.hasOwnProperty(topic)) {
      this._topics[topic] = [];
    }

    this._topics[topic].push(callback);
    return true;
  },

  /**
   * [unsunscribe description]
   * @param  {[type]}   topic    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  unsunscribe: function unsunscribe(topic, callback) {
    this._topics = this._topics || {};
    //_log.debug('unsubscribe', topic);
    if (!this._topics.hasOwnProperty(topic)) {
      return false;
    }

    for (var i = 0, len = this._topics[topic].length; i < len; i++) {
      if (this._topics[topic][i] === callback) {
        this._topics[topic].splice(i, 1);
        return true;
      }
    }

    return false;
  },

  /**
   * [publish description]
   * @return {[type]} [description]
   */
  publish: function publish() {
    this._topics = this._topics || {};

    var args = Array.prototype.slice.call(arguments);
    var topic = args.shift();
    //_log.debug('publish', topic);
    if (!this._topics.hasOwnProperty(topic)) {
      return false;
    }

    for (var i = 0, len = this._topics[topic].length; i < len; i++) {
      this._topics[topic][i].apply(undefined, args);
    }
    return true;
  }
};

},{}],49:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = factory();
  } else {
    root.deepmerge = factory();
  }
})(undefined, function () {

  function isMergeableObject(val) {
    var nonNullObject = val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';

    return nonNullObject && Object.prototype.toString.call(val) !== '[object RegExp]' && Object.prototype.toString.call(val) !== '[object Date]';
  }

  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }

  function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
  }

  function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function (e, i) {
      if (typeof destination[i] === 'undefined') {
        destination[i] = cloneIfNecessary(e, optionsArgument);
      } else if (isMergeableObject(e)) {
        destination[i] = deepmerge(target[i], e, optionsArgument);
      } else if (target.indexOf(e) === -1) {
        destination.push(cloneIfNecessary(e, optionsArgument));
      }
    });
    return destination;
  }

  function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
      Object.keys(target).forEach(function (key) {
        destination[key] = cloneIfNecessary(target[key], optionsArgument);
      });
    }
    Object.keys(source).forEach(function (key) {
      if (!isMergeableObject(source[key]) || !target[key]) {
        destination[key] = cloneIfNecessary(source[key], optionsArgument);
      } else {
        destination[key] = deepmerge(target[key], source[key], optionsArgument);
      }
    });
    return destination;
  }

  function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
      return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument);
    } else {
      return mergeObject(target, source, optionsArgument);
    }
  }

  deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
      throw new Error('first argument should be an array with at least two elements');
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function (prev, next) {
      return deepmerge(prev, next, optionsArgument);
    });
  };

  return deepmerge;
});

},{}],50:[function(require,module,exports){
'use strict';

/**
 * Utility functions
 * @module module/utils
 */

/**
 * Checks if given value is an array
 * @param {*} object
 * @returns {boolean}
 * @private
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _isArray(object) {
  return Object.prototype.toString.call(object) === '[object Array]';
}

/**
 * Checks if javascript object is plain object
 * @param {Object} object
 * @returns {*|boolean}
 * @private
 */
function _isLiteralObject(object) {
  return object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === "object" && Object.getPrototypeOf(object) === Object.getPrototypeOf({});
}

/**
 * Checks if object is iterable
 * @param {Object} object
 * @returns {boolean}
 * @private
 */
function _isIterable(object) {
  var r = _isLiteralObject(object) || _isArray(object) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.length !== undefined;

  return r;
}

/**
 *
 * @param {Object} object
 * @param {Function} callback
 * @private
 */
function _each(object, callback) {
  if (_isArray(object) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.length !== undefined) {
    for (var i = 0, l = object.length; i < l; i++) {
      callback.apply(object[i], [object[i], i]);
    }
    return;
  }

  if (_isLiteralObject(object)) {
    for (var key in object) {
      callback.apply(object[key], [object[key], key]);
    }
  }
}

/**
 * Array.indexOf support
 * @param {Array} array
 * @param {*} obj
 * @returns {number}
 * @private
 */
function _indexOf(array, obj) {
  if (Array.prototype.indexOf) {
    return Array.prototype.indexOf.call(array, obj);
  }
  for (var i = 0, j = array.length; i < j; i++) {
    if (array[i] === obj) {
      return i;
    }
  }
  return -1;
}

exports._isArray = _isArray;
exports._isIterable = _isIterable;
exports._isLiteralObject = _isLiteralObject;
exports._each = _each;
exports._indexOf = _indexOf;

},{}],51:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _options = require('./view/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Dragging from './view/dragging';
//import Loader from './view/loader';
//import Limit from './view/limit';
//import Scroll from './view/scroll';
//import LayoutView from './view/layout';
//import Toolbar from './toolbar/toolbar';
//import Zoom from './view/zoom';

//import viewCtrl from './view/ctrl',

/**
 * View
 * class
 * @param {Object} Default options for view
 * @since 0.0.4
 */

var View = (function (_Container) {
  _inherits(View, _Container);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(View).apply(this, arguments));
  }

  _createClass(View, [{
    key: 'init',

    // mixin: [Emitter, Options, binding,
    // 	Toolbar,
    // 	ctrl,
    // 	Dragging,
    // 	Limit,
    // 	Loader,
    // 	Scroll,
    // 	LayoutView,
    // 	Scrolling,
    // 	Zoom
    // ],

    /**
     * Initialize
     *
     * @param {Object} options The class options
     * @return {Object} The class instance
     * @private
     */
    value: function init(options) {
      _get(Object.getPrototypeOf(View.prototype), 'init', this).call(this, options);

      this.name = 'view';

      this.options = [this.options, _options2.default, options].reduce(Object.assign, {});
      this.container = this.options.container;

      this.index = 0;
      this.views = [];

      this.emit('ready');

      return this;
    }

    /**
     * Build
     *
     * @return {void}
     * @private
     * 
     */

  }, {
    key: 'build',
    value: function build() {
      _get(Object.getPrototypeOf(View.prototype), 'build', this).call(this);

      // if (opts.toolbar)
      // 	this._initToolbar(opts.toolbar);

      // if ( opts.resizable )
      // 	this._initResizer();

      this.emit('built');

      return this;
    }

    /**
     * Clear the content of the view
     * @return {Object} This class instance
     */

  }, {
    key: 'clear',
    value: function clear() {
      if (this.content && this.content.empty) {
        this.content.empty();
      }
    }

    /**
     * Close
     * @return {Object} This class instance
     * @private
     */

  }, {
    key: 'close',
    value: function close() {
      this.container.close();

      return this;
    }
  }]);

  return View;
})(_container2.default);

module.exports = View;

},{"./container":29,"./view/options":52}],52:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'view',
  prefix: 'ui',
  tag: 'div',
  component: ['body']
};

},{}],53:[function(require,module,exports){
/*!
  * Morpheus - A Brilliant Animator
  * https://github.com/ded/morpheus - (c) Dustin Diaz 2011
  * License MIT
  */
!function (name, definition) {
  if (typeof define == 'function') define(definition)
  else if (typeof module != 'undefined') module.exports = definition()
  else this[name] = definition()
}('morpheus', function () {

  var doc = document
    , win = window
    , perf = win.performance
    , perfNow = perf && (perf.now || perf.webkitNow || perf.msNow || perf.mozNow)
    , now = perfNow ? function () { return perfNow.call(perf) } : function () { return +new Date() }
    , fixTs = false // feature detected below
    , html = doc.documentElement
    , thousand = 1000
    , rgbOhex = /^rgb\(|#/
    , relVal = /^([+\-])=([\d\.]+)/
    , numUnit = /^(?:[\+\-]=?)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/
    , rotate = /rotate\(((?:[+\-]=)?([\-\d\.]+))deg\)/
    , scale = /scale\(((?:[+\-]=)?([\d\.]+))\)/
    , skew = /skew\(((?:[+\-]=)?([\-\d\.]+))deg, ?((?:[+\-]=)?([\-\d\.]+))deg\)/
    , translate = /translate\(((?:[+\-]=)?([\-\d\.]+))px, ?((?:[+\-]=)?([\-\d\.]+))px\)/
      // these elements do not require 'px'
    , unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1, transform: 1}

  // which property name does this browser use for transform
  var transform = function () {
    var styles = doc.createElement('a').style
      , props = ['webkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'Transform']
      , i
    for (i = 0; i < props.length; i++) {
      if (props[i] in styles) return props[i]
    }
  }()

  // does this browser support the opacity property?
  var opasity = function () {
    return typeof doc.createElement('a').style.opacity !== 'undefined'
  }()

  // initial style is determined by the elements themselves
  var getStyle = doc.defaultView && doc.defaultView.getComputedStyle ?
    function (el, property) {
      property = property == 'transform' ? transform : property
      property = camelize(property)
      var value = null
        , computed = doc.defaultView.getComputedStyle(el, '')
      computed && (value = computed[property])
      return el.style[property] || value
    } : html.currentStyle ?

    function (el, property) {
      property = camelize(property)

      if (property == 'opacity') {
        var val = 100
        try {
          val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity
        } catch (e1) {
          try {
            val = el.filters('alpha').opacity
          } catch (e2) {}
        }
        return val / 100
      }
      var value = el.currentStyle ? el.currentStyle[property] : null
      return el.style[property] || value
    } :
    function (el, property) {
      return el.style[camelize(property)]
    }

  var frame = function () {
    // native animation frames
    // http://webstuff.nfshost.com/anim-timing/Overview.html
    // http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
    return win.requestAnimationFrame  ||
      win.webkitRequestAnimationFrame ||
      win.mozRequestAnimationFrame    ||
      win.msRequestAnimationFrame     ||
      win.oRequestAnimationFrame      ||
      function (callback) {
        win.setTimeout(function () {
          callback(+new Date())
        }, 17) // when I was 17..
      }
  }()

  frame(function(timestamp) {
    // feature-detect if rAF and now() are of the same scale (epoch or high-res),
    // if not, we have to do a timestamp fix on each frame
    fixTs = timestamp > 1e12 != now() > 1e12
  })

  var children = []

  function has(array, elem, i) {
    if (Array.prototype.indexOf) return array.indexOf(elem)
    for (i = 0; i < array.length; ++i) {
      if (array[i] === elem) return i
    }
  }

  function render(timestamp) {
    var i, count = children.length
    if (fixTs) timestamp = now()
    for (i = count; i--;) {
      children[i](timestamp)
    }
    children.length && frame(render)
  }

  function live(f) {
    if (children.push(f) === 1) frame(render)
  }

  function die(f) {
    var rest, index = has(children, f)
    if (index >= 0) {
      rest = children.slice(index + 1)
      children.length = index
      children = children.concat(rest)
    }
  }

  function parseTransform(style, base) {
    var values = {}, m
    if (m = style.match(rotate)) values.rotate = by(m[1], base ? base.rotate : null)
    if (m = style.match(scale)) values.scale = by(m[1], base ? base.scale : null)
    if (m = style.match(skew)) {values.skewx = by(m[1], base ? base.skewx : null); values.skewy = by(m[3], base ? base.skewy : null)}
    if (m = style.match(translate)) {values.translatex = by(m[1], base ? base.translatex : null); values.translatey = by(m[3], base ? base.translatey : null)}
    return values
  }

  function formatTransform(v) {
    var s = ''
    if ('rotate' in v) s += 'rotate(' + v.rotate + 'deg) '
    if ('scale' in v) s += 'scale(' + v.scale + ') '
    if ('translatex' in v) s += 'translate(' + v.translatex + 'px,' + v.translatey + 'px) '
    if ('skewx' in v) s += 'skew(' + v.skewx + 'deg,' + v.skewy + 'deg)'
    return s
  }

  function rgb(r, g, b) {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
  }

  // convert rgb and short hex to long hex
  function toHex(c) {
    var m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    return (m ? rgb(m[1], m[2], m[3]) : c)
      .replace(/#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3') // short skirt to long jacket
  }

  // change font-size => fontSize etc.
  function camelize(s) {
    return s.replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase()
    })
  }

  // aren't we having it?
  function fun(f) {
    return typeof f == 'function'
  }

  function nativeTween(t) {
    // default to a pleasant-to-the-eye easeOut (like native animations)
    return Math.sin(t * Math.PI / 2)
  }

  /**
    * Core tween method that requests each frame
    * @param duration: time in milliseconds. defaults to 1000
    * @param fn: tween frame callback function receiving 'position'
    * @param done {optional}: complete callback function
    * @param ease {optional}: easing method. defaults to easeOut
    * @param from {optional}: integer to start from
    * @param to {optional}: integer to end at
    * @returns method to stop the animation
    */
  function tween(duration, fn, done, ease, from, to) {
    ease = fun(ease) ? ease : morpheus.easings[ease] || nativeTween
    var time = duration || thousand
      , self = this
      , diff = to - from
      , start = now()
      , stop = 0
      , end = 0

    function run(t) {
      var delta = t - start
      if (delta > time || stop) {
        to = isFinite(to) ? to : 1
        stop ? end && fn(to) : fn(to)
        die(run)
        return done && done.apply(self)
      }
      // if you don't specify a 'to' you can use tween as a generic delta tweener
      // cool, eh?
      isFinite(to) ?
        fn((diff * ease(delta / time)) + from) :
        fn(ease(delta / time))
    }

    live(run)

    return {
      stop: function (jump) {
        stop = 1
        end = jump // jump to end of animation?
        if (!jump) done = null // remove callback if not jumping to end
      }
    }
  }

  /**
    * generic bezier method for animating x|y coordinates
    * minimum of 2 points required (start and end).
    * first point start, last point end
    * additional control points are optional (but why else would you use this anyway ;)
    * @param points: array containing control points
       [[0, 0], [100, 200], [200, 100]]
    * @param pos: current be(tween) position represented as float  0 - 1
    * @return [x, y]
    */
  function bezier(points, pos) {
    var n = points.length, r = [], i, j
    for (i = 0; i < n; ++i) {
      r[i] = [points[i][0], points[i][1]]
    }
    for (j = 1; j < n; ++j) {
      for (i = 0; i < n - j; ++i) {
        r[i][0] = (1 - pos) * r[i][0] + pos * r[parseInt(i + 1, 10)][0]
        r[i][1] = (1 - pos) * r[i][1] + pos * r[parseInt(i + 1, 10)][1]
      }
    }
    return [r[0][0], r[0][1]]
  }

  // this gets you the next hex in line according to a 'position'
  function nextColor(pos, start, finish) {
    var r = [], i, e, from, to
    for (i = 0; i < 6; i++) {
      from = Math.min(15, parseInt(start.charAt(i),  16))
      to   = Math.min(15, parseInt(finish.charAt(i), 16))
      e = Math.floor((to - from) * pos + from)
      e = e > 15 ? 15 : e < 0 ? 0 : e
      r[i] = e.toString(16)
    }
    return '#' + r.join('')
  }

  // this retreives the frame value within a sequence
  function getTweenVal(pos, units, begin, end, k, i, v) {
    if (k == 'transform') {
      v = {}
      for (var t in begin[i][k]) {
        v[t] = (t in end[i][k]) ? Math.round(((end[i][k][t] - begin[i][k][t]) * pos + begin[i][k][t]) * thousand) / thousand : begin[i][k][t]
      }
      return v
    } else if (typeof begin[i][k] == 'string') {
      return nextColor(pos, begin[i][k], end[i][k])
    } else {
      // round so we don't get crazy long floats
      v = Math.round(((end[i][k] - begin[i][k]) * pos + begin[i][k]) * thousand) / thousand
      // some css properties don't require a unit (like zIndex, lineHeight, opacity)
      if (!(k in unitless)) v += units[i][k] || 'px'
      return v
    }
  }

  // support for relative movement via '+=n' or '-=n'
  function by(val, start, m, r, i) {
    return (m = relVal.exec(val)) ?
      (i = parseFloat(m[2])) && (start + (m[1] == '+' ? 1 : -1) * i) :
      parseFloat(val)
  }

  /**
    * morpheus:
    * @param element(s): HTMLElement(s)
    * @param options: mixed bag between CSS Style properties & animation options
    *  - {n} CSS properties|values
    *     - value can be strings, integers,
    *     - or callback function that receives element to be animated. method must return value to be tweened
    *     - relative animations start with += or -= followed by integer
    *  - duration: time in ms - defaults to 1000(ms)
    *  - easing: a transition method - defaults to an 'easeOut' algorithm
    *  - complete: a callback method for when all elements have finished
    *  - bezier: array of arrays containing x|y coordinates that define the bezier points. defaults to none
    *     - this may also be a function that receives element to be animated. it must return a value
    */
  function morpheus(elements, options) {
    var els = elements ? (els = isFinite(elements.length) ? elements : [elements]) : [], i
      , complete = options.complete
      , duration = options.duration
      , ease = options.easing
      , points = options.bezier
      , begin = []
      , end = []
      , units = []
      , bez = []
      , originalLeft
      , originalTop

    if (points) {
      // remember the original values for top|left
      originalLeft = options.left;
      originalTop = options.top;
      delete options.right;
      delete options.bottom;
      delete options.left;
      delete options.top;
    }

    for (i = els.length; i--;) {

      // record beginning and end states to calculate positions
      begin[i] = {}
      end[i] = {}
      units[i] = {}

      // are we 'moving'?
      if (points) {

        var left = getStyle(els[i], 'left')
          , top = getStyle(els[i], 'top')
          , xy = [by(fun(originalLeft) ? originalLeft(els[i]) : originalLeft || 0, parseFloat(left)),
                  by(fun(originalTop) ? originalTop(els[i]) : originalTop || 0, parseFloat(top))]

        bez[i] = fun(points) ? points(els[i], xy) : points
        bez[i].push(xy)
        bez[i].unshift([
          parseInt(left, 10),
          parseInt(top, 10)
        ])
      }

      for (var k in options) {
        switch (k) {
        case 'complete':
        case 'duration':
        case 'easing':
        case 'bezier':
          continue
        }
        var v = getStyle(els[i], k), unit
          , tmp = fun(options[k]) ? options[k](els[i]) : options[k]
        if (typeof tmp == 'string' &&
            rgbOhex.test(tmp) &&
            !rgbOhex.test(v)) {
          delete options[k]; // remove key :(
          continue; // cannot animate colors like 'orange' or 'transparent'
                    // only #xxx, #xxxxxx, rgb(n,n,n)
        }

        begin[i][k] = k == 'transform' ? parseTransform(v) :
          typeof tmp == 'string' && rgbOhex.test(tmp) ?
            toHex(v).slice(1) :
            parseFloat(v)
        end[i][k] = k == 'transform' ? parseTransform(tmp, begin[i][k]) :
          typeof tmp == 'string' && tmp.charAt(0) == '#' ?
            toHex(tmp).slice(1) :
            by(tmp, parseFloat(v));
        // record original unit
        (typeof tmp == 'string') && (unit = tmp.match(numUnit)) && (units[i][k] = unit[1])
      }
    }
    // ONE TWEEN TO RULE THEM ALL
    return tween.apply(els, [duration, function (pos, v, xy) {
      // normally not a fan of optimizing for() loops, but we want something
      // fast for animating
      for (i = els.length; i--;) {
        if (points) {
          xy = bezier(bez[i], pos)
          els[i].style.left = xy[0] + 'px'
          els[i].style.top = xy[1] + 'px'
        }
        for (var k in options) {
          v = getTweenVal(pos, units, begin, end, k, i)
          k == 'transform' ?
            els[i].style[transform] = formatTransform(v) :
            k == 'opacity' && !opasity ?
              (els[i].style.filter = 'alpha(opacity=' + (v * 100) + ')') :
              (els[i].style[camelize(k)] = v)
        }
      }
    }, complete, ease])
  }

  // expose useful methods
  morpheus.tween = tween
  morpheus.getStyle = getStyle
  morpheus.bezier = bezier
  morpheus.transform = transform
  morpheus.parseTransform = parseTransform
  morpheus.formatTransform = formatTransform
  morpheus.animationFrame = frame
  morpheus.easings = {}

  return morpheus

});

},{}],54:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
// element related modules

// dependencies

var _emitter = require('./module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _controller = require('./component/controller');

var _controller2 = _interopRequireDefault(_controller);

var _bind = require('./module/bind');

var _bind2 = _interopRequireDefault(_bind);

var _merge = require('./module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _element = require('./component/element');

var _element2 = _interopRequireDefault(_element);

var _attribute = require('./component/attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _classify = require('./component/classify');

var _classify2 = _interopRequireDefault(_classify);

var _events = require('./component/events');

var _events2 = _interopRequireDefault(_events);

var _style = require('./component/style');

var _style2 = _interopRequireDefault(_style);

var _dom = require('./module/dom');

var _dom2 = _interopRequireDefault(_dom);

var _storage = require('./component/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// options
var defaults = require('./component/options');

/**
 * Base class for all ui components
 * @class
 * @namespace Material
 * @param {Object} options - The component options
 * @return {Object} The class Instance
 */
module.exports = (function () {

  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance 
   */

  function Component(options) {
    _classCallCheck(this, Component);

    //super();

    //this.emit('init');
    //this.options = merge(defaults, options);

    this.init(options);
    this.build();

    if (this.options.bind) {
      this.bind(this.options.bind);
    }

    return this;
  }

  /**
   * Initialized component
   * @return {Object} The class instance
   */

  _createClass(Component, [{
    key: 'init',
    value: function init(options) {
      this._name = this.constructor.name.toLowerCase();

      options = options || this.options;
      //this.options = [defaults, options].reduce(Object.assign, {});
      //
      options = options || {};
      this.options = (0, _merge2.default)(defaults, options);

      this.name = this.options.name;

      // merge options

      // implement module
      Object.assign(this, _emitter2.default, _storage2.default, _events2.default, _classify2.default, _style2.default, _attribute2.default, _bind2.default);

      this.document = window.document;

      this.controller = new _controller2.default();

      return this;
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {

      console.log(this.options, options);

      Object.assign(this.options, [defaults, options].reduce(Object.assign, {}));
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {

      return this.options;
    }

    /**
     * Build Method
     * @return {Object} This class instance
     */

  }, {
    key: 'build',
    value: function build() {
      var opts = this.options;

      this.emit('create');

      var tag = opts.tag || 'div';
      this.element = _element2.default.createElement(tag);

      this.initAttributes();
      this.setState(this.options.state);
      this.classify(this._name, this.options);

      this.emit('created');

      if (this.options.layout) {
        console.log('layout', this.options.layout);
        this.options.layout.container = this.element;

        this.layout = new _layout2.default(this.options.layout);
      } else if (this.options.components) {
        this.buildComponents();
      }

      this.content = _element2.default;

      // insert if container options is given
      if (opts.container) {
        //console.log(this.name, opts.container);
        this.insert(opts.container);
      }

      this.controller.register(this);

      return this;
    }

    /**
     * build component inner components
     * @return {[type]} [description]
     */

  }, {
    key: 'buildComponents',
    value: function buildComponents() {

      //console.log('buildComponents', this._name);

      this.component = {};
      this.components = [];

      var opts = this.options.components;

      for (var i = 0; i < opts.length; i++) {
        var options = opts[i];
        this.addComponent(options);
      }
    }
    /**
     * Add inner component
     * @param {optios} options Inner compoonent options
     */

  }, {
    key: 'addComponent',
    value: function addComponent(options) {
      var idx = this.identifyComponent(options);
      var properties = options.props || options.properties || {};

      properties.tag = options.tag;

      //console.log('prop', idx, properties, this.element);

      var component = this.component[idx] = new Component(properties);
      component.insert(this.element);

      this.components.push(component);
    }

    /**
     * Give the inner comenent a unique identifier based on the tag
     * if it already existe, it add an index. For example input, input2
     * this can be overrided using idx or ident
     * @param  {options} options [description]
     * @return {idx}         The given idx
     */

  }, {
    key: 'identifyComponent',
    value: function identifyComponent(options) {
      var tags = options.tag.split(/\./);
      var tag = tags[0];

      var identity = options.idx || options.ident || options.identity || tag;

      var index = 0;
      var idx = identity;

      while (this.component[idx]) {
        index++;
        idx = identity + index;
      }

      return idx;
    }

    /**
     * Inject method insert element to the domtree using Dom methods
     * @param {HTMLElement} container [description]
     * @param  {string} context - Injection context
     * @return {Object} This class intance
     */

  }, {
    key: 'insert',
    value: function insert(container, context) {

      this.emit('insert');
      this.container = container;

      if (container && container.element) {
        container = container.element;
      } else if (container instanceof HTMLElement) {
        container = container;
      } else {
        throw new Error("Can't insert " + container + " is not a HTMLElement object");
      }

      context = context || 'bottom';

      var contexts = ['top', 'bottom', 'after', 'before'];
      var methods = ['prepend', 'append', 'after', 'before'];

      var index = contexts.indexOf(context);
      if (index === -1) {
        return;
      }

      var method = methods[index];

      this.emit('insert');

      // insert component element to the dom tree using Dom
      _dom2.default[method](container, this.element);

      this.isInjected = true;
      this.emit('injected');
      return this;
    }

    /**
     * [show description]
     * @return {Object} The class instance
     */

  }, {
    key: 'show',
    value: function show() {
      this.emit('show');
      this.element.show();

      return this;
    }

    /**
     * [hide description]
     * @return {Object} The class instance
     */

  }, {
    key: 'hide',
    value: function hide() {
      this.emit('hide');
      this.element.hide();

      return this;
    }

    /**
     * [dispose description]
     * @return {Object} The class instance
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      var el = this.element;
      return el.parentNode ? el.parentNode.removeChild(el) : el;
    }

    /**
     * empty
     * @return {void}
     */

  }, {
    key: 'empty',
    value: function empty() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }

    /**
     * [destroy description]
     * @return {Object} this class
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.element.parentNode.removeChild(this.element);

      return this;
    }
  }]);

  return Component;
})();

},{"./component/attribute":56,"./component/classify":57,"./component/controller":58,"./component/element":59,"./component/events":60,"./component/options":62,"./component/storage":64,"./component/style":65,"./layout":80,"./module/bind":87,"./module/dom":91,"./module/emitter":93,"./module/merge":95}],55:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"./component/attribute":56,"./component/classify":57,"./component/controller":58,"./component/element":59,"./component/events":60,"./component/options":62,"./component/storage":64,"./component/style":65,"./layout":80,"./module/bind":87,"./module/dom":91,"./module/emitter":93,"./module/merge":95,"dup":18}],56:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],57:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],58:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"../module/cookies":88,"../module/mediator":94,"../module/merge":95,"dup":21}],59:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],60:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],61:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"../module/dom":91,"dup":24}],62:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],63:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"../component":55,"dup":26,"morpheus":53}],64:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"dup":27}],65:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"../module/utils":96,"dup":28}],66:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"./component":55,"./container/display":67,"./container/options":68,"dup":29}],67:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30,"morpheus":53}],68:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"dup":31}],69:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],70:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"../component":55,"../component/ripple":63,"../control":69,"dup":33}],71:[function(require,module,exports){
'use strict';

// base class

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// modules

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

var _text = require('../text');

var _text2 = _interopRequireDefault(_text);

var _image = require('../image');

var _image2 = _interopRequireDefault(_image);

var _classify = require('../component/classify');

var _classify2 = _interopRequireDefault(_classify);

var _merge = require('../module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

var _ripple = require('../component/ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  base: 'ui',
  type: 'control', // push, file
  tag: 'span',
  layout: {
    axis: 'x',
    sections: [{
      component: _text2.default,
      name: 'text',
      type: 'button'
    }, {
      component: _image2.default,
      name: 'icon',
      code: 'mdi-content-inbox'
    }]
  },
  // components: [{
  //   tag: 'label.ui-text'
  // }],
  // ripple: {
  //   duration: '300',
  //   equation: 'ease-out'
  // },
  bind: {
    'click': '_onClick',
    'mousedown': ['_onMouseDown', '_showRipple'],
    'mouseup': ['_onMouseUp', '_hideRipple'],
    'mouseout': ['_onMouseOut', '_hideRipple']
  }
};

/**
 * Button control class
 * @class
 * @extends Control
 * @since 0.0.1
 * @example
 * var button = new Button({
 *   label: 'Primary raised button',
 *   type: 'raised',
 *   primary: true
 * }).on('press', function(e) {
 *   console.log('button press', e);
 * }).insert(document.body);
 */

var Button = (function () {

  /**
   * The init method of the Button class
   * @param  {Object} options [description]
   * @private
   * @return {Object} The class instance
   */

  function Button(options) {
    _classCallCheck(this, Button);

    console.log('constructor options', options);

    this.options = (0, _merge2.default)(defaults, options);
    console.log('this.options', this.options);

    this.init();
    this.build();

    // if (this.options.bind) {
    //   this.bind(this.options.bind);
    // }

    return this;
  }

  _createClass(Button, [{
    key: 'init',
    value: function init(options) {

      options = options || this.options;

      Object.assign(this, _classify2.default);
      Object.assign(this, _control2.default);
      Object.assign(this, _ripple2.default);
      this._name = this.constructor.name.toLowerCase();
    }

    /**
     * Build button's method
     * @override
     * @return {void}
     */

  }, {
    key: 'build',
    value: function build(options) {
      options = options || this.options;

      this._component = new _component2.default(options);

      this.element = this._component.element;

      this._component.addClass(this.options.prefix + '-' + this._name);
    }

    /**
     * [_onElementMouseDown description]
     * @param  {event} e
     * @return {void}
     */

  }, {
    key: 'press',
    value: function press(e) {
      e.preventDefault();

      if (this.state === 'disabled') return;

      this.emit('press', e);

      return this;
    }
  }, {
    key: 'on',
    value: function on(name, cb) {
      return this._component.on(name, cb);
    }
  }, {
    key: 'insert',
    value: function insert(container, context, debug) {
      this._component.insert(container, context, debug);
    }
  }, {
    key: 'style',
    value: function style(_style) {
      this._component.style(_style);
    }

    /**
     * _onClick
     * @param  {Event} e The related event
     */

  }, {
    key: '_onClick',
    value: function _onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      this.press(e);
    }

    /**
     * _onMouseDown description
     * @param  {Event} e The related event
     */

  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(e) {
      //console.log('_onMouseDown');
      e.preventDefault();
      e.stopPropagation();
      this.addClass('is-active');
    }

    /**
     * _onMouseDown description
     * @param  {Event} e The related event
     */

  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(e) {
      //console.log('_onMouseUp');
      // e.preventDefault();
      // e.stopPropagation();

      this.removeClass('is-active');
    }

    /**
     * _onMouseDown description
     * @param  {Event} e The related event
     */

  }, {
    key: '_onMouseOut',
    value: function _onMouseOut(e) {
      e.preventDefault();
      e.stopPropagation();
      this.removeClass('is-active');
    }
  }]);

  return Button;
})();

module.exports = Button;

},{"../component":55,"../component/classify":57,"../component/ripple":63,"../control":69,"../image":79,"../module/merge":95,"../text":97}],72:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _control = require('../control');

var _control2 = _interopRequireDefault(_control);

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  prefix: 'material',
  type: 'control',
  label: null,
  checked: false,
  error: false,
  value: false,
  components: [{
    tag: 'input',
    props: {
      type: 'checkbox'
    }
  }, {
    ident: 'control',
    tag: 'span.checkbox-control'
  }, {
    tag: 'label.checkbox-label'
  }],
  bind: {
    'component.control.click': 'toggle',
    'component.label.click': 'toggle',

    // for accessibility purpose
    'component.input.click': 'toggle',
    'component.input.focus': '_onInputFocus',
    'component.input.blur': '_onInputBlur'
  }
};

/**
 * Checkbox control class
 * @class
 * @extends Control
 * @since 0.0.1
 * @example
 * var button = new Button({
 *   label: 'Primary raised button',
 *   type: 'raised',
 *   primary: true
 * }).on('press', function(e) {
 *   console.log('button press', e);
 * }).insert(document.body);
 */

var Checkbox = (function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: 'init',

    /**
     * Constructor
     * @param  {Object} options The class options
     * @return {Object} This class instance
     */
    value: function init(options) {
      _get(Object.getPrototypeOf(Checkbox.prototype), 'init', this).call(this, options);
      this.options = [defaults, options].reduce(Object.assign, {});

      this.name = this.options.name;
      this.value = this.options.value;

      Object.assign(this, _control2.default);

      return this;
    }

    /**
     * build the component using the super method
     * @return {Object} The class instance
     */

  }, {
    key: 'build',
    value: function build() {
      _get(Object.getPrototypeOf(Checkbox.prototype), 'build', this).call(this);

      //console.log('options', this.options);

      this.setLabel();

      if (disabled) {}

      if (this.value) {
        this.component.input.setAttribute('checked', 'checked');
      }

      var disabled = this.options.disabled;
      if (this.options.disabled) {
        this.component.input.setAttribute('disabled', 'disabled');
        this.addClass('is-disabled');
      }

      this.setValue(this.value);
    }

    /**
     * [_onInputFocus description]
     * @return {[type]} [description]
     */

  }, {
    key: '_onInputFocus',
    value: function _onInputFocus() {
      this.addClass('is-focused');
    }

    /**
     * [_onInputBlur description]
     * @return {[type]} [description]
     */

  }, {
    key: '_onInputBlur',
    value: function _onInputBlur() {
      this.removeClass('is-focused');
    }

    /**
     * Setter
     * @param {string} prop
     * @param {string} value
     * @return {Object} The class instance
     */

  }, {
    key: 'set',
    value: function set(prop, value) {

      switch (prop) {
        case 'value':
          this.setValue(value);
          break;
        case 'label':
          this.setLabel(value);
          break;
        default:
          this.setValue(prop);
      }

      return this;
    }

    /**
     * Set checkbox value
     * @param {boolean} value [description]
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      console.log('setValue', value);
      if (value) {
        this.check();
      } else {
        this.unCheck();
      }
    }

    /**
     * [toggle description]
     * @return {Object} The class instance
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.disabled) return;

      this.component.input.element.focus();

      if (this.value) {
        this.unCheck(true);
      } else {
        this.check();
      }

      return this;
    }

    /**
     * setTrue
     */

  }, {
    key: 'check',
    value: function check() {

      this.value = true;
      this.addClass('is-checked');
      this.component.input.element.checked = true;
      this.emit('change', this.value);
    }

    /**
     * setFlas
     */

  }, {
    key: 'unCheck',
    value: function unCheck() {
      this.value = false;
      this.removeClass('is-checked');
      this.component.input.element.checked = false;
      this.emit('change', this.value);
    }
  }]);

  return Checkbox;
})(_component2.default);

module.exports = Checkbox;

},{"../component":55,"../control":69}],73:[function(require,module,exports){
'use strict';

//import control from '../control';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

var _dragdrop = require('material/dist/vendor/dragdrop');

var _dragdrop2 = _interopRequireDefault(_dragdrop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  // base: 'field',
  prefix: 'material',
  type: 'control',
  label: null,
  checked: false,
  error: false,
  value: false,
  range: [0, 100],
  step: 5,
  components: [{
    tag: 'label.slider-label'
  }, {
    tag: 'input',
    props: {
      type: 'hidden'
    }
  }, {
    ident: 'control',
    tag: 'span.slider-control'
  }]
};

/**
 * Switch class
 * @class
 * @extends Control
 */
// bind: {
//  'control.click': 'toggle',
//  'label.click': 'toggle',
//  // for accessibility purpose
//  //'input.click': 'toggle',
//  'input.focus': '_onInputFocus',
//  'input.blur': '_onInputBlur'
// }

var Slider = (function (_Component) {
  _inherits(Slider, _Component);

  function Slider() {
    _classCallCheck(this, Slider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).apply(this, arguments));
  }

  _createClass(Slider, [{
    key: 'init',

    /**
     * Constructor
     * @param  {Object} options The class options
     * @return {Object} This class instance
     */
    value: function init(options) {
      _get(Object.getPrototypeOf(Slider.prototype), 'init', this).call(this, defaults);
      this.options = [this.options, options].reduce(Object.assign, {});

      this.name = this.options.name;
      this.value = this.options.value;

      return this;
    }

    /**
     * build method
     * @return {Object} The class instance
     */

  }, {
    key: 'build',
    value: function build() {
      _get(Object.getPrototypeOf(Slider.prototype), 'build', this).call(this);

      var text = this.options.label || this.options.text;

      if (this.options.disabled) {
        this.addClass('is-disabled');
      }

      this.options.label = this.options.label || this.options.text;
      this.setLabel(this.options.label);

      this.initInput();
      this.initControl();

      // this.initInput();
      // this.initControl();
      // this.wrapper = new Component({
      //  tag: 'div.switch-wrapper'
      // }).insert(this.element);

      if (this.value) {
        this.check();
      }
    }

    /**
     * Setter
     * @param {string} prop
     * @param {string} value
     */

  }, {
    key: 'set',
    value: function set(prop, value) {

      switch (prop) {
        case 'value':
          this.setValue(value);
          break;
        default:
          this.setValue(prop);

      }

      return this;
    }

    /**
     * Getter
     * @param {string} prop
     * @param {string} value
     */

  }, {
    key: 'get',
    value: function get(prop) {
      var value;

      switch (prop) {
        case 'value':
          value = this.getValue();
          break;
        case 'name':
          value = this.name;
          break;
        default:
          return this.getValue();
      }

      return value;
    }

    /**
     * [getValue description]
     * @return {Object} The class instance
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      console.log('getValue', this);
      return this.component.input.element.value;
    }

    /**
     * [setValue description]
     * @param {string} value [description]
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      //console.log('setValue', value, this.component.input);
      this.component.input.element.value = value;
      this.emit('change', value);
    }

    /**
     * [initControl description]
     * @return {[type]} [description]
     */

  }, {
    key: 'initControl',
    value: function initControl() {
      var _this2 = this;

      this.track = new _component2.default({
        tag: 'span.slider-track'
      }).insert(this.component.control);

      this.trackvalue = new _component2.default({
        tag: 'span.slider-track-value'
      }).insert(this.component.control);

      this.component.control.addEvent('click', function (ev) {
        console.log('clicked at ', ev.layerX);
        var position = ev.layerX - 3;
        _this2.knob.style({
          left: position + 'px'
        });
        _this2.updateControl(position);
      });

      this.knob = new _component2.default({
        tag: 'span.slider-knob'
      }).insert(this.component.control);

      this.vindicator = new _component2.default({
        tag: 'span.slider-vindicator'
      }).insert(this.component.control);

      this.knob.addEvent('click', function (ev) {
        ev.stopPropagation();
      });

      _dragdrop2.default.bind(this.knob.element, {
        //anchor: anotherElement,
        boundingBox: 'offsetParent',
        dragstart: function dragstart(ev) {
          //console.log('dragstart', ev);
          _this2.component.control.addClass('dragging');
        },
        dragend: function dragend() {
          var position = parseInt(_this2.knob.style('left'));
          _this2.component.control.removeClass('dragging');
          _this2.updateControl(position);
        },
        drag: function drag() {
          var position = parseInt(_this2.knob.style('left'));
          _this2.knob.style({
            'top': '2px'
          });
          _this2.updateControl(position);
        }
      });
    }
  }, {
    key: 'updateControl',
    value: function updateControl(position) {

      var size = parseInt(this.track.style('width'));

      if (position > size) {
        position = size;
        this.knob.style({
          left: position + 'px'
        });
      };
      var ratio = size / position;
      var value = Math.round(this.options.range[1] / ratio);

      this.trackvalue.style({
        width: position + 'px'
      });

      this.vindicator.style({
        left: position - 10 + 'px'
      });

      this.vindicator.text(value);

      //console.log('track knob', position, size);

      //console.log('ratio', ratio, Math.round(value));
      this.setValue(value);
      if (value > this.options.range[0]) {
        this.knob.addClass('notnull');
      } else {
        this.knob.removeClass('notnull');
      }
      this.knob.style({
        'top': '2px'
      });
    }

    /**
     * [initInput description]
     * @return {[type]} [description]
     */

  }, {
    key: 'initInput',
    value: function initInput() {
      // this.input = new Component({
      //   tag: 'input',
      //   type: 'checkbox'
      // }).insert(this.element);

      if (this.options.disabled) {
        this.component.input.setAttribute('disabled', 'disabled');
      }

      if (this.value) {
        this.component.input.setAttribute('checked', 'checked');
      }
    }
  }, {
    key: 'setLabel',
    value: function setLabel(text) {
      //console.log('setLabel', this.options);
      text = text || this.options.label || this.options.text;

      if (text !== null && this.component.label) {
        this.component.label.text(text);
      }
    }
  }]);

  return Slider;
})(_component2.default);

module.exports = Slider;

},{"../component":55,"material/dist/vendor/dragdrop":17}],74:[function(require,module,exports){
'use strict';

//import control from '../control';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
// element related modules

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

var _merge = require('../module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _emitter = require('../module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _controller = require('../component/controller');

var _controller2 = _interopRequireDefault(_controller);

var _bind = require('../module/bind');

var _bind2 = _interopRequireDefault(_bind);

var _insert = require('../component/insert');

var _insert2 = _interopRequireDefault(_insert);

var _css = require('../module/css');

var _css2 = _interopRequireDefault(_css);

var _element = require('../component/element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// dependencies
//import attribute from '../component/attribute';
//import classify from '../component/classify';
//import events from '../component/events';

var defaults = {
  // base: 'field',
  prefix: 'material',
  type: 'control',
  label: null,
  checked: false,
  error: false,
  value: false,
  bind: {
    'control.click': 'toggle',
    //'label.click': 'toggle',
    // for accessibility purpose
    'input.focus': '_onInputFocus',
    'input.blur': '_onInputBlur'
  }
};

/**
 * Switch class
 * @class
 * @extends Control
 */

var Switch = (function () {

  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance 
   */

  function Switch(options) {
    _classCallCheck(this, Switch);

    //super();

    //this.emit('init');
    //this.options = merge(defaults, options);

    this.init(options);
    this.build();

    if (this.options.bind) {
      this.bind(this.options.bind);
    }

    return this;
  }

  /**
   * Constructor
   * @param  {Object} options The class options
   * @return {Object} This class instance
   */

  _createClass(Switch, [{
    key: 'init',
    value: function init(options) {

      // init options and merge options to defaults
      options = options || {};
      this.options = (0, _merge2.default)(defaults, options);

      this._name = this.constructor.name.toLowerCase();

      // implement modules
      Object.assign(this, _emitter2.default, _bind2.default, _insert2.default);

      this.document = window.document;

      this.controller = new _controller2.default();
      this.value = this.options.value;

      return this;
    }

    /**
     * build method
     * @return {Object} The class instance
     */

  }, {
    key: 'build',
    value: function build() {

      var tag = this.options.tag || 'div';
      this.element = _element2.default.createElement(tag);

      _css2.default.add(this.element, this.options.prefix + '-' + this._name);

      var text = this.options.label || this.options.text;

      if (this.options.disabled) {
        this.disabled = true;
        _css2.default.add(this.element, 'is-disabled');
      }

      this.initInput();
      this.initControl();
      // this.wrapper = new Component({tag: 'div.switch-wrapper'}).insert(this.element);

      if (this.options.label !== null) {
        this.label = new _component2.default({
          tag: 'span.switch-label'
        }).insert(this.element);
        this.label.text(text);
      }

      if (this.value) {
        this.check();
      }

      // insert if container options is given
      if (this.options.container) {
        //console.log(this.name, opts.container);
        this.insert(this.options.container);
      }
    }

    /**
     * [initControl description]
     * @return {[type]} [description]
     */

  }, {
    key: 'initControl',
    value: function initControl() {
      this.control = new _component2.default({
        tag: 'span.switch-control'
      }).insert(this.element);

      this.track = new _component2.default({
        tag: 'span.switch-track'
      }).insert(this.control);

      this.knob = new _component2.default({
        tag: 'span.switch-knob'
      }).insert(this.track);
    }

    /**
     * [initInput description]
     * @return {[type]} [description]
     */

  }, {
    key: 'initInput',
    value: function initInput() {
      this.input = new _component2.default({
        tag: 'input',
        type: 'checkbox',
        name: this.options.name
      }).insert(this.element);

      if (this.options.disabled) {
        this.input.setAttribute('disabled', 'disabled');
      }

      if (this.value) {
        this.input.setAttribute('checked', 'checked');
      }
    }
  }, {
    key: '_onInputFocus',
    value: function _onInputFocus(e) {}

    /**
     * Setter
     * @param {string} prop
     * @param {string} value
     * @return {Object} The class instance
     */

  }, {
    key: 'set',
    value: function set(prop, value) {

      switch (prop) {
        case 'value':
          this.setValue(value);
          break;
        case 'state':
          if (value === 'enabled') {
            this.enable();
          } else if (value === 'disabled') {
            this.disable();
          }
        default:
          this.setValue(prop);
      }

      return this;
    }
  }, {
    key: 'get',
    value: function get() {
      return this.value;
    }

    /**
     * set switch value
     * @param {boolean} value [description]
     */

  }, {
    key: 'getValue',
    value: function getValue(value) {
      return this.value;
    }

    /**
     * set switch value
     * @param {boolean} value [description]
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (value) {
        this.check();
      } else {
        this.unCheck();
      }
    }

    /**
     * [toggle description]
     * @return {Object} The class instance
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      console.log('toggle');

      if (this.value) {
        this.unCheck(true);
      } else {
        this.check();
      }

      return this;
    }

    /**
     * setTrue
     */

  }, {
    key: 'check',
    value: function check() {
      if (this.disabled) {
        return this;
      }
      this.value = true;
      _css2.default.add(this.element, 'is-checked');
      this.input.element.checked = true;
      this.emit('change', this.value);

      return this;
    }

    /**
     * setFlas
     */

  }, {
    key: 'unCheck',
    value: function unCheck() {
      if (this.disabled) {
        return this;
      }

      this.value = false;
      _css2.default.remove(this.element, 'is-checked');
      this.input.element.checked = false;
      this.emit('change', this.value);

      return this;
    }
  }, {
    key: 'disable',
    value: function disable() {

      this.input.setAttribute('disabled', 'disabled');
      _css2.default.add(this.element, 'is-disabled');
      this.disabled = true;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.input.setAttribute('disabled', null);
      _css2.default.remove(this.element, 'is-disabled');
      this.disabled = false;
    }
  }]);

  return Switch;
})();

module.exports = Switch;

},{"../component":55,"../component/controller":58,"../component/element":59,"../component/insert":61,"../module/bind":87,"../module/css":89,"../module/emitter":93,"../module/merge":95}],75:[function(require,module,exports){
'use strict';

//import control from '../control';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require('../component');

var _component2 = _interopRequireDefault(_component);

var _merge = require('../module/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  name: 'field',
  type: 'control',
  value: null,
  error: true,
  prefix: 'ui',
  tag: 'div',
  attr: ['accesskey', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone', 'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate', 'type'],
  components: [{
    tag: 'label'
  }, {
    tag: 'input',
    props: {
      type: 'text'
    }
  }, {
    idx: 'underline',
    tag: 'span.field-underline'
  }],
  bind: {
    'change': '_onChange',
    'component.input.focus': '_onInputFocus',
    'component.input.blur': '_onInputBlur',
    //'component.input.keypress': '_onInputKeyPress',
    'component.input.keyup': '_onInputKeyPress',
    'component.input.onChange': '_onChange'
  }
};

/**
 * Field class
 * @class
 * @extends {Control}
 */
// 'component.input.keydown': '_onInputKeyPress'

var Field = (function (_Component) {
  _inherits(Field, _Component);

  function Field() {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Field).apply(this, arguments));
  }

  _createClass(Field, [{
    key: 'init',

    /**
     * init
     * @param  {Object} options The class options
     * @return {Object} The class instance
     */
    value: function init(options) {
      _get(Object.getPrototypeOf(Field.prototype), 'init', this).call(this, defaults);
      //console.log('options', this.options);
      //this.options = [this.options, options].reduce(Object.assign, {});
      this.options = (0, _merge2.default)(this.options, options);

      this.name = this.options.name;

      //Object.assign(this, control);

      return this;
    }

    /**
     * [build description]
     * @return {Object} The class instance
     */

  }, {
    key: 'build',
    value: function build() {
      //create a new div as input element
      _get(Object.getPrototypeOf(Field.prototype), 'build', this).call(this);

      var opts = this.options;

      this._initInput();

      this.addClass('ui-field');

      if (this.disabled) {
        this.addClass('is-disabled');
      }

      if (opts.klss) {
        this.addClass(opts.klss);
      }

      if (opts.label !== false) {
        this.setLabel();
      }
      // if (opts.error) {
      //  this.initError();
      // }
    }

    /**
     * Setter
     * @param {string} prop
     * @param {string} value
     */

  }, {
    key: 'set',
    value: function set(prop, value) {

      switch (prop) {
        case 'value':
          this.setValue(value);
          break;
        default:
          this.setValue(prop);

      }

      return this;
    }

    /**
     * [_initLabel description]
     * @return {Object} The class instance
     */

  }, {
    key: 'setLabel',
    value: function setLabel() {
      var label = this.options.label;
      var text;

      if (label === null || label === false) {
        text = '';
      } else if (this.options.label) {
        text = label;
      } else {
        text = this.options.name;
      }

      this.component.label.text(text);
    }

    /**
     * Getter
     * @param {string} prop
     * @param {string} value
     */

  }, {
    key: 'get',
    value: function get(prop) {
      var value;

      switch (prop) {
        case 'value':
          value = this.getValue();
          break;
        case 'name':
          value = this.name;
          break;
        default:
          return this.getValue();
      }

      return value;
    }

    /**
     * [getValue description]
     * @return {Object} The class instance
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      //console.log('getValue', this);
      return this.component.input.element.value;
    }

    /**
     * [setValue description]
     * @param {string} value [description]
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      //console.log('setValue', value, this.component.input);
      //
      this.component.input.element.value = value;

      if (value) {
        this.removeClass('is-empty');
      } else {
        this.addClass('is-empty');
      }

      this.emit('change', value);
    }

    /**
     * [_initInput description]
     * @return {Object} The class instance
     */

  }, {
    key: '_initInput',
    value: function _initInput() {

      if (!this.options.value) {
        this.addClass('is-empty');
      }

      if (this.readonly) {
        this.input.setAttribute('readonly', 'readonly');
        this.input.setAttribute('tabindex', '-1');
      }

      return this.input;
    }

    /**
     * _initUnderline
     * @return {Object} The class instance
     */

  }, {
    key: '_initUnderline',
    value: function _initUnderline() {
      this.underline = new _component2.default({
        tag: 'span.field-underline'
      }).insert(this.element);
    }

    /**
     * error
     * @return {Object} The class instance
     */

  }, {
    key: 'initError',
    value: function initError() {
      this.error = new _component2.default({
        tag: 'span.error-message'
      }).insert(this.element);
    }

    /**
     * [_initName description]
     * @param  {string} name The input name
     */

  }, {
    key: '_initName',
    value: function _initName(name) {
      var opts = this.options;

      if (opts.name) {
        this.input.setAttribute('name', name);
      }
    }

    /**
     * [_initValue description]
     * @return {Object} The class instance
     */

  }, {
    key: '_initValue',
    value: function _initValue() {
      var opts = this.options;

      //create a new div as input element
      if (opts.value) {
        this.setValue(opts.value);
      }
    }

    /**
     * [_onFocus description]
     * @return {Object} The class instance
     */

  }, {
    key: '_onInputFocus',
    value: function _onInputFocus(e) {
      //console.log('_onInputFocus');
      if (this.readonly) return;
      this.setState('focus');
    }

    /**
     * [_onFocus description]
     * @return {Object} The class instance
     */

  }, {
    key: '_onInputKeyPress',
    value: function _onInputKeyPress(e) {
      //console.log('_onInputKeyPress', e);

      if (this.get('value') === '') {
        this.addClass('is-empty');
      } else {
        this.removeClass('is-empty');
      }

      this.emit('change', this.getValue());
    }

    /**
     * [_onBlur description]
     * @return {Object} The class instance
     */

  }, {
    key: '_onInputBlur',
    value: function _onInputBlur() {
      //console.log('_onInputBlur');
      if (this.readonly) return;
      this.setState(null);
    }

    /**
     * [_onBlur description]
     * @return {Object} The class instance
     */

  }, {
    key: '_onChange',
    value: function _onChange(value) {}
    //console.log('_onChange', value);

    /**
     * [setError description]
     * @param {string} error Error description
     */

  }, {
    key: 'setError',
    value: function setError(error) {
      if (error) {
        this.addClass('field-error');
        if (this.error) this.error.set('html', error);
      } else {
        if (this.error) this.removeClass('field-error');
        if (this.error) this.error.set('html', '');
      }
    }
  }]);

  return Field;
})(_component2.default);

module.exports = Field;

},{"../component":55,"../module/merge":95}],76:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"../module/utils":96,"dup":34}],77:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _merge = require('./module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _options = require('./form/options');

var _options2 = _interopRequireDefault(_options);

var _dom = require('./module/dom');

var _dom2 = _interopRequireDefault(_dom);

var _insert = require('./component/insert');

var _insert2 = _interopRequireDefault(_insert);

var _css = require('./module/css');

var _css2 = _interopRequireDefault(_css);

var _emitter = require('./module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _bind = require('./module/bind');

var _bind2 = _interopRequireDefault(_bind);

var _controller = require('./component/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Form class
 *
 * @class
 * @extends {Component}
 * @return {Class} This class instance
 */

var Form = (function () {

  /**
   * Constructor
   * @param  {Object} options - Component options
   * @return {Object} Class instance 
   */

  function Form(options) {
    _classCallCheck(this, Form);

    console.log('form constructor');

    this.init(options);
    this.build();

    return this;
  }

  /**
   * Initialize View
   * @return {void}
   */

  _createClass(Form, [{
    key: 'init',
    value: function init(options) {
      // initOPtions

      // init intanciate name
      this._name = this.constructor.name.toLowerCase();

      this.options = (0, _merge2.default)(_options2.default, options);

      // merge options

      // implement module
      Object.assign(this, _emitter2.default, _bind2.default, _insert2.default);

      this.document = window.document;
      this.controller = new _controller2.default();

      //need to remove the options template to have a reference
      if (this.options.render) {
        this.render = options.render;
      }

      //this.key = {};

      return this;
    }

    /**
     * [_initForm description]
     * @return {Object} This class instance
     */

  }, {
    key: 'build',
    value: function build() {

      var tag = this.options.tag || 'div';

      this.element = document.createElement(tag);
      _css2.default.add(this.element, this.options.prefix + '-' + this._name);

      this._initLayout(this.options.layout);

      return this;
    }

    /**
     * Instanciate layout
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */

  }, {
    key: '_initLayout',
    value: function _initLayout(options) {
      console.log('_initLayout', options);
      //
      // complete layout options
      options.element = this.element;
      options.controls = this.options.controls;
      //console.log('control keys', this.options.controls);

      this.layout = new _layout2.default(options);

      //console.log('control', this.layout.controls);
      this._initControls(this.layout.controls);
    }

    /**
     * [_initControls description]
     * @param  {[type]} controls [description]
     * @return {[type]}          [description]
     */

  }, {
    key: '_initControls',
    value: function _initControls(controls) {
      if (!controls) return;

      this.key = this.key || {};

      for (var i = 0; i < controls.length; i++) {
        var control = controls[i];
        //control.setAttribute('data-key', control.name);
        //console.log('keys', control.name, control);

        this.key[control.name] = control;

        control.on('change', function (value) {
          //console.log('change', this.name, value);
        });
      }
    }

    /**
     * [_onSubmit description]
     * @return {void}
     */

  }, {
    key: '_onSubmit',
    value: function _onSubmit(e) {
      e.preventDefault();
    }

    /**
     * [initControl description]
     * @param  {[type]} key     [description]
     * @param  {[type]} section [description]
     * @return {[type]}         [description]
     */

  }, {
    key: 'initControl',
    value: function initControl(key, section) {
      var name = key.name || 'undefined';

      var control = this.render(key);

      if (control) {
        this.key[name] = control;
        control.insert(section);
        control.addEvent('keyup', function () {
          console.log('change', name, control.get('value'));
        });

        control.setAttribute('data-key', name);
      }
    }

    /**
     * Getter
     *
     * @param {string} prop
     * @param {string} value
     * @return {Object|void}
     */

  }, {
    key: 'set',
    value: function set(prop, value) {
      switch (prop) {
        case 'info':
          return this.setInfo(value);
        case 'schema':
          return this.setSchema(value);
        default:
          //default will replace the old method see up
          return this.setInfo(info);
      }
    }

    /**
     * [setInfo description]
     * @param {[type]} info [description]
     */

  }, {
    key: 'setInfo',
    value: function setInfo(info) {
      this.info = this.original = info;

      this.parseInfo(info);
    }

    /**
     * [parseInfo description]
     * @param  {[type]} obj  [description]
     * @param  {[type]} name [description]
     * @param  {[type]} i    [description]
     * @return {[type]}      [description]
     */

  }, {
    key: 'parseInfo',
    value: function parseInfo(obj, name, i) {
      //console.log('parseInfo', name, i);
      var count = i || 0;
      count = count + 1;
      var k;

      if (obj instanceof Object) {
        for (k in obj) {
          if (obj.hasOwnProperty(k)) {
            //console.log('key', k, count);
            //recursive call to scan property
            var n = null;
            if (name) {
              n = name + '.' + k;
            } else {
              n = k;
            }
            //console.log('recall', n, count - 1);
            this.parseInfo(obj[k], n, count);
          }
        }
      } else {
        //console.log('key value', name, obj);
        if (this.key[name] && this.key[name].set) {
          //console.log('control', this.key[name]);
          this.key[name].set(obj);
        }

        //not an Object so obj[k] here is a value
      };
    }
  }, {
    key: 'get',

    /**
     * Getter
     *
     * @param {string} prop
     * @param {string} value
     * @return {Object|void}
     */
    value: function get(prop, value) {
      switch (prop) {
        case 'key':
          return this.getValue(value);
        case 'info':
          return this.getInfo();
        case 'original':
          return this.original;
        case 'options':
          return this.options;
        default:
          //default will replace the old method see up
          return this.getInfo();
        /*case 'model':
          return this.getSelectedModel();*/
      }
    }

    /**
     * Get Value for the given key
     * @param  {string} name defined in dot notation
     * @param  {Object} info
     * @return {Mixin} The Value of the given key
     */

  }, {
    key: 'getValue',
    value: function getValue(name, info) {
      var keys = name.split(/\./);
      var value = null;

      if (!name || !info) {
        return;
      }

      //_log.debug('getValueFromKey', name, info);

      if (keys.length === 1) {
        value = info[keys[0]];
      }
      if (keys.length === 2 && info[keys[0]]) {
        if (info[keys[0]]) {
          value = info[keys[0]][keys[1]];
        }
      }
      if (keys.length === 3) {
        if (info[keys[0]]) {
          if (info[keys[0]][keys[1]]) {
            value = info[keys[0]][keys[1]][keys[2]];
          }
        }
      }

      return value;
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      return this.info;
    }
  }]);

  return Form;
})();

module.exports = Form;

},{"./component/controller":58,"./component/insert":61,"./form/options":78,"./layout":80,"./module/bind":87,"./module/css":89,"./module/dom":91,"./module/emitter":93,"./module/merge":95}],78:[function(require,module,exports){
'use strict';

/**
 * Form options
 */
module.exports = {
  prefix: 'material',
  tag: 'div',
  controls: ['field', 'checkbox', 'slider', 'switch']
};

},{}],79:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _classify = require('./component/classify');

var _classify2 = _interopRequireDefault(_classify);

var _merge = require('./module/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  prefix: 'ui',
  component: ['name'],
  element: {
    tag: 'span'
  }
};

/**
 * The item class is used for example as item list
 *
 * @class
 * @extends {Component}
 * @return {Object} The class instance
 * @example new Item(object);
 */
module.exports = (function () {

  /**
   * init
   * @return {Object} The class options
   */

  function Image(options) {
    _classCallCheck(this, Image);

    console.log('field options', options);
    //super.init(defaults);

    this.options = (0, _merge2.default)(defaults, options);
    console.log('this.options', this.options);

    this.init();
    this.build();

    return this;
  }

  _createClass(Image, [{
    key: 'init',
    value: function init(options) {
      Object.assign(this, _classify2.default);

      this._name = this.constructor.name.toLowerCase();
    }

    /**
     * Build function for item
     * @return {Object} This class instance
     */

  }, {
    key: 'build',
    value: function build(options) {
      options = options || this.options;

      this._component = new _component2.default(options);

      this.element = this._component.element;

      if (options.text) {
        this.set(options.text);
      }

      this._component.addClass(this.options.prefix + '-' + this._name);
      this._component.addClass(this._name + '-' + options.type);

      // super.build();

      // var text = this.options.text || this.options.label;

      // console.log('-!-', this.options.type);

      // if (this.options.type) {

      //   this.addClass(this._name + '-' + this.options.type);
      // }

      // if (text) {
      //   this.set(text);
      // }

      // return this;
    }
  }, {
    key: 'insert',
    value: function insert(container, context, debug) {
      this._component.insert(container, context, debug);
    }
  }, {
    key: 'style',
    value: function style(_style) {
      this._component.style(_style);
    }

    /**
     * [focus description]
     * @return {void}
     */

  }, {
    key: 'set',
    value: function set(value) {
      this._component.text(value);

      return this;
    }
  }]);

  return Image;
})();

},{"./component":55,"./component/classify":57,"./module/merge":95}],80:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"./component/controller":58,"./component/insert":61,"./element/style":76,"./layout/component":81,"./layout/options":82,"./layout/resizer":83,"./module/bind":87,"./module/css":89,"./module/emitter":93,"./module/merge":95,"dup":35}],81:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"../element/style":76,"../module/css":89,"dup":36}],82:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"dup":37}],83:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"../component":55,"../module/element":92,"dup":38,"material/dist/vendor/dragdrop":17}],84:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _display = require('./container/display');

var _display2 = _interopRequireDefault(_display);

var _insert = require('./component/insert');

var _insert2 = _interopRequireDefault(_insert);

var _merge = require('./module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _css = require('./module/css');

var _css2 = _interopRequireDefault(_css);

var _emitter = require('./module/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _options = require('./list/options');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * List view class
 * @class
 * @param {Object} options Default options for view
 * @extends {View}
 * @since 0.0.4
 * @author Jerome Vial
 *
 * @type {prime}
 */

var List = (function () {

  /**
   * init
   * @return {Object} The class options
   */

  function List(options) {
    _classCallCheck(this, List);

    this.init(options);
    this.build();

    return this;
  }

  /**
   * [_initView description]
   * @return  Class instance
   */

  _createClass(List, [{
    key: 'init',
    value: function init(options) {

      this.options = (0, _merge2.default)(_options2.default, options);

      Object.assign(this, _emitter2.default, _display2.default, _insert2.default);

      this._name = this.constructor.name.toLowerCase();
      this.name = this.options.name;

      this.filters = [];
      this.data = [];

      this.items = [];

      if (this.options.render) {
        this.render = this.options.render;
      }

      if (this.options.select) {
        console.log('select cb');
        this.select = this.options.select;
      }

      return this;
    }

    /**
     * [_initList description]
     * @param  {Object} options this class options
     * @return {Object} The class instance  
     */

  }, {
    key: 'build',
    value: function build(options) {
      options = options || this.options;

      // define main tag
      var tag = options.tag || 'div';

      this.element = document.createElement(tag);

      var self = this;

      options = options || this.options;

      //this.addClass('type-'+this.tmpl._type);
      _css2.default.add(this.element, 'material-' + this._name);

      if (this.options.container) {
        this.insert(this.options.container);
      }

      this.element.addEventListener("click", function (e) {
        //console.log("list", this, e);
        // e.target was the clicked element
        if (e.target && e.target.matches(".material-item")) {
          console.log("item clicked: ", e.target);
          self.click(e.target, e);
        }
      });

      //this.content = this.c.body;

      //this._initSearch();

      // this.c.body.delegate('click', '.ui-button', function(event, item){
      //      //console.log(event, item);
      //      self.select(item, event);
      // });

      //this.container.emit('resize');
      return this;
    }
  }, {
    key: 'click',
    value: function click(item, e) {

      _css2.default.remove(this.item, 'is-selected');

      this.item = item;
      _css2.default.add(item, 'is-selected');

      if (this.select) {
        this.select(item, e);
      }
    }

    /**
     * select
     * @param  {Element} item  [description]
     * @param  {event} event The caller event
     * @return        [description]
     */

  }, {
    key: 'select',
    value: function select(item, event) {
      console.log('select', item, event);
      this.item = item;

      this.emit('selected', item[0]);
    }

    /**
     * Setter
     * @param {string} prop
     * @param {string} value
     */

  }, {
    key: 'set',
    value: function set(prop, value, options) {
      switch (prop) {
        case 'list':
          this.setList(value, options);
          break;
        default:
          this.setList(value, options);
      }

      return this;
    }

    /**
     * Set list
     * @param {Array} list List of info object
     * @return {Object} The class instance
     */

  }, {
    key: 'setList',
    value: function setList(list) {

      for (var i = 0; i < list.length; i++) {
        var item = this.render(list[i]);

        //item.store('info', list[i]);

        this.addItem(item, i);
      }

      return this;
    }

    /**
     * Insert info
     * @param  {Object} info Info object
     * @param  {integer} x    [description]
     * @param  {integer} y    [description]
     * @return {Object} The class instance
     */

  }, {
    key: 'insertInfo',
    value: function insertInfo(info, x, y) {

      if (this.list.indexOf(info._id) > -1) return;

      this.list.push(info._id);

      var item = this.addItem(info);

      return this;
    }

    /**
     * [add description]
     * @param {Object} item [description]
     */

  }, {
    key: 'addItem',
    value: function addItem(item /*, index*/) {

      if (!item) {
        return;
      }

      var where = 'bottom';
      this.insertElement(item.element, this.element, where);
      //item.insert(this.element, where);
      this.items.push(item);

      return item;
    }

    /**
     * Reverse the list order
     * @return {Object} The class instance
     */

  }, {
    key: 'reverse',
    value: function reverse() {
      this.list.reverse();
      this.update(this.list);

      return this;
    }
  }]);

  return List;
})();

module.exports = List;

},{"./component/insert":61,"./container/display":67,"./list/options":86,"./module/css":89,"./module/emitter":93,"./module/merge":95}],85:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"../component/insert":61,"../module/css":89,"../module/merge":95,"dup":39}],86:[function(require,module,exports){
'use strict';

/**
 * [defaults description]
 */
module.exports = {
  prefix: 'material'
};

},{}],87:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],88:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],89:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],90:[function(require,module,exports){
(function (process,global){
'use strict';

/**
 * Module defer
 * @module module/defer
 */

// function kindOf from mout

var _rKind = /^\[object (.*)\]$/;
var _toString = Object.prototype.toString;
var UNDEF;

/**
 * Gets the "kind" of value. (e.g. "String", "Number", etc)
 */
function kindOf(val) {
  if (val === null) {
    return 'Null';
  } else if (val === UNDEF) {
    return 'Undefined';
  } else {
    return _rKind.exec(_toString.call(val))[1];
  }
}

var callbacks = {
  timeout: {},
  frame: [],
  immediate: []
};

/**
 * defer
 * @class
 * @author https://github.com/kamicane
 */
var push = function push(collection, callback, context, defer) {

  var iterator = function iterator() {
    iterate(collection);
  };

  if (!collection.length) defer(iterator);

  var entry = {
    callback: callback,
    context: context
  };

  collection.push(entry);

  return function () {
    var io = collection.indexOf(entry);
    if (io > -1) collection.splice(io, 1);
  };
};

/**
 * [iterate description]
 * @return {void}            [description]
 */
var iterate = function iterate(collection) {
  var time = Date.now();

  //console.log('!!', collection);

  collection.splice(0).forEach(function (entry) {
    entry.callback.call(entry.context, time);
  });
};

var defer = function defer(callback, argument, context) {
  return kindOf(argument) === "Number" ? defer.timeout(callback, argument, context) : defer.immediate(callback, argument);
};

if (global.process && process.nextTick) {

  defer.immediate = function (callback, context) {
    return push(callbacks.immediate, callback, context, process.nextTick);
  };
} else if (global.setImmediate) {

  defer.immediate = function (callback, context) {
    return push(callbacks.immediate, callback, context, setImmediate);
  };
} else if (global.postMessage && global.addEventListener) {

  addEventListener("message", function (event) {
    if (event.source === global && event.data === "@deferred") {
      event.stopPropagation();
      iterate(callbacks.immediate);
    }
  }, true);

  defer.immediate = function (callback, context) {
    return push(callbacks.immediate, callback, context, function () {
      postMessage("@deferred", "*");
    });
  };
} else {

  defer.immediate = function (callback, context) {
    return push(callbacks.immediate, callback, context, function (iterator) {
      setTimeout(iterator, 0);
    });
  };
}

var requestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame || function (callback) {
  setTimeout(callback, 1e3 / 60);
};

/**
 * [frame description]
 * @param  {Function} callback [description]
 * @return {Array}            [description]
 */
defer.frame = function (callback, context) {
  return push(callbacks.frame, callback, context, requestAnimationFrame);
};

var clear;

/**
 * [timeout description]
 * @param  {Function} callback [description]
 * @return {Array}            [description]
 */
defer.timeout = function (callback, ms, context) {
  var ct = callbacks.timeout;

  if (!clear) clear = defer.immediate(function () {
    clear = null;
    callbacks.timeout = {};
  });

  return push(ct[ms] || (ct[ms] = []), callback, context, function (iterator) {
    setTimeout(iterator, ms);
  });
};

module.exports = defer;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":16}],91:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],92:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],93:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"./defer":90,"dup":47}],94:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48}],95:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],96:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],97:[function(require,module,exports){
'use strict';

//import Component from './component';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _merge = require('./module/merge');

var _merge2 = _interopRequireDefault(_merge);

var _insert = require('./component/insert');

var _insert2 = _interopRequireDefault(_insert);

var _css = require('./module/css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  prefix: 'material',
  tag: {
    default: 'span',
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading2: 'h3',
    subheading1: 'h4',
    body: 'p',
    body2: 'aside',
    caption: 'span'
  }
};

/**
 * The item class is used for example as item list
 *
 * @class
 * @extends {Component}
 * @return {Object} The class instance
 * @example new Item(object);
 */
module.exports = (function () {

  /**
   * init
   * @return {Object} The class options
   */

  function Text(options) {
    _classCallCheck(this, Text);

    console.log('text options', options);

    this.options = (0, _merge2.default)(defaults, options);

    this.init();
    this.build();

    return this;
  }

  /**
   * [init description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */

  _createClass(Text, [{
    key: 'init',
    value: function init() {
      Object.assign(this, _insert2.default);
      this._name = this.constructor.name.toLowerCase();
    }

    /**
     * Build function for item
     * @return {Object} This class instance
     */

  }, {
    key: 'build',
    value: function build(options) {
      options = options || this.options;

      var tag = options.tag[options.type] || options.tag.default;

      this.element = document.createElement(tag);

      if (options.text) {
        this.set(options.text);
      }

      _css2.default.add(this.element, this.options.prefix + '-' + this._name);
      _css2.default.add(this.element, this._name + '-' + options.type);
      //css.add(this.element, this._name + '-adjust');

      if (this.options.container) {
        this.insert(this.options.container);
      }
    }

    /**
     * Get or set text value of the element
     * @param {string} value The text to set
     * @returns {*}
     */

  }, {
    key: 'set',
    value: function set(value) {
      if (value) {
        if (this.element.innerText) {
          this.element.innerText = value;
        } else {
          this.element.textContent = value;
        }

        return this;
      }

      return this;
    }
  }]);

  return Text;
})();

},{"./component/insert":61,"./module/css":89,"./module/merge":95}]},{},[4])
//# sourceMappingURL=demo.js.map
