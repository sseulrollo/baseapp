import React, {Component, Fragment} from 'react'
import {Label, Dropdown, Grid, Form} from 'semantic-ui-react'



export default class SearchCombo extends Component {

    _isMounted = false;

    state = {
        searchQuery: '',
        value: '',
        name: '',
        data: [],
        header: []
    }

    constructor(props){
        super(props);
        this.state = {
            value: props.value
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    handleChange = (e, {searchQuery, value}) => {
        
        this.setState({
            searchQuery, value
        })
       
        this.props.onChange(this.props.keys, value);

    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.name !== this.props.name 
            || nextProps.header !== this.props.header
            || nextProps.data !== this.props.data
            || nextProps.value !== this.props.value
        console.log('shouldComponentUpdate c')
    }

    handleSearchChange = (e, {searchQuery}) => this.setState({searchQuery: searchQuery})

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {name, data, header, value} = this.props;
        const {searchQuery} = this.state
        
        let comboData = []
        
        if (data !== undefined && data.length > 0){

            for(let i=0; i< data.length; i++)
                comboData.push({
                    key: data[i][header[0]],
                    value: data[i][header[0]],
                    text: data[i][header[1]]
                })

            return (
                <Dropdown
                    fluid
                    onChange={this.handleChange}
                    onSearchChange={this.handleSearchChange}
                    placeholder={name}
                    options={comboData}
                    search
                    color='teal'
                    searchQuery={searchQuery}
                    selection
                    value={value}
                >
                </Dropdown>
            )}
        else 
            return (
                <Dropdown
                    fluid
                    onChange={this.handleChange}
                    onSearchChange={this.handleSearchChange}
                    placeholder={name}
                    search
                    color='teal'
                    searchQuery={searchQuery}
                    value={value}
                />
            )
    }
}
