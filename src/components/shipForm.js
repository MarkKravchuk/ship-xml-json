import React from 'react'
import {Form, Button} from "react-bootstrap";

export default class ShipForm extends React.Component {

    render() {
        console.log('shipForm props:', this.props);
        let {change, uploadFile, ship,uploadXLS} = this.props;

        let {name, departure, crewSize, bribe} = ship;

        return <>

            <p>Name of your ship</p>
            <input type={'text'} value={name} onChange={(e) => change({name: e.target.value})}/>

            <br/><br/><br/>

            <p>Departure - Arrival</p>
            <input type={'text'} value={departure} onChange={(e) => change({departure: e.target.value})}/>

            <br/><br/><br/>

            <p>The size of your crew</p>
            <input type={'text'} value={crewSize} onChange={(e) => change({crewSize: e.target.value})}/>

            <br/><br/><br/>

            <p>The bribe you gonna pay</p>
            <input type={'number'} value={bribe} onChange={(e) => change({bribe: e.target.value})}/>

            <button onClick={this.props.submit}>Submit!</button>

            <input type="file" name="file" id="file"/>
            <button onClick={uploadFile} name="submit">Upload File</button>

            <input type="file" name="xls" id="xls"/>
            <button onClick={uploadXLS} name="submit">Upload XLS</button>

            </>
    }

    onSubmit() {

    }

}