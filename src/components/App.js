import React, { Component, PropTypes } from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {connect} from 'react-redux'
import ArticlesPage from './ArticlesPage'
import NotFound from './NotFound'
import Filters from './Filters/index'
import Counter from './Counter'
import CommentsPage from './CommentsPage'
import Menu, {MenuItem} from './Menu/index'
import {loadAllArticles} from '../AC'
import history from '../history'

class App extends Component {


    static propTypes = {
    };

    static childContextTypes = {
        user: PropTypes.string,
        lang: PropTypes.string,
        dict: PropTypes.object
    }

    state = {
        text: '',
        lang: 'en'
    }

    dict = {
        'en': {
            btnDel: 'delete me',
            user: 'User',
            yourName: 'Enter your name',
            hide: 'hide',
            show: 'show',
            comments: 'comments',
            menu: 'Menu'
        },
        'ru': {
            btnDel: 'удали меня',
            user: 'Пользователь',
            yourName: 'Введите ваше имя',
            hide: 'скрыть',
            show: 'показать',
            comments: 'комментарии',
            menu: 'Меню'
        }
    }

    getChildContext() {

        return {
            user: this.state.text,
            lang: this.state.lang,
            dict: this.dict
        }
    }

    componentDidMount() {
        this.props.loadAllArticles()
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    <p>
                    <select onChange={this.handleLangChange}>
                        <option disabled>Выберите язык:</option>
                        <option value="en">English</option>
                        <option value="ru">Русский</option>
                    </select>
                    </p>
                    {this.dict[this.state.lang].yourName}: <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                    <Menu>
                        <MenuItem path="/counter"/>
                        <MenuItem path="/filters"/>
                        <MenuItem path="/articles"/>
                        <MenuItem path="/comments"/>
                    </Menu>
                    <Switch>
                        <Route path="/counter" component={Counter} exact />
                        <Route path="/filters" component={Filters} />
                        <Route path="/articles" component={ArticlesPage} />
                        <Route path="/comments/:page" component={CommentsPage} />
                        <Redirect from="/comments" to="/comments/1"/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </ConnectedRouter>
        )
    }

    handleTextChange = ev => {
        if (ev.target.value.length > 10) return

        this.setState({
            text: ev.target.value
        })
    }

    handleLangChange = ev => {
        this.setState({
            lang: ev.target.value
        })
    }
}

export default connect(null, { loadAllArticles })(App)