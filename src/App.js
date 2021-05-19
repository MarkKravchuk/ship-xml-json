import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShipForm from "./components/shipForm";
import xml from 'xml'
import convert from 'xml-js'
import readXlsxFile from 'read-excel-file'

class App extends React.Component {

    state = {
        ship: {
            name: '',
            departure: '',
            crewSize: '',
            bribe: ''
        },
        xml: undefined
    }

    onChange = (item) => {
        let ship = this.state.ship;

        let mergedShip = {...ship, ...item}

        this.setState({ship: mergedShip})
    }

    onSubmit = () => {
        let {ship} = this.state;

        let xmlValue = xml({
            ship: [{
                name: ship.name
            }, {
                departure: ship.departure
            }, {
                crewSize: ship.crewSize
            }, {
                bribe: ship.bribe
            }]
        }, {declaration: true})
        this.setState({xml: xmlValue})
    }


    render() {

        console.log('state: ', this.state);
        return (<>
                <div className={'main-wrapper'}>

                    <div className={'form-wrapper'}>
                        <ShipForm ship={this.state.ship}
                                  change={this.onChange}
                                  submit={this.onSubmit}
                                  uploadFile={this.uploadFile}
                                  uploadXLS={this.uploadXLS}/>
                    </div>

                    {this.state.xml ? <div className={'xml-wrapper'}>
                        <code>
                            {this.state.xml}
                        </code>

                        <div className={'downloadButton'}>
                            <button onClick={this.downloadXMLfile}>Download config</button>
                        </div>
                    </div> : ''}

                </div>
            </>
        );
    }

    uploadXLS= () =>{
        let file = document.getElementById("xls");
        console.log("xls ",file);


            readXlsxFile(file.files[0]).then((rows) => {
                // `rows` is an array of rows
                // each row being an array of cells.
                let ship = rows[1];
                let name = ship[0];
                let departure = ship[1];
                let crewSize = ship[2];
                let bribe = ship[3];
                this.setState({ship: {
                        name, departure, crewSize, bribe
                    }})

            }).then(console.log("finish"))
    }
    uploadFile = () => {
        let file = document.getElementById("file").files[0];

        console.log('doupload',file)




        var reader = new FileReader();
        reader.onload = (() => {
            return (e) => {
                let fileContent = e.target.result;
                let XMLParser = require('react-xml-parser');
                let xml = new XMLParser().parseFromString(fileContent);
                console.log("Ship name ", xml.getElementsByTagName('name')[0].value);

                let json = JSON.parse(convert.xml2json(fileContent));
                console.log('json: ', json)

                this.xmlToJson(json);

                // const parser = new DOMParser();
                // const dom = parser.parseFromString(fileContent, "application/xml");
                // // print the name of the root element or error message
                // if (dom.documentElement.nodeName === "parsererror") throw new Error('XML is broken');
                //
                //
                // console.log('THE File: ', dom.documentElement)
            };
        })();
        reader.readAsText(file);
    }

    xmlToJson = (json) => {
        // very dirty
        let ship = json.elements[0];
        let name = ship.elements[0].elements[0].text;
        let departure = ship.elements[1].elements[0].text;
        let crewSize = ship.elements[2].elements[0].text;
        let bribe = ship.elements[3].elements[0].text;

        this.setState({ship: {
            name, departure, crewSize, bribe
            }})

    }

    downloadXMLfile = () => {
        let data = this.state.xml;
        let filename = `XML config ${new Date()}.xml`
        console.log('downloadXMLfile')
        var file = new Blob([data], /*{type: type}*/);
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

}

export default App;
