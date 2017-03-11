import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList/index'
import Chart from './Chart'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import Calendar from './Calendar'

class App extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    state = {
        text: '',
        selectedItem: null
    }

    render() {
        const { articles } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return (
            <div>
                <Calendar />
                Enter your name: <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                <Select options = {options} value={this.state.selectedItem} onChange = {this.handleSelectChange} multi/>
                <ArticleList articles={this.props.articles}/>
                <Chart articles={this.props.articles}/>
            </div>
        )
    }

    handleSelectChange = selectedItem => {
        this.setState({ selectedItem })
    }

    handleTextChange = ev => {
        if (ev.target.value.length > 10) return

        this.setState({
            text: ev.target.value
        })
    }

}

export default App

